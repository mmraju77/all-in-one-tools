# Step 1: Bubble.io Database Architecture Setup

To begin building the MVP, you must first set up the exact database (Data Types) in Bubble.io.

**Instructions:**
1. Open your Bubble.io editor.
2. Navigate to the **"Data"** tab on the left sidebar.
3. Under **"Data types"**, click **"New type"** to create the following tables. Then, add the corresponding fields to each.

---

## 1. Data Type: `User` (Built-in by Bubble)
Bubble already has a `User` type. You just need to add custom fields to it.

*Click "Create a new field" under the User type:*
*   `Name` (Field type: **text**)
*   `Subscription_Tier` (Field type: **text**) - *Default: "Free"*
*   `Token_Balance` (Field type: **number**) - *Default: 10*
*   `Stripe_Customer_ID` (Field type: **text**)
*   `Workspaces` (Field type: **Workspace**, Check "This field is a list")

---

## 2. Data Type: `Workspace`
This represents a single YouTube Channel.

*Click "New type" -> Name it "Workspace". Add fields:*
*   `Channel_Name` (Field type: **text**)
*   `Niche` (Field type: **text**)
*   `BrandKit` (Field type: **BrandKit**)
*   `Projects` (Field type: **Content_Job**, Check "This field is a list")
*   `Target_Audience_Country` (Field type: **text**)

---

## 3. Data Type: `BrandKit`
This stores the visual memory of the channel.

*Click "New type" -> Name it "BrandKit". Add fields:*
*   `Workspace` (Field type: **Workspace**)
*   `Primary_Color` (Field type: **text**) - *Stores Hex codes like #FF0000*
*   `Aesthetic_Prompt` (Field type: **text**) - *e.g., "dark cinematic lighting, 4k"*
*   `Font_Choice` (Field type: **text**)
*   `Channel_Logo` (Field type: **image**)

---

## 4. Data Type: `Content_Job`
This is the most important table. It tracks the generation of a specific video from start to finish.

*Click "New type" -> Name it "Content_Job". Add fields:*
*   `Workspace` (Field type: **Workspace**)
*   `Status` (Field type: **text**) - *Default: "Pending"*
*   `Topic` (Field type: **text**)
*   `SEO_Title` (Field type: **text**)
*   `Generated_Script_JSON` (Field type: **text**) - *Stores raw OpenAI output*
*   `Audio_URL` (Field type: **text**) - *Stores the ElevenLabs mp3 link*
*   `Final_Video_URL` (Field type: **text**) - *Stores the Creatomate mp4 link*
*   `Visual_Prompts` (Field type: **text**, Check "This field is a list")

---

## 5. Privacy Rules (CRITICAL FOR SECURITY)

If you don't do this, any user can view any other user's generated videos.

1. In the **Data** tab, click **"Privacy"**.
2. Select `Workspace`.
3. Click "Define a new rule". Name it `User is Owner`.
4. Define the condition: `This Workspace's Creator is Current User`.
5. Check all boxes (View all fields, Find this in searches).
6. Under the "Everyone Else" rule, **UNCHECK** everything.
7. Repeat this for `BrandKit` and `Content_Job` (Condition: `This [Type]'s Creator is Current User`).

---

**Next:** Move on to configuring the API Connector in the Plugins tab.
