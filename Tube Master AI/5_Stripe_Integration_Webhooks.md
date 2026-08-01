# Step 5: Advanced Stripe Integration (The Token Economy Engine)

To turn Tube Master AI from a cool tool into a profitable business, you must implement a robust token economy using Stripe. This prevents API abuse by strictly tying generation power to paid subscriptions or top-up purchases.

This guide details exactly how to configure the Stripe API within Bubble.io to automatically grant and track user Credits/Tokens.

---

## 1. Prerequisites (Stripe Dashboard)

Before touching Bubble, configure your products in Stripe.

1.  Log in to your [Stripe Dashboard](https://dashboard.stripe.com/). Make sure "Test Mode" is enabled (toggle in top right).
2.  Go to **Product Catalog** -> **Add Product**.
3.  **Product 1 (The Subscription):**
    *   Name: `Pro Plan Auto-Pilot`
    *   Description: `500 AI Video Generation Credits per Month`
    *   Pricing: `$79.00`
    *   Billing: **Recurring (Monthly)**
    *   *Save and copy the exact `Price ID` (Looks like `price_1Nxy...`)*
4.  **Product 2 (The Top-Up):**
    *   Name: `200 Bonus Credits`
    *   Pricing: `$15.00`
    *   Billing: **One-time**
    *   *Save the `Price ID`.*

---

## 2. Bubble Integration: The Stripe Plugin

1.  In Bubble, go to **Plugins** -> Add the official `Stripe` plugin (by Bubble).
2.  In the Stripe Dashboard, go to **Developers** -> **API Keys**.
3.  Copy your `Publishable key` and `Secret key` into the Bubble plugin settings (ensure you use the `Test` keys for Development and `Live` keys for Live deployment).

---

## 3. The Frontend Checkout Workflow

Let's build the workflow for when a user clicks the "Upgrade to Pro ($79/mo)" button on your pricing page.

1.  On the Pricing page, create a Button: `Btn Upgrade Pro`.
2.  Add Workflow: `When Btn Upgrade Pro is clicked`.
3.  **Action 1:** `Payment` -> `Subscribe the user to a plan`.
    *   `Stripe plan name`: Paste your `Price ID` for the $79 subscription here.
    *   Check the box: `Current user` (This associates the Stripe Customer ID with their Bubble account).
4.  *(Optional Flow): If you want a prettier Checkout, use Bubble's `Stripe Checkout v2` action instead.*

---

## 4. The Critical Component: Webhooks (The Backend Listener)

*Why Webhooks?* If a user's credit card fails on month 3, Stripe knows, but Bubble doesn't. You MUST set up a Webhook so Stripe can "tell" Bubble to downgrade the user and remove their tokens. Also, when a user successfully pays, the webhook is what actually grants them the 500 tokens.

### Step 4A: Expose an API Endpoint in Bubble
1.  Go to Bubble **Settings** -> **API**. Ensure `Enable Workflow API and backend workflows` is checked.
2.  Go to the **Backend Workflows** page (top left page dropdown).
3.  Click where it says "Click here to add an API workflow".
4.  Select `New API Workflow` (Name it `stripe_payment_success`). Check `Expose as a public API`.
5.  Wait, actually, the easiest way for Stripe Webhooks in Bubble is to select **"Detect Request Data"**.
    *   Click "Detect Data". Bubble will give you a temporary URL (e.g., `https://your-app.bubbleapps.io/version-test/api/1.1/wf/stripe_payment_success/initialize`).

### Step 4B: Tell Stripe to ping Bubble
1.  Go to the Stripe Dashboard -> **Developers** -> **Webhooks**.
2.  Click **Add Endpoint**.
3.  Paste the URL Bubble gave you.
4.  **Events to Listen to:** Select `invoice.payment_succeeded`.
5.  Click `Add Endpoint`.
6.  *Now, generate a test payment in Stripe (using a fake card like 4242 4242...).*

### Step 4C: Map the Payload in Bubble
1.  Back in Bubble, if you did it right, the "Detect Data" pop-up will show a massive JSON object (the Stripe payload). Click `Save`.
2.  Now, inside the `stripe_payment_success` Backend Workflow, build this logic:
    *   **Action 1:** `Data (Things)` -> `Make changes to a thing`.
    *   *Thing to change:* `Search for Users` -> Constraint: `Stripe_Customer_ID = Request Data's object's customer`. `(First Item)`
    *   **Change Field 1:** `Subscription_Tier` = "Pro"
    *   **Change Field 2:** `Token_Balance` = `Current User's Token_Balance + 500`

---

## 5. Automating the Downgrade (Churn Protection)

You must repeat Step 4 for failed payments.
1.  Create another Backend Workflow in Bubble called `stripe_payment_failed`.
2.  In Stripe Webhooks, add the event: `invoice.payment_failed` and point to that URL.
3.  In Bubble, the workflow logic: `Make changes to User` -> `Subscription_Tier = "Free"`. Optional: Reset their `Token_Balance` to 0 to cut off their API access instantly.

This architecture runs completely invisibly in the background on your server. It ensures you never inadvertently pay OpenAI/ElevenLabs API fees for a user whose credit card bounced.
