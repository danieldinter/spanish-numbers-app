<!-- Copilot / AI contributor instructions for spanish-numbers-app -->

# Overview

This is a small Vue 3 + Vite single-page app for practicing writing numbers in Spanish. The app generates a random number (0–1000) and asks the user to type the Spanish words. Core files you should read before making changes:

- `src/App.vue` — main UI and app logic (random number generation, input binding, answer checking, and component wiring).
- `src/numberToSpanish.js` — pure helper that converts numbers to Spanish words. Small and central to game correctness.
- `src/components/AlertError.vue`, `src/components/AlertSuccess.vue` — tiny presentational components used for feedback.
- `src/main.js` — app bootstrap.
- `package.json` — dev/build scripts (Vite)

# Big picture & architecture

- Single-page client app using Vue 3 (script setup SFCs) and Vite. No backend.
- App state is local to `App.vue` using Composition API refs (`currentNumber`, `userInput`, `feedback*`). There are no global stores.
- All important app logic lives in `App.vue` and `numberToSpanish.js`. Changes to conversion logic belong in `numberToSpanish.js`; UI/flow changes belong in `App.vue` and the small components.

# Developer workflows (commands)

- Start dev server with hot-reload:

  npm run dev

- Build for production:

  npm run build

- Preview a production build locally:

  npm run preview

These scripts are defined in `package.json` and use Vite.

# Project-specific conventions

- Script setup SFCs: components use `<script setup>` and `defineProps` — prefer that style when adding components.
- Minimal CSS: global styles in `src/style.css`. Components rely on Tailwind utility classes (Tailwind is present in package.json but not heavily configured here). Keep styling small and utility-driven.
- Number conversion is recursive: `numberToSpanish(n)` handles units, teens, tens, and hundreds. For correctness changes, update this file and add unit tests (see suggestions below).
- Feedback uses boolean `feedback` (true = success, false = error, undefined/null = none). Respect this pattern when wiring new feedback.

# Integration points & external deps

- Vue 3 and Vite are the only runtime deps. Dev tooling includes Tailwind and PostCSS (see `devDependencies`). No external APIs or servers.

# Examples of common edits

- To change phrasing of correct/incorrect messages, edit `App.vue` where `feedbackTitle` and `feedbackMessage` are set inside `checkAnswer()`.
- To change number range, edit `generateRandomNumber()` inside `App.vue`.
- To change conversion rules (e.g., alternate formatting like "treinta y cuatro" vs "treinta y cuatro"), edit `src/numberToSpanish.js`. Keep the function pure and exportable.

# Testing and validation

- There are no tests currently. When changing `numberToSpanish.js`, add a small test harness (e.g., a Jest or node script) that imports the function and asserts known mappings (0, 1, 10, 11, 21, 100, 101, 115, 999). If you add test tooling, update README with commands.
- Quick manual validation: run `npm run dev` and verify interactive input in the browser (http://localhost:5173 by default).

# Safety and style guidance for AI edits

- Keep changes small and localized: prefer editing `numberToSpanish.js` for logic, `App.vue` for UI/flow, and component files for presentation.
- Preserve existing `script setup` and Composition API patterns.
- Don't introduce network calls, new dependencies, or build tools without an explicit request.
- When modifying text visible to users, keep translations consistent (UI is Spanish prompts, feedback titles are currently German — be cautious if changing language mix).

# Files to reference when making changes

- `src/App.vue` — primary app flow, input handling, and feedback.
- `src/numberToSpanish.js` — numeric conversion logic (single source of truth for words).
- `src/components/AlertError.vue` and `AlertSuccess.vue` — small presentational components, accept `title` and `message` props.
- `package.json` — script commands.

# If you make changes

- Run `npm run dev` and manually verify behavior.
- If you modify conversion logic, include a minimal test file or at least document mappings you validated in the commit message.

---

If any of the above is unclear or you want a different scope (add tests, expand range beyond 1000, or change UI language), tell me and I will update this file with specifics and examples.
