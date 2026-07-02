Create a full-viewport hero section for "NOCTURNE" underground event society using React, Tailwind CSS, Framer Motion (`motion` package from npm — import from `motion/react`), and `lucide-react` for icons.

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS 3
- `motion` package (v12+) — import `{ motion, AnimatePresence }` from `motion/react`
- `lucide-react` for Menu/X/Radio/Disc3/Users icons

## Global CSS
```css
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@800;900&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #root { height: 100%; }
body { font-family: 'Inter', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background-color: #0a090d; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

## Layout Structure
Single full-viewport (`min-height: 100vh`) flex column, dark background `#0a090d` (warm near-black, not pure black). No background video — instead an ambient CSS backdrop (see below). Content gated behind a `ready` state that flips `true` ~250ms after mount (stands in for a video's `onCanPlay`), wrapped in `<AnimatePresence>`, fading `opacity: 0 -> 1` over 0.4s.

## Easing
Shared constant: `const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];`

## Ambient Backdrop (z-0, absolute inset-0, pointer-events-none)
1. Two radial gradients: indigo `rgba(106,92,255,0.35)` at 18% 12%, magenta `rgba(255,47,126,0.30)` at 85% 78%, opacity 0.7
2. Fine grid overlay: 1px lines in `rgba(245,241,232,1)` at opacity 0.05, `background-size: 56px 56px`
3. Bottom vignette: radial gradient from transparent to `rgba(10,9,13,0.9)`

## Strobe Layer (z-30, absolute inset-0, pointer-events-none)
Every 7 seconds, flash a `#f5f1e8` full-screen overlay from opacity 0 → 0.06 → 0 over ~120ms via `AnimatePresence`. Skip if `prefers-reduced-motion`.

## Header (z-50, relative)
- Padding: `clamp(16px, 4vh, 40px) clamp(16px, 3vw, 48px) 0`
- **Logo** (left): "NOCTURNE" in `"Unbounded"` weight 800, `#f5f1e8`, size `clamp(20px, min(2.7vh, 2vw), 28px)`, line-height 1. Below it, "SOCIÉTÉ SECRÈTE" in `"Space Mono"`, `#ff2f7e`, size `clamp(9px, min(1.3vh, 0.9vw), 11px)`, letter-spacing 0.28em. Logo block animates from `opacity:0, y:-20` with EXPO_OUT, duration 0.6.
- **Desktop Nav** (hidden on mobile, flex on md+): items "Fréquence", "Lieux", "Accès". Font `"Space Mono"`, uppercase, `#f5f1e8`, size `clamp(12px, min(1.5vh, 1.1vw), 14px)`, letter-spacing 0.12em, gap `clamp(20px, 3.8vw, 52px)`. Each fades in staggered from `y:-12`, delay `0.15 + i*0.08`. Hover: color `#ff2f7e`, `x: 2`.
- **Mobile Hamburger** (md:hidden): lucide `Menu`/`X`, `#f5f1e8`, size 28, toggles mobile overlay.

## Mobile Menu Overlay
Absolute `inset-0`, z-40, centered flex column, bg `#14101a`. Same nav items as buttons, `"Space Mono"` uppercase, 22px, `#f5f1e8`, staggered fade-in from `y:16`.

## Main Content (z-10, relative)
Grid: 1 col mobile, `grid-cols-[1.9fr_1fr]` on lg+. Padding `clamp(24px, 6vh, 90px) clamp(16px, 3vw, 48px) 0`, gap `clamp(24px, 4vh, 48px)`.

### Left Column — Giant Headline
Container `overflow: clip`. Font `"Unbounded"` weight 800, size `clamp(52px, min(11vh, 9vw), 168px)`, line-height 0.86, uppercase, letter-spacing -0.01em. Three lines, each slides in horizontally with EXPO_OUT, duration 0.85:
1. "LA NUIT" — solid `#f5f1e8` fill, `x: -900`, delay 0
2. "N'A PAS" — outline only: `color: transparent`, `-webkit-text-stroke: 1.5px #ff2f7e`, `x: 900`, delay 0.13
3. "DE RÈGLES" — solid `#f5f1e8` fill, `x: -900`, delay 0.26

### Right Column
Flex column, gap `clamp(18px, 2.6vh, 30px)`.

#### Tagline — word-by-word reveal
Font `"Inter"`, size `clamp(20px, min(3.4vh, 2.4vw), 40px)`, line-height 1, letter-spacing -0.02em, color `#8b8591`. Three lines, each word animates from `y:'100%', rotateX:45, opacity:0` to visible, 0.08s stagger per word, duration 0.6, EXPO_OUT:
1. "Coordonnées" — marginLeft 0, delay 0.5
2. "transmises à" — marginLeft 1.2em, delay 0.7
3. "la dernière minute" — marginLeft 0, delay 0.9

