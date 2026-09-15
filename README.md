# Planet Harvest

Next.js website with locally hosted Biblon serif headings and Helvetica Neue body text, farm photography, full-screen video heroes, and animated harvest marquees.

## Development

Requires Node.js 20.9 or later and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Pages

- `/` — home (also available at `/ph`)
- `/story` — company and founders
- `/sourcing` — sustainable whole harvest sourcing
- `/products` — product integration and ingredients
- `/food-boxes` — community programs and delivery process
- `/impact` — farm to community impact and partners
- `/media` — coverage linked from the supplied copy deck
- `/contact` — audience-specific partnership inquiries

The shared header has a left-side modal navigation drawer with keyboard focus containment, Escape dismissal, and an active-page indicator. All pages share the footer. Editorial layouts are in `components/EditorialPage.jsx` and `components/editorial.module.css`.

## Contact configuration

Set `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local` to the approved public partnership email address, then restart/rebuild. The form opens a populated email draft for visitors to review and send; it does not send mail from the server.

Without this setting, the form explicitly offers a downloadable inquiry draft and states that nothing has been sent. No email address is assumed. For direct online submission, connect a server-side mail or CRM service before changing the submission messaging.

## Content

Content is based on the supplied Planet Harvest copy deck. Existing local photography is reused. Unprovided impact figures, testimonials, founder videos, product assets, and social feed integrations are not fabricated. The impact page describes reporting categories without publishing unprovided metrics.

## Production

```sh
npm run build
npm start
```

## Full-screen video heroes and marquee

All main pages use `components/VideoHero.jsx` with oversized Biblon titles, a full-viewport local video background, an image fallback, and a playback control. Videos pause when offscreen or the tab is hidden, and do not autoplay with reduced motion enabled. The shared yellow `HarvestMarquee` repeats brand messages in a seamless CSS loop, with a pause control and a static reduced-motion layout.

Footage provenance and licenses are documented in `public/videos/SOURCES.md`. Page-specific footage is selected with the hero's `film` property (`fields` or `food`).
