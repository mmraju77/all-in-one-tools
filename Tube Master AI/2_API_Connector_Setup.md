# Step 2: Bubble.io API Connector Configuration

To make the AI generate scripts and audio, you must configure the **API Connector** plugin in Bubble.io.

## Prerequisites
1.  Go to the **Plugins** tab on the left sidebar in Bubble.
2.  Click **"Add plugins"** and install the free official plugin: **"API Connector"**.
3.  Have your API Keys ready from [platform.openai.com](https://platform.openai.com/) and [elevenlabs.io](https://elevenlabs.io/).

---

## Setting up OpenAI (GPT-4o Script Generator)

1.  In the API Connector, click **"Add another API"**.
2.  **API Name:** `OpenAI - Script Vault`
3.  **Authentication:** `Private key in header`
    *   **Key Name:** `Authorization`
    *   **Key Value:** `Bearer YOUR_OPENAI_API_KEY` *(Replace with your actual key starting with 'sk-')*
4.  **Shared Headers:**
    *   Key: `Content-Type` | Value: `application/json`

### Creating the API Call
1.  Click **"Add another call"** under the OpenAI API.
2.  **Name:** `Generate YouTube Concept`
3.  **Use as:** `Action` *(This allows you to trigger it in workflows)*
4.  **Data type:** `JSON`
5.  **Method:** `POST`
6.  **URL:** `https://api.openai.com/v1/chat/completions`
7.  **JSON Body:**
    *Paste the following EXACTLY:*

    ```json
    {
      "model": "gpt-4o",
      "response_format": { "type": "json_object" },
      "messages": [
        {
          "role": "system",
          "content": "You are a master YouTube scriptwriter. Return ONLY JSON: {\"title\": \"string\", \"hooks\": [\"string\"], \"scenes\": [{\"narration\": \"string\", \"visual_prompt\": \"string\"}]}."
        },
        {
          "role": "user",
          "content": "Niche: <niche>. Topic: <topic>."
        }
      ]
    }
    ```

8.  **Parameters (Crucial Step):**
    Below the body, Bubble will automatically detect `<niche>` and `<topic>`.
    *   Uncheck "Private" for both parameters so you can fill them from your frontend input boxes.
    *   Provide dummy values (e.g., Niche: `Finance`, Topic: `Crypto Crash`) to initialize the call.
9.  Click **"Initialize call"**. Bubble will ping OpenAI and return the structure. Click **"Save"**.

---

## Setting up ElevenLabs (Voice Generation)

1.  Click **"Add another API"**.
2.  **API Name:** `ElevenLabs - TTS`
3.  **Authentication:** `Private key in header`
    *   **Key Name:** `xi-api-key`
    *   **Key Value:** `YOUR_ELEVENLABS_API_KEY`
4.  **Shared Headers:**
    *   Key: `Content-Type` | Value: `application/json`
    *   Key: `Accept` | Value: `audio/mpeg`

### Creating the API Call
1.  Click **"Add another call"**.
2.  **Name:** `Generate Voiceover`
3.  **Use as:** `Action`
4.  **Data type:** `File` *(Crucial: This tells Bubble it's receiving an MP3, not text)*
5.  **Method:** `POST`
6.  **URL:** `https://api.elevenlabs.io/v1/text-to-speech/<voice_id>`
7.  **JSON Body:**

    ```json
    {
      "text": "<script_narration>",
      "model_id": "eleven_multilingual_v2",
      "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.75
      }
    }
    ```

8.  **Parameters:**
    *   `<voice_id>` (Type in the URL field): e.g., `21m00Tcm4TlvDq8ikWAM` (Rachel's voice). Uncheck private.
    *   `<script_narration>` (In the body): Add dummy text like `"Hello world, this is a test."`. Uncheck private.
9.  Click **"Initialize call"**. If successful, Bubble will save an MP3 file to its database temporarily. Click **"Save"**.

---

**Next:** You now have the Core AI APIs fully connected to your No-Code backend! The next step would be mapping these API actions to a "Generate Button" click on the frontend UI.
