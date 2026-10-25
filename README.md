# OGverse

OGverse is the parent experience connecting two opportunity products:

- [NaijaOpportunities](https://www.naijaopportunities.live/) for discovering jobs, scholarships and other programmes.
- [PathSync AI](https://pathsync-ai.vercel.app/) for understanding opportunity requirements and preparing sensible next steps.

The current release is an immersive editorial homepage. It introduces the OGverse ecosystem through a scroll-driven 3D journey, then gives visitors direct routes to both existing products. It does not create fictional opportunities or claim that planned account, matching or application-tracking features are already available.

## Live site

[ogverse-nine.vercel.app](https://ogverse-nine.vercel.app/)

## Built with

- React
- Vite
- Three.js
- React Three Fiber
- Drei
- GSAP and ScrollTrigger
- CSS

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Experience and accessibility

- Scroll-driven camera and globe transitions
- Pointer interaction on supported devices
- Responsive layouts for phones, tablets and desktop screens
- Reduced-motion handling
- A non-WebGL fallback
- Keyboard-accessible navigation and skip links
- Direct access to both products without requiring the 3D experience

The 3D scene is lazy-loaded so the navigation and essential content remain available while the heavier visual layer loads.

## Brand

OGverse was founded by Goodness. David Gilbert works on frontend and product development. The current interface uses OGverse's supplied logo and approved cream, navy and orange palette.

## Current scope

This repository contains the OGverse gateway website. NaijaOpportunities and PathSync AI remain separate products and deployments. Their production implementations are not modified by this project.

Potential future directions include saved opportunities, eligibility assessments, reminders and application tracking. These are not presented as current features.
