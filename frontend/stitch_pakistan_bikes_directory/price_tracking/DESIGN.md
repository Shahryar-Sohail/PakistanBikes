---
name: Kinetic National
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#59413d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#8d706c'
  outline-variant: '#e1bfb9'
  surface-tint: '#b02d21'
  primary: '#9e2016'
  on-primary: '#ffffff'
  primary-container: '#c0392b'
  on-primary-container: '#ffe5e1'
  inverse-primary: '#ffb4a9'
  secondary: '#006d38'
  on-secondary: '#ffffff'
  secondary-container: '#94f4ad'
  on-secondary-container: '#00723a'
  tertiary: '#005875'
  on-tertiary: '#ffffff'
  tertiary-container: '#007296'
  on-tertiary-container: '#d3eeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4a9'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#8e130c'
  secondary-fixed: '#96f7b0'
  secondary-fixed-dim: '#7bda96'
  on-secondary-fixed: '#00210d'
  on-secondary-fixed-variant: '#005228'
  tertiary-fixed: '#c0e8ff'
  tertiary-fixed-dim: '#80d0f8'
  on-tertiary-fixed: '#001e2b'
  on-tertiary-fixed-variant: '#004d66'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system is engineered to bridge the gap between national heritage and mechanical precision. It targets bike enthusiasts, buyers, and industry professionals in Pakistan, evoking a sense of reliability, speed, and modern patriotism. 

The aesthetic is **Modern / Corporate**, leaning into high-utility layouts with intentional pops of "National Kinetic" accents. It utilizes a clean, structural grid inspired by technical blueprints, paired with a sophisticated "Flag-forward" color application. The emotional response should be one of "Trusted Performance"—where every interface element feels as finely tuned as the machinery it showcases.

## Colors
The palette is rooted in a "Crisp High-Contrast" philosophy.
- **Primary (Deep Red):** Used for critical actions, active states, and brand-defining accents like underlines. It represents the energy of the engine.
- **Secondary (Forest Green):** Used sparingly as an accent to ground the brand in its national identity. It serves as a secondary highlight for "Success" states or eco-friendly bike categories.
- **Neutral (Dark Charcoal):** The foundation for all typography and structural borders, providing a high-legibility, tech-forward feel.
- **Background (White):** A pure, clinical white backdrop ensures the bike photography remains the focus.

## Typography
The design system utilizes **Inter** exclusively to maintain a systematic, utilitarian aesthetic. 
- **Headlines:** Use Bold (700) and Semi-Bold (600) weights. These should feel heavy and authoritative, reflecting the industrial nature of the automotive industry.
- **Body:** Set at a standard 16px for optimal readability.
- **Accents:** Active links and section headers utilize a bold red underline (3px height) offset from the text to create a "racing stripe" effect.

## Layout & Spacing
The system follows a **12-column Fixed Grid** for desktop, transitioning to a **4-column Fluid Grid** for mobile devices. 
- **Rhythm:** Spacing follows a 4px base unit (4, 8, 12, 16, 24, 32, 48, 64).
- **Split Layouts:** Detail pages should utilize a 50/50 or 60/40 split. The left side remains sticky with high-quality bike imagery, while the right side scrolls with technical specifications and CTA blocks.
- **Safe Areas:** Maintain a minimum 24px gutter between columns to ensure technical data does not feel cluttered.

## Elevation & Depth
Depth is handled through **Low-Contrast Outlines** rather than heavy shadows to maintain a "tech-blueprint" feel.
- **Base State:** Elements use a subtle 1px border (`#1C1C1E` at 10% opacity).
- **Hover State:** Interactive cards utilize a "Kinetic Lift"—a 4px upward translation (`translateY(-4px)`) combined with a transition of the border color to Primary Red. 
- **Overlays:** Modals and sticky navbars use a backdrop blur (10px) with a semi-transparent white fill to maintain context of the content beneath.

## Shapes
The shape language is "Soft-Industrial."
- **Standard Radius:** 12px for cards, input fields, and large buttons. This provides a modern, approachable feel without appearing too "bubbly."
- **Pill Shapes:** Reserved exclusively for "Stat Chips" (CC, Price, Fuel Type) to differentiate data points from interactive buttons.
- **Interactive Elements:** Buttons maintain the 12px radius but feature a subtle `scale(0.97)` transform on click to provide tactile feedback.

## Components
- **Sticky Navbar:** White background (#FFFFFF) with a 1px bottom border (#1C1C1E at 10% opacity). Logo on the left, navigation centered, and a primary CTA on the right.
- **Bike Cards:** 12px corner radius. Features a 1px subtle border. On hover, the border changes to Primary Red and the card lifts 4px.
- **Stat Chips:** Small pill-shaped containers with a Forest Green or Dark Charcoal background and white text. Used for CC ratings and pricing.
- **Tab Switchers:** Minimalist text-only tabs. The active state is indicated by a 3px thick Primary Red underline with a 4px gap from the text.
- **Quizzes:** Large, clickable cards (100% width on mobile) with bold typography. Progress is shown via a thick 8px Forest Green bar at the top of the viewport.
- **Admin Sidebar:** Dark Charcoal (#1C1C1E) background with high-contrast white text. Active menu items use a Forest Green left-border "indicator" (4px width).
- **Input Fields:** 1px border, 12px radius. Focus state swaps the border to Primary Red with a 2px inner glow.