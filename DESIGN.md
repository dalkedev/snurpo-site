---
name: Snurpo website
description: Curious mascot illustration, rounded type and clear developer evidence.
colors:
  lavender: "#e6c7f8"
  mint: "#a5edc4"
  cream: "#fff9ee"
  ink: "#29252b"
  muted: "#66576c"
  line: "rgba(41,37,43,.22)"
  workflow-mint: "#b5efcf"
  mint-hover: "#c2f7d8"
  cream-hover: "#f3e6fc"
  ticket-selected: "#fffdf6"
  success-bg: "#b8f3cf"
  success-text: "#174c31"
  post-bg: "#e3c4f5"
  post-text: "#512767"
  failure-bg: "#ffc1b9"
  failure-text: "#852c24"
  focus: "#6b248d"
typography:
  display:
    fontFamily: "Fredoka, sans-serif"
    fontSize: "clamp(64px,6.7vw,112px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-.03em"
  headline:
    fontFamily: "Fredoka, sans-serif"
    fontSize: "clamp(40px,4.25vw,68px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-.025em"
  title:
    fontFamily: "Fredoka, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-.025em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  control:
    fontFamily: "Fredoka, sans-serif"
    fontSize: "23px"
    fontWeight: 600
    lineHeight: 1.1
  navigation:
    fontFamily: "Fredoka, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.2
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "14px"
    lineHeight: 1.8
rounded:
  badge: "7px"
  small-control: "8px"
  tab: "9px"
  code: "10px"
  panel: "12px"
  screenshot: "14px"
  terminal: "16px"
  ticket: "20px"
  pill: "100px"
spacing:
  inline-tight: "8px"
  inline: "14px"
  content: "24px"
  section-desktop: "110px"
  section-compact: "80px"
  section-mobile: "66px"
components:
  button-primary:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "15px 24px"
  button-primary-hover:
    backgroundColor: "{colors.mint-hover}"
  button-secondary:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "15px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.cream-hover}"
  navigation:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
  language-selector:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "3px"
  request-ticket:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ticket}"
    padding: "16px 17px"
  request-ticket-selected:
    backgroundColor: "{colors.ticket-selected}"
  status-success:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.success-text}"
    rounded: "{rounded.badge}"
    padding: "1px 6px"
  status-failure:
    backgroundColor: "{colors.failure-bg}"
    textColor: "{colors.failure-text}"
    rounded: "{rounded.badge}"
    padding: "1px 6px"
  inspector:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ticket}"
  inspector-tab-selected:
    backgroundColor: "{colors.mint}"
    rounded: "{rounded.tab}"
    padding: "7px 9px"
  feature-selector:
    textColor: "{colors.ink}"
    padding: "20px 15px"
  download-option:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.screenshot}"
    padding: "21px 22px"
  mock-switch:
    backgroundColor: "{colors.cream}"
    rounded: "40px"
    padding: "3px"
    width: "60px"
    height: "32px"
---

# Design System: Snurpo website

## Overview

**Creative North Star: "Curiosity with a nose"**

Snurpo is friendly, nosy and precise. The canonical mint creature, oversized lavender nose and cream eyes supply the expressive character. Broad color fields, rounded display lettering and charcoal contours give the website the same recognizable silhouette without competing with the mascot.

The material contrast is deliberate: the supplied raster illustration has a hand-drawn appearance, shaded volume and irregular outlines; the interactive request ribbon is clean SVG geometry with rounded CSS tickets. Genuine dark application screenshots anchor the playful world in readable product evidence. This records the implemented website, not a redesign of the native application.

**Key Characteristics:**

- Lavender grounds, mint actions, cream reading surfaces and charcoal contours.
- Fredoka gives headlines and major controls a rounded voice; Manrope carries explanatory copy.
- Spacious asymmetrical compositions change scale around real product captures.
- Small rotations and restrained movement connect curiosity to interaction.
- Keyboard access, visible focus and reduced motion are part of the visual behavior.

Recorded from `styles.css`, `build.mjs`, `app.js`, `fonts/fonts.css`, `PRODUCT.md`, the surface brief, raster provenance and the rendered preview on 12 November 2026. Surface-specific intent remains in `.impeccable/surfaces/index-html.md`; finish evidence remains in `.impeccable/review/finish-review.md`.

## Colors

The palette is light, warm and saturated enough to remain recognizable, with dark text and contours providing definition. The frontmatter owns exact values. The implementation has no complete tonal scale; no synthesized shades are promoted to tokens.

### Primary

- **Nose lavender** establishes the opening and download grounds. The illustration retains its own original lavender shading.
- **Curious mint** fills primary actions and selected inspector tabs, and outlines the selected or hovered request.

### Secondary

- **Workflow mint** creates a distinct broad field behind the three-step explanation.
- **Mint hover** and **cream hover** are the two existing button hover fills.

### Neutral

