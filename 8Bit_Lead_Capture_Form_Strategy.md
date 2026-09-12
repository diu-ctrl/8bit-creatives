# 8Bit Creatives — Lead Capture Form Strategy & Blueprint

## 1. Recommended Form Flow: The "Conversational Brief"

We will not build a standard vertical list of inputs on a white card. We will build a **3-step "Conversational Brief"** — a multi-step flow that feels like a project intake conversation, not a contact form.

**Flow:**
1.  **Step 1: The Basics** (Who are you?)
2.  **Step 2: The Project** (What are we building?)
3.  **Step 3: The Vibe** (How do you want it to feel?)
4.  **Submission & Confirmation**

---

## 2. The Questions (Step by Step)

### Step 1: The Basics
*   **Name:** (Text input) — "What should we call you?"
*   **Email:** (Email input) — "Where should we send the reply?"
*   **Company / Brand:** (Text input) — "Who are you representing?"
*   **Role:** (Dropdown: Brand Manager, Founder, Marketing Lead, Agency, Other) — "What's your role?"

### Step 2: The Project
*   **Project Type:** (Pill buttons: Brand Campaign, Live Broadcast, Tournament, Creator Integration, Platform Deal, Not Sure Yet) — "What are we building?"
*   **Budget Range:** (Pill buttons: <₹10L, ₹10L-₹25L, ₹25L-₹50L, ₹50L-₹1Cr, ₹1Cr+, Let's talk) — "What's the ballpark?"
*   **Timeline:** (Pill buttons: ASAP, 1-3 months, 3-6 months, Just exploring) — "When does this need to happen?"

### Step 3: The Vibe
*   **The Pitch:** (Textarea) — "Tell us about the project. What's the goal, the game, the audience?"
*   **How did you find us?** (Optional, Dropdown: LinkedIn, Instagram, YouTube, Word of mouth, Search, Other) — "How did you hear about 8Bit?"

---

## 3. Visual Treatment (Matching our Design Language)

*   **Container:** Dark background (#0A0A0A). The form sits in the center of the page, but NOT inside a bright white card. It lives in the dark space.
*   **Inputs:** Capsule-shaped (border-radius: 999px) for text inputs and pill buttons. NO sharp-cornered rectangles.
*   **Borders:** Subtle 1px borders (rgba(255,255,255,0.15)). Background transparent (rgba(255,255,255,0.04)).
*   **Focus State:** Border turns white (#FFFFFF). NO orange accents. NO glow.
*   **Typography:** Geist font only. Labels are Geist Regular 14px, white. Placeholder text is rgba(255,255,255,0.4).
*   **Progress Indicator:** A thin, 1px horizontal line at the top of the form container. It fills with white as the user progresses through the 3 steps. No numbered circles or "Step 1 of 3" text — just the line.
*   **Buttons:** "Back" is a text link (underlined). "Continue" is an Obsidian Fill capsule button (transparent → dark fill + white border on hover).
*   **No Gradients, No Glassmorphism.** Pure, editorial dark mode.

---

## 4. Interactions & Microcopy

*   **Step Transitions:** When clicking "Continue", the current step fades out (opacity 0, 200ms) and the next step fades in (opacity 0 → 1, 200ms). No sliding or scaling.
*   **Microcopy:**
    *   Step 1 Title: "Let's start with the basics."
    *   Step 1 Subtitle: "We just need to know who you are."
    *   Step 2 Title: "Tell us about the project."
    *   Step 2 Subtitle: "Don't worry, you can change these later."
    *   Step 3 Title: "What's the vision?"
    *   Step 3 Subtitle: "The more context you give, the better we can respond."
*   **Validation:** Inline. If a required field is empty on "Continue", the border turns to a muted red (#cc4444) and a small text appears below: "This would be helpful to know."
*   **Keyboard Support:** Enter key on the last field of a step triggers "Continue".

---

## 5. Submission & Confirmation

*   **Submission:** The "Continue" button on Step 3 changes to "Send the brief". On click, the button transitions to a loading state (text changes to "Sending..." with a small spinning circle).
*   **Confirmation State:** Once "submitted" (simulated for now, as backend is pending), the entire form container transitions to a confirmation view:
    *   The form fields fade out.
    *   A clean, centered message appears: "Brief received. We'll be in touch within 24 hours."
    *   Below it, a small Geist text: "If it's urgent, reach out directly to business@8bitcreatives.in"
    *   NO checkmark icons, NO confetti, NO popups. Just a quiet, confident editorial confirmation.

---

## 6. Mobile Experience

*   The form container takes 100% width with 24px padding.
*   Pill buttons wrap naturally.
*   The progress line stays at the top.
*   The "Back" and "Continue" buttons stack vertically if needed, with "Continue" taking full width.
*   Textareas expand to a minimum height of 120px for comfortable thumb-typing.

---

## 7. What Should Deliberately NOT Be Included

*   **NO Phone Number field.** We communicate via email and Slack. Phone numbers create friction and lead to unwanted sales calls.
*   **NO "How can we help you?" generic textarea.** The 3-step flow replaces this with structured, intentional questions.
*   **NO File Upload.** If they have a brief deck, they can mention it in the pitch text and we'll request it via email.
*   **NO CAPTCHA.** We will handle spam filtering on the backend (or via Airtable/Zapier spam rules). CAPTCHA kills conversion rates.
*   **NO Calendar / Date Pickers.** "Timeline" is a pill button (ASAP, 1-3 months), not a specific date. We don't need exact dates at the inquiry stage.
*   **NO Checkboxes for "Subscribe to newsletter."** This is a lead capture form, not a marketing signup.

---

## 8. Final Reasoning

This structure works because it respects the user's time while gathering enough context to qualify the lead. The 3-step flow breaks the cognitive load into manageable chunks (who, what, how), making a long form feel short. The pill-button inputs for project type, budget, and timeline reduce typing friction and give us structured data for the Ops Portal. The dark, capsule-based visual language matches our established editorial aesthetic — it feels like an 8Bit form, not a generic agency template. The quiet confirmation state reinforces our "we don't sell, we prove" brand voice.
