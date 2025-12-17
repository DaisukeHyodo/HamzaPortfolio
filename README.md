# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Ajouter des images de projets

Placez vos images de projets dans `src/assets/projects/` (créez le dossier si nécessaire). Exemple recommandé :

- `src/assets/projects/mon-projet-1.jpg`
- `src/assets/projects/mon-projet-2.png`

Puis importez-les et ajoutez-les au tableau `projects` dans `src/App.jsx`. Exemple :

```jsx
import img1 from "./assets/projects/mon-projet-1.jpg";
import img2 from "./assets/projects/mon-projet-2.png";

const projects = [
  { name: "Mon projet 1", image: img1 },
  { name: "Mon projet 2", image: img2 },
];
```

Notes et recommandations :

- Utilisez des images optimisées (webp/jpg/png) et gardez une taille raisonnable (ex. 1200×800 ou moins) pour éviter d'alourdir le bundle.
- Si vous préférez servir des images statiques sans les importer (non empaquetées), placez-les dans le dossier `public/` et référez-les par `/nom.jpg`.
- Le composant utilise `className="w-full h-40 object-cover"` pour le recadrage ; ajustez la classe si vous voulez une autre taille.
