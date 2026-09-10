# planet-harvest

Standalone Planet Harvest website, extracted from the Sazan `/ph` page.

## Development

Requires Node.js 20.9 or later and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The complete experience is available at `/` and `/ph`.

## Production

```sh
npm run build
npm start
```

Includes Lenis smooth scrolling, locally hosted Biblon/Garamond/Helvetica fonts, 120 transparent strawberry frames, the shrinking strawberry transition, overlapping sourcing sections, and pillar cards with different scroll speeds. Missing photography remains represented by green placeholders.

Page components and scoped styles are in `app/ph/`. Shared motion is in `components/`. Assets and source videos are in `public/ph/`; other local fonts are in `public/fonts/`.

This project has no password gate or required environment variables.
