# Make.com / n8n Automation Blueprint: The "Tube Master AI" Core Engine

This document provides the exact module-by-module blueprint to build the backend orchestration for the Tube Master AI platform using a visual automation builder like Make.com (formerly Integromat) or n8n.

This blueprint handles the entire flow from receiving the user request to outputting a final, ready-to-publish YouTube video (or providing the complete assets for a 1-click editor).

---

## The Blueprint Overview (Visual Map)

```text
[1. Webhook (Trigger)] -----> [2. OpenAI (Script & Prompts)] 
                                      |
                                      +-----> [3. Iterator (Split Scenes)]
                                      |              |
                                      |              +-----> [4. fal.ai (Generate Images)]
                                      |              |
                                      |              +-----> [5. Array Aggregator (Collect Images)]
                                      |
                                      +-----> [6. ElevenLabs (Generate Audio)]
                                      |
                                      +-----> [7. HTTP Request (Creatomate/Shotstack Video Assembly)]
                                      |
                                      +-----> [8. Webhook/API (Update Bubble.io DB)]
```

---

## Detailed Module Configuration (Step-by-Step)

### Module 1: Custom Webhook (The Trigger)
*   **App:** Webhooks (Make.com) / Webhook (n8n)
*   **Action:** Custom Webhook
*   **Configuration:**
    *   Create a webhook URL and paste it into your Bubble.io application (in a backend workflow or API connector).
    *   **Expected Payload (from Bubble):**
        ```json
        {
          "content_job_id": "12345xyz",
          "user_id": "user_789",
          "niche": "Stoicism",
          "topic": "How to stop caring what people think",
          "video_length": "short",
          "brand_aesthetic": "dark cinematic, greek statues, 4k resolution"
        }
        ```

### Module 2: AI Script & Prompt Generation (The Brain)
*   **App:** OpenAI (ChatGPT)
*   **Action:** Create a Chat Completion
*   **Configuration:**
    *   **Model:** `gpt-4o`
    *   **Response Format:** `JSON Object` (Crucial for parsing later)
    *   **System Prompt:** "You are a master YouTube scriptwriter. Return ONLY valid JSON structured as: `{ "title": "string", "hook": "string", "scenes": [ { "narration": "string", "visual_prompt": "string" } ] }`. The narration should be engaging. The visual_prompt should be highly descriptive instructions for an AI image generator."
    *   **User Message:** `Generate a {1.video_length} script for the niche: {1.niche}. Topic: {1.topic}.`
    *   *(Note: The `{1...}` syntax represents mapping variables from Module 1 in Make.com)*

*   **Next Step (Crucial):** Add a **JSON Parse** module right after this to convert OpenAI's string output into usable data objects for Make/n8n.

### Module 3: Separating Audio & Visuals (The Split)
*We need the complete narration for the voiceover, but we need to generate images scene-by-scene.*

*   **Make.com Tool:** `Text Aggregator`
    *   **Source Node:** The parsed JSON from Module 2.
    *   **Action:** Combine all `scenes[].narration` strings into one long string. We will pass this to ElevenLabs in Module 6.

### Module 4 & 5: Image Generation Loop (The Eyes)
*   **App 4A (Iterator):** `Iterator` (Make/n8n)
    *   **Array to iterate:** `scenes[]` from the parsed JSON.
*   **App 4B (HTTP Request / fal.ai):** `HTTP Request`
    *   **URL:** `https://fal.run/fal-ai/fast-sdxl`
    *   **Method:** `POST`
    *   **Headers:** `Authorization: Key YOUR_FAL_KEY`, `Content-Type: application/json`
    *   **Body:**
        ```json
        {
          "prompt": "{4A.visual_prompt}, {1.brand_aesthetic}, --ar 16:9",
          "num_inference_steps": 30
        }
        ```
*   **App 5 (Aggregator):** `Array Aggregator`
    *   **Source Node:** The Iterator (4A).
    *   **Target Structure:** We want to collect all the returned Image URLs (from 4B) into a single array list, in the exact order of the scenes.

### Module 6: Voiceover Generation (The Voice)
*(This runs parallel to or immediately after the prompt generation, using the aggregated text from Module 3).*

*   **App:** ElevenLabs (or HTTP Request)
*   **Action:** Text to Speech
*   **Configuration:**
    *   **Voice ID:** Choose a premium/cloned voice ID suitable for the niche.
    *   **Text:** Map the output from Module 3 (The fully aggregated narration string).
    *   *Note: Make.com usually returns binary file data here. You may need an intermediate step (e.g., upload to AWS S3, Google Drive, or Bubble) to get a public URL for the `.mp3`.*

### Module 7: Video Assembly (The Editor)
*(Requires the Array of Image URLs from Module 5 and the Audio URL from Module 6).*

*   **App:** HTTP Request (Targeting Creatomate or Shotstack API)
*   **Action:** `POST`
*   **URL:** `https://api.creatomate.com/v1/renders`
*   **Headers:** `Authorization: Bearer YOUR_CREATOMATE_KEY`
*   **Body (Example simplified Creatomate Template Request):**
    ```json
    {
      "template_id": "YOUR_PRE_BUILT_TEMPLATE_ID",
      "modifications": {
        "Voiceover": "{6.Audio_URL}",
        "Image_1": "{5.Array[1].image_url}",
        "Image_2": "{5.Array[2].image_url}",
        "Subtitles": "Auto-generate" 
      }
    }
    ```
    *(Note: For dynamic scene counts, you pass a JSON timeline object instead of a fixed template ID, which Creatomate's documentation explains well).*

### Module 8: Update Bubble.io (The Return)
*   **App:** Bubble.io (or HTTP Request to Bubble's Data API)
*   **Action:** Modify a Thing (or PATCH request)
*   **Configuration:**
    *   **Thing ID:** `{1.content_job_id}` (From the initial trigger)
    *   **Fields to Update:**
        *   `Status`: "Complete"
        *   `Final_Video_URL`: Extract the rendered video URL from Module 7.
        *   `Title_Generated`: Map the `title` from Module 2's parsed JSON.

---

## Error Handling & Reliability (Expert Tips)

1.  **Timeouts:** Video rendering (Module 7) can take time. Instead of waiting for Creatomate to finish in this single Make.com scenario (which might time out), use Creatomate's **Webhook** feature. Have Creatomate ping a *second*, separate Make.com scenario when the video is done, and *that* scenario updates the Bubble DB.
2.  **API Fallbacks:** If the OpenAI API fails or rate-limits, add an "Error Handler" route in Make/n8n to pause for 5 seconds and retry, or send an alert to your Slack/Discord.
3.  **Data Validation:** Before hitting the expensive APIs (fal.ai, ElevenLabs), add a "Filter" in Make.com to ensure the parsed JSON actually contains the `scenes` array. If GPT-4o hallucinates the JSON structure, stop the scenario and refund the user's token in Bubble.
