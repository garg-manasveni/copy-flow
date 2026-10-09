# Copyflow

Copyflow is a small React app for saving, searching, and organizing reusable code snippets.

## Development

```sh
npm install
npm run dev
```

## Deployment

- **Vercel:** use the Vite preset, `npm run build` as the build command, and `dist` as the output directory. Vite uses `/` as the asset base.
- **GitHub Pages:** in the repository's **Settings > Pages**, set the build and deployment source to **GitHub Actions**. The deploy workflow builds with the `/copy-flow/` base path and publishes `dist`.
