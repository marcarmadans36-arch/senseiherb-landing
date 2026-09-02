# SenseiHerb — Landing Page

Landing de marketing estática en Astro + React + Tailwind.  
Vive en `https://senseiherb.com`. La app está en `https://app.senseiherb.com`.

## Arrancar en local

```bash
cd senseiherb-landing
npm install
npm run dev
# → http://localhost:4321
```

## Desplegar en Vercel

```bash
npm run build      # genera dist/
npx vercel --prod  # deploy directo
```

En Vercel Dashboard → Project → Settings → Domains: añade `senseiherb.com`.

## Dónde tocar cada cosa

| Qué cambiar | Dónde |
|-------------|-------|
| Paleta de color / tokens | `tailwind.config.mjs` → `theme.extend.colors.dojo` |
| Tipografía | `tailwind.config.mjs` → `fontFamily` + URL en `src/layouts/Layout.astro` |
| Copy del Hero | `src/components/Hero.astro` |
| Etapas del Camino | `src/components/Camino.astro` → array `STAGES` |
| Funciones / Features | `src/components/Funciones.astro` → array `FEATURES` |
| Planes y precios | `src/components/Precios.tsx` → array `PLANS` |
| CTA final | `src/components/CtaFinal.astro` |
| Footer / links legales | `src/components/Footer.astro` |
| SEO / meta tags | `src/layouts/Layout.astro` |
| Assets (imágenes, vídeo) | `public/assets/` |

## Assets

Todos en `public/assets/`. Reemplaza con las versiones definitivas sin tocar el código:

- `hero-bg.png` + `hero-loop.mp4` → fondo del hero
- `enso.png` → ensō dorado (aparece en hero, separadores, CTA y footer)
- `camino-*.png` → 4 imágenes de la sección El Camino
- `icono-*.png` → iconos de las 3 funciones
- `mockup-app.png` → captura de la app en móvil
- `og-image.png` → imagen Open Graph (1200×630 px recomendado)

## Compliance

El copy incluye disclaimers +18 y "contenido informativo, no fomenta el consumo" en hero, funciones, CTA y footer. No elimines estos avisos.
