# Bubble.io Frontend Structure & UI/UX Architecture

This document outlines the optimal frontend architecture for the Tube Master AI Bubble.io application, ensuring a premium, responsive SaaS experience that requires zero coding from the end user.

---

## 1. Global UI/UX Principles (The "SaaS Vibe")

To ensure the application feels like a premium Tier-1 product, adhere to these design principles in Bubble's **Styles** tab:

*   **Color Palette:** Dark Mode default (e.g., `#0F172A` background, `#1E293B` surfaces) with high-contrast electric accents (e.g., `#3B82F6` blue or `#8B5CF6` purple for primary actions). This matches the "AI / Premium" aesthetic perfectly.
*   **Typography:** Modern sans-serif (e.g., *Inter*, *Outfit*, or *Plus Jakarta Sans*).
*   **Layout Structure:** Single Page Application (SPA) feel using "Custom States" or URL parameters to show/hide Groups, avoiding full page reloads where possible to make the app feel instantly fast.

---

## 2. Core Reusable Elements (Components)

In Bubble, build these once as **"Reusable Elements"** and place them on your main pages.

1.  **`Header_Nav`**: Contains the App Logo (left), "Tokens Remaining" pill (center), and User Profile/Settings dropdown (right).
2.  **`Sidebar_Menu`**: Collapsible left navigation (Dashboard, Script Vault, Voice Cloning, Brand Kits, Settings).
3.  **`InApp_Copilot_Widget`**: A floating chat widget in the bottom right corner connected to OpenAI Assistants API for step-by-step guidance.
4.  **`Project_Card`**: A UI component to display generated videos/scripts in a grid. Shows the Thumbnail, Title, Date, and a "Download Assets" button.

---

## 3. Page Architecture (The SPA Approach)

We will use a primary "Dashboard" page that conditionally shows different "Views" (Groups) based on navigation clicks.

### Page 1: `index` (Landing & Auth)
*   **Hero Section:** High-converting copy ("Automate Faceless Channels in 1-Click").
*   **Auth Flow:** Standard Bubble Signup/Login popup or dedicated group. Collects Name, Email, and creates the `User` record.
*   **Stripe Checkout:** If Freemium, let them in. If Paid-Only, block access until a Stripe Checkout session is complete.

### Page 2: `app` (The Main SaaS Interface)
This page contains the `Sidebar_Menu` and a main content area. Clicking a sidebar item changes a Custom State on the page (e.g., `current_view`), which hides/shows the following major groups:

#### View A: "Workspace Home" (The Hub)
*   **Welcome Banner:** "Welcome back, {Current User's Name}. Let's build your channel."
*   **Quick Actions:** 3 Large Buttons -> "Generate New Script", ", "Analyze Competitor", "Train Voice Model".
*   **Recent Projects:** A repeating group of `Content_Job` records sorted by creation date, using the `Project_Card` reusable element.

#### View B: "The Script Vault" (Generation UI)
*   **Input Form:**
    *   Dropdown: Select Niche.
    *   Input: Enter specific topic/idea (or leave blank for AI to ideate).
    *   Dropdown: Video Length (Short 60s, Long 8min).
    *   Button: "Generate Scripts & Hooks" (Costs 1 Token).
*   **Output View:**
    *   Displays the returned JSON (parsed) in a clean editor interface. Let the user manually edit the script or swap out the generated Hooks before sending it to the "Audio/Visual pipeline".

#### View C: "Brand Kit Manager"
*   **Inputs:** Color pickers (Hex), Font dropdowns, Avatar/Banner upload zones.
*   **Aesthetic Prompt Builder:** A text area where the user defines the "look" (e.g., "Dark, Gritty, Finance, Luxury, highly detailed, 8k").
*   **Workflow:** Clicking "Save" updates the `BrandKit` data type for the active Workspace. These variables are automatically injected into future Midjourney/fal.ai API calls.

#### View D: "Analytics & Competitor" (Phase 2)
*   An input field to paste a YouTube Video URL.
*   A "Scanning..." loading animation.
*   Results Group: Displays the API data (Views, Title Keywords, Estimated RPM, Hook breakdown).

---

## 4. Frontend Workflows & Feedback Loops

To make the app feel "alive" while waiting for AI generation:

1.  **The Generation Loading State:**
    *   When a user clicks "Generate" (triggering the backend API workflow), immediately show a **Lottie Animation** or Skeleton Loader.
    *   Display dynamic text: "Analyzing Topic..." -> "Writing Script..." -> "Generating Hooks..." using Bubble's "Pause before next action" or custom states to cycle the messages, giving the illusion of deep work while the API resolves.
2.  **Handling The Backend Return:**
    *   Since generating a full video takes ~1-3 minutes, return the Bubble API response *immediately* as "Job Queued".
    *   Use a **"Do every 5 seconds"** workflow to fetch the `Content_Job` status from the database. When status changes from `Pending` to `Complete`, hide the loading animation and reveal the final Play button / Download links.

---

## 5. Security & Data Privacy

*   **Privacy Rules (Crucial):** In Bubble's Data tab, configure Privacy Rules so `Content_Job` and `BrandKit` records are ONLY visible to the `Current User` who owns the assigned `Workspace_ID`.
*   **API Security:** Never put your OpenAI or ElevenLabs API keys in frontend API calls. Always route calls through Bubble's "Backend Workflows" so the keys remain hidden on the server.
