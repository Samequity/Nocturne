# NOCTURNE — Hero Section

Société secrète d'événements underground. Même squelette technique que CARGOX
(React + TS + Vite + Tailwind + `motion/react` + `lucide-react`), habillé pour
un tout autre univers.

## Installation

```bash
npm install motion lucide-react
```

Assure-toi que Tailwind est déjà configuré dans le projet (`tailwind.config.js`
+ `index.css` avec les directives `@tailwind`).

## Utilisation

```tsx
import NocturneHero from "./components/NocturneHero";

export default function App() {
  return <NocturneHero />;
}
```

## Choix de design

- **Fond** : pas de vidéo — un plateau ambiant (gradients radiaux magenta/indigo
  + grille fine) avec une séquence d'allumage ("power-on") au montage, et un
  strobe ambiant discret toutes les ~7s. Respecte `prefers-reduced-motion`.
- **Typo** : `Unbounded` 800 pour le display (énergie flyer/rave), `Space Mono`
  pour la nav et les coordonnées (registre "données confidentielles"),
  `Inter` pour le corps.
- **Couleurs** : `#0a090d` (noir chaud) / `#f5f1e8` (blanc chaud) / `#ff2f7e`
  (gel magenta) / `#6a5cff` (gel indigo) — le duo magenta/indigo reproduit un
  vrai combo de gélatines de scène, plutôt que le cliché "noir + vert acide".
- **Élément signature** : la *Signal Map* — une grille radar avec un balayage
  rotatif et trois points dont les coordonnées réelles ne se révèlent qu'au
  survol, en écho direct au concept : sur NOCTURNE, le lieu est la dernière
  chose qu'on te donne.

## Prochaines étapes possibles

- Brancher les 3 points de la Signal Map sur de vraies données d'événements
- Ajouter une vraie vidéo d'ambiance en fond (foule/fumée) si tu en as une
- Décliner la palette magenta/indigo en variante par ville/saison
