# Step 6: 1-Click Video Editor API (Creatomate Setup)

The final piece of the Tube Master AI puzzle is assembling the generated assets (OpenAI text, ElevenLabs audio, fal.ai images) into a single, polished YouTube video.

For a No-Code backend, **Creatomate** is the industry standard because it accepts an array of URLs and dynamic text overlays via API and stitches them together seamlessly.

---

## 1. Preparing the Editor (Creatomate Interface)

Before hitting the API, you must design the "Base Template" inside Creatomate.

1.  Create an account at [Creatomate.com](https://creatomate.com/).
2.  In the dashboard, create a **New Template** (Choose 16:9 for Long-form, or 9:16 for Shorts).
3.  **The Track Structure:**
    *   **Track 1 (Audio):** Add a placeholder audio file and name the element `Narration_Audio`. Mark it as *Dynamic* in the right sidebar.
    *   **Track 2 (Background Music - Optional):** Add a royalty-free music track. Set volume to `-20db` so it doesn't overpower the voiceover.
    *   **Track 3 (Visuals):** Add an Image element and name it `Scene_1_Image`. Mark it as *Dynamic*. (You will send an array of these).
    *   **Track 4 (Auto-Subtitles):** Use Creatomate's built-in "Transcription/Subtitles" element. Link it to `Narration_Audio`. Style it (e.g., Yellow text, Black outline, Bouncing animation) to mimic Alex Hormozi kinetic typography.

---

## 2. API Configuration (The Bubble/Make.com Payload)

Whether you trigger this from Bubble's API Connector or a Make.com HTTP module, you must send a `POST` request to tell Creatomate to replace your placeholders with the AI-generated assets.

*   **Method:** `POST`
*   **URL:** `https://api.creatomate.com/v1/renders`
*   **Headers:**
    *   `Authorization: Bearer YOUR_CREATOMATE_API_KEY`
    *   `Content-Type: application/json`

### The Advanced JSON Payload (Dynamic Timing)

Because every generated script is a different length, you cannot use fixed durations. You must send a "Timeline" payload so Creatomate automatically stretches the images to fit the ElevenLabs audio length.

```json
{
  "template_id": "YOUR_CREATOMATE_TEMPLATE_ID",
  "webhook_url": "https://your-bubble-app.com/api/1.1/wf/video_render_complete",
  "modifications": {
    "Narration_Audio": "https://example.com/your-elevenlabs-audio.mp3",
    "Scene_1_Image": "https://example.com/your-fal-ai-image-1.jpg",
    "Scene_2_Image": "https://example.com/your-fal-ai-image-2.jpg",
    "Subtitles": "Auto-generate" 
  }
}
```

*Note: The `webhook_url` is absolutely critical here!*

---

## 3. The Video Render Webhook (Closing the Loop)

Rendering a 10-minute 4K video can take 2-5 minutes. **You cannot make the user wait on a loading screen that long, or Bubble will time out.**

Instead:
1.  Bubble sends the JSON payload to Creatomate (above) and immediately tells the user on the frontend: *"Video is rendering! We will notify you when it's done."*
2.  Creatomate starts processing the video on their own massive GPU servers.
3.  When the `.mp4` file is 100% finished, Creatomate automatically fires a ping to the URL you provided in `webhook_url`.

### Handling the Webhook in Bubble:
1.  In Bubble, follow the same exact logic we used for the Stripe Integration (Step 5).
2.  Create a Backend Workflow called `video_render_complete`.
3.  Click "Detect Request Data".
4.  Creatomate will send a test ping. Click save.
5.  **The Action Logic:**
    *   `Data (Things)` -> `Make changes to thing`.
    *   Find the specific `Content_Job` (you should pass the Job ID through Creatomate's metadata tags).
    *   Set `Status` = "Ready for YouTube".
    *   Set `Final_Video_URL` = `Request Data's url` (The direct MP4 link Creatomate provides).

**Result:** The frontend dashboard updates, and the user can now download their fully assembled, subtitled, AI-generated YouTube video with 1 click.
