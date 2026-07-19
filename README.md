# pantheon-training
A gamified way to get stronger at the gym - pick your god and train like they would

It's a static site (no framework) — clone, `pnpm install && pnpm dev`, and
it's running locally with hot reload. All progress (XP, level, streak) is
saved in `localStorage`.

## Pages

- `index.html` — the temple: choose a god, browse the exercise archive
- `workout.html?god=<id>` — that god's themed workout page (`zeus`, `ares`,
  `artemis`, `aphrodite`, `poseidon`, `athena`, `nyx`)
