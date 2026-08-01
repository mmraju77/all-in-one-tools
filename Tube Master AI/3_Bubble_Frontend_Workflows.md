# Step 3: Bubble.io Frontend Workflows (The "Generate" Button)

Now that your Database is built and your API Connectors (OpenAI & ElevenLabs) are initialized, you need to connect them to the user interface.

This covers the exact workflow logic for the main "Generate" button in the Script Vault.

---

## 1. The Frontend UI Setup (Input Elements)
*On your `app` page (or Script Vault Group), draw the following form elements:*

1.  **Dropdown 1:** Name it `Dropdown Niche` (Choices: *Finance, Stoicism, Tech, Psychology*)
2.  **Input 1:** Name it `Input Topic` (Placeholder: *"Type your video idea here...")*
3.  **Dropdown 2:** Name it `Dropdown Length` (Choices: *Short, Long*)
4.  **Button 1:** Name it `Button Generate Video`

---

## 2. Setting Up "Custom States" (The Loading Screen)
To make your app feel like a premium SaaS, we need a loading state so the user doesn't think the app froze while OpenAI is thinking.

1.  Double-click the main page (`index` or `app`).
2.  Click the tiny **'i' (element inspector)** icon.
3.  Click **"Add a new custom state"**.
    *   **Name:** `Is_Generating`
    *   **Type:** `yes/no`
    *   **Default value:** `no`
4.  Create a **Group** on your page containing a Lottie Animation (spinner) and text "Generating AI Assets...".
5.  Set this Group's layout to: **"This element is not visible on page load"**.
6.  Go to the Group's **Conditionals** tab:
    *   `When index's Is_Generating is "yes"` -> `This element is visible` (Check ON).

---

## 3. The Core Workflow Logic

When the user clicks the "Generate Video" button, it must initiate a complex chain of events.

1.  Click `Button Generate Video` -> Click **"Start/Edit Workflow"**.

### Step 1: Prevent Spam & Handle Tokens
1.  **Action 1:** `Element Actions` -> `Set state`. Element: `index` (or your page), Custom state: `Is_Generating`, Value: `yes`.
2.  **Action 2:** `Data (Things)` -> `Make changes to thing`.
    *   Thing to change: `Current User`
    *   Change another field: `Token_Balance` = `Current User's Token_Balance - 1`
    *(Crucial: On this action, add an "Only When" condition to the whole workflow Event: `Only When Current User's Token_Balance > 0`)*

### Step 2: Call the "Brain" (OpenAI)
3.  **Action 3:** `Plugins` -> `OpenAI - Script Vault - Generate YouTube Concept`.
    *   `(niche)` -> `Dropdown Niche's value`
    *   `(topic)` -> `Input Topic's value`

### Step 3: Save the Output to Database
4.  **Action 4:** `Data (Things)` -> `Create a new thing`.
    *   Type: `Content_Job`
    *   `Workspace`: *(Set this to the Current User's active workspace)*
    *   `Status`: `"Complete"`
    *   `Topic`: `Input Topic's value`
    *   `Generated_Script_JSON`: `Result of step 3 (OpenAI - Script Vault)'s body text`

### Step 4: Call the "Voice" (ElevenLabs)
*Now, we immediately send the generated script to receive the audio track.*

5.  **Action 5:** `Plugins` -> `ElevenLabs - TTS - Generate Voiceover`.
    *   `(script_narration)` -> We need to parse the JSON. In Bubble, use the `:extract with Regex` command or a free JSON parsing plugin (like 'JSON Machine') to grab just the "narration" array from `Result of step 3`.
    *   *(Note: For MVP simplicity without plugins, you can alter the OpenAI prompt to just return flat text narration, then save the hooks and prompts later).*

### Step 5: Save Audio & Finish
6.  **Action 6:** `Data (Things)` -> `Make changes to thing`.
    *   Thing to change: `Result of Step 4 (Content_Job)`
    *   `Audio_URL`: `Result of step 5 (ElevenLabs)'s URL`
7.  **Action 7:** `Element Actions` -> `Set state`. Element: `index`, Custom state: `Is_Generating`, Value: `no`.

---

**Next Steps / Expansion:** Right now, Step 5 generates the Audio synchronously on the frontend. If the elevenlabs generation takes too long (e.g., for an 8-minute video), Bubble will throw a timeout error. 

To solve this for production, this exact workflow must be moved to **"Backend Workflows"** (which run on the server with no timeout limit).
