import js from '@eslint/js';
import globals from 'globals';

// These plain <script> files are loaded in order (not ES modules), so they
// share one global scope instead of import/export. Each block below tells
// ESLint which of that shared scope's names a file *consumes* — never the
// names it defines itself, or no-redeclare treats its own declarations as
// colliding with the global.
export default [
  { ignores: ['dist/**'] },
  js.configs.recommended,
  {
    files: ['public/js/data.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...globals.browser },
    },
  },
  {
    files: ['public/js/state.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...globals.browser, GODS: 'readonly', godLevel: 'readonly' },
    },
  },
  {
    files: ['public/js/header.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...globals.browser, overallLevel: 'readonly', tierForLevel: 'readonly' },
    },
  },
  {
    files: ['public/js/main.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        GODS: 'readonly', EXERCISES: 'readonly', WORKOUTS: 'readonly',
        loadState: 'readonly', getXp: 'readonly', godLevel: 'readonly',
        godProgressPct: 'readonly', renderHeaderBadges: 'readonly',
      },
    },
  },
  {
    files: ['public/js/workout.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        GODS: 'readonly', EXERCISES: 'readonly', WORKOUTS: 'readonly',
        loadState: 'readonly', getXp: 'readonly', godLevel: 'readonly',
        tierForLevel: 'readonly', awardXp: 'readonly', renderHeaderBadges: 'readonly',
      },
    },
  },
  {
    files: ['public/js/**/*.js'],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['vite.config.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
];
