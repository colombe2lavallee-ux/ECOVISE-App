---
name: Forest Modern
colors:
  surface: '#fbf8fc'
  surface-dim: '#dcd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e1e5'
  on-surface: '#1b1b1e'
  on-surface-variant: '#404941'
  inverse-surface: '#303033'
  inverse-on-surface: '#f3f0f4'
  outline: '#717970'
  outline-variant: '#c0c9be'
  surface-tint: '#2e6a41'
  primary: '#003b1b'
  on-primary: '#ffffff'
  primary-container: '#14532d'
  on-primary-container: '#87c695'
  inverse-primary: '#96d5a3'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#492c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#674000'
  on-tertiary-container: '#fda417'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1f2be'
  primary-fixed-dim: '#96d5a3'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#12512c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e1e5'
typography:
  display-hero:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  display-hero-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-numeric-lg:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
  label-numeric-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system articulates an aura of grounded ecological stewardship, high-utility transparency, and domestic calm tailored for established homeowners and modern families. It balances the precision of an intelligent energy management utility with the tactile warmth of a thoughtfully orchestrated home.

The aesthetic fuses **Corporate/Modern** structural reliability with **Eco-Minimalism**. Layouts prioritize clarity, generous negative space, high visual contrast for quick scanning, and instant reassurance. Visual noise and decorative gradients are eliminated in favor of clean information hierarchy, clear operational states, and high legibility.

## Colors
The color system relies on natural depth and high functional contrast against an off-white, warm canvas.

- **Canvas & Background**: `#F8FAF8` serves as the primary window background, creating an organic, paper-like warmth that prevents screen fatigue. Surfaces sit on pure `#FFFFFF` with muted borders (`#E2E8F0`) to ensure contrast.
- **Primary (`#14532D`)**: Deep forest green anchors primary navigation, high-priority buttons, active states, and structural typography. It instills stability and institutional reliability.
- **Secondary (`#10B981`)**: Vibrant emerald green communicates active eco-modes, optimal energy production, positive monetary savings, and healthy device telemetry.
- **Tertiary (`#F59E0B`)**: Warm amber governs warnings, moderate drain, peak-tariff zones, and recommended maintenance events.
- **Urgent / Draining Alert (`#EF4444`)**: High-saturation coral/crimson reserved exclusively for excessive consumption spikes, grid faults, and critical hardware failures.
- **Neutral (`#27272A`)**: Deep charcoal delivers accessible, sharp copy while avoiding the optical severity of pure black.

## Typography
Typography is split into three deliberate functional roles:

1. **Headlines (Manrope)**: Delivers geometric balance, welcoming curvature, and robust legibility across titles and key section headers.
2. **Body & Interface (Inter)**: Built for neutral, high-legibility transactional information, paragraphs, form labels, and instructions.
3. **Data & Metrics (JetBrains Mono)**: Drives tabular energy readouts (kWh, $, CO₂ offset, timestamps). Monospaced sizing prevents horizontal jitter during real-time telemetry updates.

All critical numbers must maintain a minimum body size of 14px to guarantee readability for 35+ users viewing dashboards across mobile and tablet distances.

## Layout & Spacing
The layout structure implements a fluid 12-column grid on desktop displays (min-width: 1024px), adapting to an 8-column grid on tablet devices (640px–1023px) and a single-column or 4-column structure on mobile devices (<640px).

- **Outer Margins**: Desktop layouts use `margin` (2rem/32px) with a centered max-width container capped at `1440px`. Mobile interfaces compress to `margin-mobile` (1rem/16px) to maximize horizontal data area.
- **Rhythm**: Component spacing strictly adheres to 4px/8px incremental multiples. Metric cards and dashboards use internal padding of `space-lg` (1.5rem/24px) for desktop and `space-md` (1rem/16px) for compact viewports.
- **Reflow**: Multi-metric comparison boards collapse into vertical stacked cards on mobile views, ensuring data graphs maintain sufficient height without horizontal squeeze.

## Elevation & Depth
Depth is created through soft ambient shadows and low-contrast surface borders, avoiding deep drop shadows or murky skeuomorphism.

- **Level 0 (Canvas)**: Background surface `#F8FAF8`.
- **Level 1 (Cards, Metric Containers)**: Background `#FFFFFF`, bordered by 1px solid `#E2E8F0`, elevated with an ambient shadow: `0 2px 8px -2px rgba(20, 83, 45, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)`.
- **Level 2 (Interactive Flyouts, Active Dropdowns, Hovered Cards)**: Ambient shadow: `0 10px 25px -5px rgba(20, 83, 45, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03)`.
- **Level 3 (Modals, Urgent Intervention Overlays)**: Ambient shadow: `0 20px 35px -10px rgba(15, 23, 42, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.05)`. Surfaces retain a backdrop scrim of `rgba(15, 23, 42, 0.45)` with `backdrop-filter: blur(4px)`.

## Shapes
The structural elements feature balanced, approachable corner radii with a standard scale:

- **Cards & Data Modules**: Fixed at `16px` (`rounded-lg`), creating friendly, modern containment.
- **Buttons & Input Fields**: `8px` (`rounded-md`), establishing an anchor for utility components.
- **Status Badges & Quick Action Chips**: Full pill radius (`9999px`) to immediately signal dynamic or categorized states distinct from input areas.
- **Progress Gauges & Sliders**: Pill caps (`9999px`) on track indicators for continuous, smooth energy flow metaphors.

## Components

### Buttons
- **Primary**: Deep Forest Green (`#14532D`) background, `#FFFFFF` text, `8px` radius. Hover: `#166534`. Active: `#0F3D21`.
- **Secondary (Eco-action)**: Emerald Green (`#10B981`) background, `#FFFFFF` text. Used exclusively for energy-saving triggers or green rebate submissions.
- **Tertiary / Outline**: Transparent background, 1.5px border in `#14532D`, `#14532D` text.
- **Destructive**: `#EF4444` background or border for emergency shutdowns or disconnection actions.

### Cards & Metric Modules
- Metric containers feature an upper header with a contextual label (`label-caps`), a large mono readout (`label-numeric-lg`), and an inline status indicator.
- Backgrounds remain `#FFFFFF` with a crisp `1px` outline of `#E2E8F0` and `16px` corner rounding.

### Chips & Status Badges
- Pill-shaped (`9999px`) with padding `4px 10px`.
- **Eco Optimal**: Tinted green `#ECFDF5`, text `#065F46`, paired with an emerald icon dot.
- **Peak / Warning**: Tinted amber `#FEF3C7`, text `#92400E`.
- **Drain / Hazard**: Tinted red `#FEE2E2`, text `#991B1B`.

### Form Inputs & Selectors
- Height: 44px minimum for touch accessibility.
- Background: `#FFFFFF`. Border: `1.5px solid #CBD5E1`, resting radius `8px`.
- Focus State: Border color transitions to `#14532D` with an accessible `0 0 0 3px rgba(20, 83, 45, 0.15)` focus ring.

### Checkboxes & Radios
- Size: 20px x 20px with a 4px border radius for checkboxes and full circle for radios.
- Checked state: `#14532D` fill with white indicator marks.

### Specialized Energy Visualizers
- **Live Flow Bar**: Dual-color linear progress bar displaying solar/grid mix (`#10B981` vs `#F59E0B`).
- **Appliance Replacement ROI Card**: Compares current consumption against proposed replacement using dual columns, clear cost difference highlights, and eco-rebate eligibility tags.