- **Warm cream** is the reading ground and default fill for outlined controls and inspector surfaces.
- **Charcoal ink** supplies text, icons and characteristic contours.
- **Muted plum** supports captions and secondary explanatory text.
- **Transparent ink line** separates tabs, gallery controls and supporting links.
- **Selected ticket cream** subtly brightens the active request while its mint ring carries selection.

### Functional accents

- The success pair identifies GET and 200; the post pair identifies POST; the coral failure pair identifies 503 and the enabled failure mock. Labels remain visible, so color is never the only distinction.
- Focus purple belongs to the global keyboard ring. Dark terminal and footer surfaces use their exact local CSS values; they are material-specific surfaces, not a second page theme.

**The Contour Rule.** Keep charcoal contours around the tactile controls and demonstration surfaces. Tonal fields and quieter dividers separate reading content.

## Typography

**Display font:** Fredoka, with sans-serif fallback. Self-hosted weights are 700 for headlines and the wordmark, and 600 for major controls, navigation and request tickets.

**Body font:** Manrope, with sans-serif fallback. The site hosts 400, 600 and 800; regular copy uses 400, while selected tabs, functional labels and prominent links use heavier emphasis.

**Code font:** The platform monospace stack in the frontmatter. Code stays selectable and retains normal developer syntax rather than adopting the display face.

The hierarchy is role-based, without a claimed mathematical scale. Display and headline roles use the frontmatter clamps; section copy is usually 17 to 20px, with the opening description ranging to 25px. The standard paragraph measure is at most 65ch. Base body size becomes 16px at the mobile breakpoint. Small captions and demo metadata are context-specific, not a general body-text scale.

At 600px and below, the opening title uses `clamp(44px,11.8vw,68px)`, a line height of `.99`, normal wrapping and a 440px maximum width. Section headings become 42px. Titles balance their wrapping in both languages. Prominent buttons retain Fredoka 600 as their size contracts.

**The Two Voices Rule.** Use rounded Fredoka for personality and major actions; keep explanation, metadata and technical detail in Manrope or monospace.

## Layout

The standard container is centered with `width: min(1440px,92%)`; mobile uses 90%. Ordinary sections use the three observed spacing tokens, with intentional local exceptions for the first screenshot, terminal and footer. The opening itself can extend to 1920px and clips illustration and ribbon overflow.

The desktop composition is asymmetrical: oversized illustration and expressive type share the opening, while later sections pair prose with larger screenshots or a terminal. Column proportions include `.8fr 1.2fr` and the reversed relationship. The three-step workflow uses a three-column grid; the feature selector uses four columns. These are demonstrated layouts, not a requirement that every future surface repeat the landing-page sequence.

Responsive behavior follows the actual CSS breakpoints:

- **1650px and above:** the opening gains height and the mascot may grow to 650px.
- **1200px and below:** the navigation, opening controls and request tickets become more compact; ordinary section spacing contracts.
- **900px and below:** two request choices remain visible; the third is hidden. If the profile request was selected before resizing, selection returns to checkout. Product, terminal and evidence layouts progressively stack, while related supporting text can remain in two columns.
- **600px and below:** navigation keeps GitHub and the language selector. The hero title wraps, the mascot and two request choices share a compact scene, and the inspector sits below it at 90% width. The gallery becomes two columns; workflow, evidence, download and footer content stack. Screenshot and terminal rotations are removed where specified. Expand labels remain visible without hover.
- **370px and below:** action labels and ticket copy contract again, and the opening reserves extra vertical space.

Both English and Polish use the same layout rules. Preserve their real wrapping and direct access to the inspector rather than fixing desktop coordinates into mobile layouts.

## Elevation & Depth

Depth combines flat color fields, strong contours, slight rotation and a small set of soft shadows. Shadows support interaction or lift a technical surface; they do not become hard offset blocks. The illustration's own shading remains in its raster asset. The request's mint ring is selection, not elevation.

The sidecar stores the exact shadow values for the inspector at rest, the terminal at rest, raised buttons on hover, and the screenshot dialog. Buttons rise by 4px on hover and settle on activation. Platform download rows move 6px horizontally on hover. Screenshot frames use small resting rotations and retain the real image content within them.

## Shapes

The system combines pill actions, circular workflow symbols, rounded rectangular tickets and restrained rounded technical panels. Common radii are recorded by role in the frontmatter. Charcoal outlines are usually 2px, with 3px outlines in the large opening demonstration and actions. The active desktop request has a small outlined pointer toward the inspector; mobile removes that pointer.

The request ribbon is an SVG curve with round caps, a charcoal outer stroke, a cream inner stroke and mint moving marks. The cream section boundary is another SVG curve. These are clean geometric devices. Preserve the mascot's hand-drawn appearance through the supplied raster instead of pretending the vector ribbon has the same painted material.

## Components

### Primary and secondary actions

