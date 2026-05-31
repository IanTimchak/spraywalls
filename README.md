# React Native Template

A compact Expo React Native starter for building toward a production app without committing to a heavy architecture too early.

## Stack

- Expo SDK 56
- React Native 0.85
- React 19
- TypeScript
- ESLint, Prettier, Jest, React Native Testing Library
- GitHub Actions validation workflow

## Getting Started

```sh
npm install
npm start
```

Use `npm run android`, `npm run ios`, or `npm run web` for platform-specific development.

## Quality Commands

```sh
npm run lint
npm run format:check
npm run typecheck
npm test
npm run validate
```

## Project Structure

```text
src/
  app/       app root, providers, navigation shell
  config/    environment-backed runtime config
  features/  product features grouped by domain
  shared/    reusable UI, theme, utilities, cross-feature code
```

See `docs/architecture.md` for the starting architecture notes and the next decisions to make as the app grows.
