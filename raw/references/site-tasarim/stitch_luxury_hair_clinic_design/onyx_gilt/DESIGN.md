# Design System Strategy: The Architectural Aesthetic

## 1. Overview & Creative North Star: "The Clinical Atelier"
The North Star for this design system is **"The Clinical Atelier."** We are moving away from the "medical template" look and toward an editorial experience that feels like a high-end architectural digest. The goal is to balance the sterile precision of hair restoration with the warmth of a luxury concierge service.

This system rejects the rigid, boxy layouts of standard web design. Instead, we utilize **Intentional Asymmetry** and **Tonal Depth**. Elements should feel "placed" rather than "slotted," using overlapping typography and shifting background tiers to create a sense of bespoke craftsmanship. Every screen should feel like a curated gallery piece, emphasizing the "Art" in "State-of-the-Art."

---

## 2. Colors: Tonal Luxury
Our palette is rooted in the depth of `surface` (#131313) and the luminosity of `primary` (#E9C176).

- **The "No-Line" Rule:** To maintain a premium feel, 1px solid borders are strictly prohibited for sectioning. Use background shifts to define space. A `surface-container-low` section sitting against a `surface` background provides all the separation needed without the "cheapness" of a stroke.
- **Surface Hierarchy & Nesting:** Think of the UI as physical layers. 
    - Base Layer: `surface` (#131313).
    - Secondary Sections: `surface-container-lowest` (#0E0E0E) for a recessed, "etched" look.
    - Interactive Layers: `surface-container-high` (#2A2A2A) for cards and modals.
- **The "Glass & Gradient" Rule:** For floating navigation or hero overlays, use Glassmorphism. Apply `surface-container-highest` at 70% opacity with a 20px backdrop-blur. 
- **Signature Textures:** For main CTAs and "Success" moments, use a subtle linear gradient from `primary` (#E9C176) to `primary-container` (#C5A059) at a 135-degree angle. This adds a "brushed gold" metallic soul to the UI.

---

## 3. Typography: Editorial Authority
The contrast between the Serif and Sans-Serif is our primary tool for storytelling.

- **Display & Headlines (Noto Serif):** These are our "Authority" tokens. Use `display-lg` for hero statements with tight letter-spacing (-0.02em). This typeface conveys medical heritage and the "high-contrast" precision of the clinic’s results.
- **Body & Labels (Manrope):** The "Modernist" counter-balance. Manrope provides a clean, geometric stability. `body-lg` is your workhorse for clinical explanations, ensuring high legibility against the dark backgrounds.
- **The Hierarchy Strategy:** Use `primary` (#E9C176) for `label-md` or `title-sm` to highlight expertise markers (e.g., "Surgical Excellence") while keeping long-form body text in `on-surface-variant` (#D1C5B4) to reduce eye strain on dark mode.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to represent "height"; we use light.

- **The Layering Principle:** Depth is achieved by stacking. Place a `surface-container-highest` card atop a `surface-container-low` section. This creates a natural, soft lift.
- **Ambient Shadows:** If an element must "float" (e.g., a booking modal), use a shadow with a 40px blur, 0px offset, and 6% opacity, tinted with the `primary` color. This mimics the soft glow of a gallery spotlight rather than a digital drop shadow.
- **The Ghost Border:** For input fields or secondary buttons where containment is required, use the `outline-variant` token at 20% opacity. It should be felt, not seen.
- **Architectural Edge:** All containers must adhere to `ROUND_FOUR` (0.25rem). This sharp, subtle rounding maintains the "Architectural" feel—sophisticated and purposeful.

---

## 5. Components: Precision Elements

- **Buttons:**
    - **Primary:** Gradient fill (`primary` to `primary-container`), `on-primary` text, uppercase `label-md` for an assertive feel.
    - **Secondary:** Transparent fill with a `primary` "Ghost Border" (20% opacity).
- **Cards:** No borders or dividers. Use a `surface-container-high` background. Images within cards should have a subtle 10% black overlay to ensure text legibility.
- **Inputs:** Use `surface-container-lowest` for the field background. The label should transition to `primary` gold when focused, acting as a "luxury signal."
- **Medical Chips:** For hair-type or treatment tags, use `secondary-container` with `on-secondary-container` text. Keep them sharp-edged to match the architectural theme.
- **Lists:** Strictly forbid divider lines. Use `1.5rem` (24px) of vertical white space to separate list items. Use a `primary` colored 4px vertical line to the left of an "active" list item.
- **Signature Component: The "Consultation Slider":** A custom UI element for "Before & After" comparisons. Use a thin `primary` gold vertical handle with a glassmorphic circular thumb.

---

## 6. Do's and Don'ts

### Do:
- **Use Intentional White Space:** Allow the `surface` color to breathe. High-end brands aren't afraid of "empty" space; it signals luxury and confidence.
- **Layer Text Over Images:** Use `display-md` Noto Serif partially overlapping high-quality clinical photography to create an editorial, magazine-style layout.
- **Maintain Medical Precision:** Ensure all thin-line icons are exactly 1.5px or 2px in weight.

### Don't:
- **Never use Pure White:** Use `secondary-fixed` (#E3E3DE) or `on-surface` (#E5E2E1) for high-contrast text. Pure #FFFFFF is too clinical and jarring against Deep Onyx.
- **Avoid Rounded Pills:** Never use `full` roundness for buttons. It breaks the architectural integrity of the brand. Stick to `sm` (2px) or `DEFAULT` (4px).
- **No Heavy Shadows:** Do not use default CSS shadows. If it looks like a "box shadow," it’s too heavy. It should look like "ambient light."