Pill-shaped, outlined and substantial. Mint marks the primary action, cream the secondary. The base dimensions and typography are in the frontmatter; the opening enlarges both together. Icons are actual inline SVG paths, normally placed before the label. Hover changes fill and lifts the action; active presses it down. Text links use a fine underline and increase their icon gap on hover.

### Navigation and language selector

The wordmark uses Fredoka 700. Desktop navigation uses Fredoka 600 and an underline revealed on hover. The outlined cream language pill uses Manrope 800; the current language is charcoal with cream text and `aria-current`. Mobile keeps the wordmark, GitHub and EN/PL controls without introducing an unimplemented menu.

### Request tickets and response inspector

Tickets are buttons with method, path and HTTP status. Their state uses `aria-pressed`, a mint outer ring and brighter cream fill. Above 600px, the inspector follows the selected ticket horizontally, clamped within the request stage; its position uses the ticket's layout bounds rather than its decorative bobbing. At 600px and below, the inspector remains centered at 90% width beneath the scene.

The inspector uses the same cream and charcoal language with a persistent method and endpoint header. That short context is announced politely when selection changes. Selected tabs use mint and weight emphasis. Arrow keys, Home and End move and activate the tab selection; the panel and code area remain focusable. The code viewport is 144px high with internal scrolling and a stable scrollbar gutter, so longer JSON does not expand the inspector or move the hint. Selecting a request or tab starts the code at the top. The hero reserves bottom padding to keep the hint and motion control clear of the wave.

Horizontal following uses a `.35s` transition with the principal easing. Pausing motion or requesting reduced motion removes that transition while retaining selection and position updates.

The scene is explicitly labeled example traffic. Clicking the mascot selects the failing checkout request and provides a short status message. It does not initiate network capture.

### Feature selector and genuine screenshots

The four feature controls use Manrope 800, a pale lavender selected fill and violet selection edge. They become a two-column outlined grid on mobile. Selection updates the image, explanatory text, caption and release label together.

Screenshots remain real native captures. Existing gallery images are labeled 1.4.2; Copy as cURL is labeled 1.5.0. Keep source provenance beside the delivery images. The website exports retain the full source frame with no UI retouching. Captures contain no assistant cursor or macOS system sharing/title strip. Raster mascot and banner artwork are brand illustration, never substitute application evidence.

Screenshot buttons show an expand affordance on hover or keyboard focus, and persist it on mobile. The native dialog uses a dark backdrop, sticky toolbar and actual full image, closes through its control or backdrop, and returns focus to its opener.

### Workflow switch, terminal and download rows

The example mock switch is an outlined 60 by 32px capsule with a charcoal thumb. Enabled state uses the failure fill and moves the thumb by 28px; `aria-checked` and live text communicate state. It belongs to the illustrative workflow.

The terminal is a dark, gently rotated panel with pale mint monospace command text. Its copy control reports success, and failure exposes a readable message and selects the command for manual copying. A genuine cURL capture sits beside it as product evidence.

Download rows are cream, outlined rounded rectangles with Fredoka platform names, Manrope details and download icons. Their hover fill becomes mint. Installation notes use native `details` and `summary`; the plus rotates when expanded.

### Focus and motion

All focusable elements receive the global 3px focus-purple outline with 6px offset. Preserve keyboard order, the skip link, visible selected state and focus restoration in the image dialog.

The principal easing is `cubic-bezier(.16,1,.3,1)`. Ribbon marks loop linearly over 10 seconds; request tickets bob over 5 seconds; the mascot's brief sniff lasts .7 seconds. Hover transitions are generally .2 to .7 seconds. The visible motion control pauses CSS animations and updates its label and pressed state. It is initialized from the operating system's reduced-motion preference and follows preference changes.

With reduced motion, CSS disables animations and transitions, restores automatic scrolling and retains static ticket rotations. No content or interaction depends on animation completing.

**The Motion Consent Rule.** Keep decorative motion pausable and honor reduced motion without removing the demonstration or its controls.

## Do's and Don'ts

### Do:

- **Do** preserve the canonical mascot's proportions, mint body, lavender nose, cream eyes and charcoal contours.
- **Do** keep Fredoka 700 for display and 600 for major controls, with Manrope for readable supporting copy.
- **Do** use real, version-labeled native screenshots with their recorded provenance.
- **Do** retain visible focus, selected-state labels, keyboard behavior and reduced-motion handling.
- **Do** check English and Polish compositions at desktop and mobile widths.

### Don't:

- **Don't** substitute generated application mockups for real screenshots or add a cursor or system sharing strip to captures.
- **Don't** recast the clean request ribbon as painted texture or replace the supplied mascot with a geometric reconstruction.
- **Don't** make color or animation the only way to understand a request, selected tab or mock state.
- **Don't** promote unused CSS declarations, synthesized tonal ramps or unimplemented component variants into design tokens.
- **Don't** use em dashes in authored copy or metadata.