#### Signal Map (signature element)
Container: relative, rounded-2xl, `aspectRatio: '1 / 0.82'`, bg `#14101a`, border `1px solid rgba(245,241,232,0.08)`.

- **Grid overlay**: 1px lines `rgba(245,241,232,0.5)` opacity 0.4, `background-size: 12.5% 14%`
- **Radar sweep**: absolute inset-0, `conic-gradient(from 0deg, rgba(255,47,126,0.28), transparent 28%)`, rotates 360° continuously, duration 6s, linear, infinite
- **Route beams SVG**: viewBox `0 0 100 100`, preserveAspectRatio none. Two paths in `#6a5cff`, strokeWidth 0.6, strokeLinecap round:
  ```
  M20 70C40 40 60 85 88 25
  M12 22C45 10 55 55 90 60
  ```
  Each animates `pathLength: 0->1`, `opacity: 0->0.85`, duration 1.1, delay `0.6 + i*0.15`, EXPO_OUT
- **Nodes**: 3 points at fixed `{x,y}` percentages, each a white circle (`clamp(30px,4.5vw,42px)` diameter, `#f5f1e8` bg, `#0a090d` icon color) containing a lucide icon:
  - `{x:22, y:30}` — `Radio` icon, label "SON", coord "48.85N · 2.29E"
  - `{x:74, y:20}` — `Disc3` icon, label "SET", coord "48.86N · 2.35E"
  - `{x:55, y:68}` — `Users` icon, label "CREW", coord "48.83N · 2.31E"

  Each node spring-animates in (`stiffness:260, damping:16`, staggered delay `1.2 + i*0.15`). On hover: circle scales 1.15, `y:-3`; a tooltip below shows `label · coord` in `"Space Mono"`, 10px, `#ff2f7e`, on a `#0a090d` background with a `rgba(255,47,126,0.4)` border, hidden until hover (`opacity-0 group-hover:opacity-100`).
- **Caption**: absolute bottom-3, hidden on mobile (`hidden sm:block`). Text: "Survolez un point — le lieu ne se révèle qu'à l'accès confirmé." Font `"Space Mono"`, size `clamp(9px, min(1.3vh, 1vw), 11px)`, color `#8b8591`, fades in at delay 2.

## Footer (z-10, relative)
Flex row (column on mobile, items-end on sm+), justify-between, padding `clamp(12px, 3vh, 32px) clamp(16px, 3vw, 48px) clamp(16px, 5vh, 66px)`.

### Left — Stat Block
Animates from `opacity:0, y:24`, delay 0.45, duration 0.65, EXPO_OUT. Flex row, gap 4:
- White circle icon (`clamp(40px,5.5vh,58px)` diameter) containing lucide `Radio`, `#0a090d` icon color
- "150+" in `"Unbounded"` weight 800, size `clamp(38px, min(7vh, 5vw), 78px)`, color `#ff2f7e`, uppercase
- Description "soirées organisées / dans des lieux inédits" — `"Inter"`, size `clamp(13px, min(1.5vh, 1.1vw), 16px)`, `#f5f1e8`, line-height 1.3

### Right — CTA Button
Pill shape, `background: linear-gradient(90deg, #ff2f7e, #6a5cff)`, flex row, `pl-6 pr-2 py-2`, rounded-full.
- Label "Débloquer l'accès" — `"Space Mono"` uppercase, `#0a090d`, size `clamp(13px, min(1.5vh, 1.1vw), 15px)`
- Circle on the right (`clamp(36px,5vh,48px)` diameter, `#0a090d` bg) containing a white arrow SVG (`viewBox 0 0 16 16`, path `M3 13L13 3M13 3H5M13 3V11`, stroke `#f5f1e8`, strokeWidth 1.8) that rotates 45° and lifts `-translate-y-0.5` on hover, 0.3s transition
- Button animates from `opacity:0, x:60`, delay 0.5, EXPO_OUT. `whileHover: scale 1.05, y:-2`. `whileTap: scale 0.97`.

## Color Palette
- Background: `#0a090d` (warm near-black)
- Panel: `#14101a`
- Foreground: `#f5f1e8` (warm off-white)
- Foreground dim: `#8b8591`
- Magenta (hot gel): `#ff2f7e`
- Indigo (cold gel): `#6a5cff`

## Key Behaviors
1. No video dependency — the ambient backdrop + power-on `ready` state replace the video-gating pattern
2. Strobe flashes are ambient and infrequent (7s interval), never disorienting, and disabled under `prefers-reduced-motion`
3. Signal Map coordinates only appear on hover — the UI itself performs the brand's "you don't know until the last moment" premise
4. Fully responsive: single column on mobile, 2-column grid on lg+
5. Mobile hamburger menu with full-screen overlay on md breakpoint
