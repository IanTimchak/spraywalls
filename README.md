# SprayWalls

SprayWalls is an Expo React Native app for turning a real climbing wall into a shareable digital route board.

The product goal is to let climbers photograph their home wall or spray wall, outline the holds on the original image, convert that image into an interactive board layout, create routes on top of it, and publish those routes for other climbers to try.

## Current Status

This repo is still early product groundwork. It currently includes:

- Expo React Native app shell
- TypeScript, ESLint, Prettier, Jest, and CI validation
- Supabase client setup for auth/session persistence
- Email sign-in/sign-up flow
- Feature-based source layout
- Storybook setup for component development
- Generated app icon, adaptive Android icon, splash, and favicon assets

The wall capture, hold outlining, route editing, and publishing workflows are the core product areas still to build.

## Stack

- Expo SDK 54
- React Native 0.81
- React 19
- TypeScript
- Supabase
- React Native Elements UI
- Jest and React Native Testing Library
- Storybook with Vite

## Requirements

- Node.js
- npm
- Expo-compatible mobile device, emulator, or browser
- Supabase project for auth-backed development

## Environment

Create a local `.env` from `.env.example`:

```sh
cp .env.example .env
```

Required public Expo variables:

```sh
EXPO_PUBLIC_APP_NAME="SprayWalls"
EXPO_PUBLIC_APP_ENV="development"
EXPO_PUBLIC_SUPABASE_URL=""
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=""
```

Expo only exposes client-side environment variables that use the `EXPO_PUBLIC_` prefix. Do not put service-role keys or other private credentials in `.env` values consumed by the app.

## Getting Started

Install dependencies:

```sh
npm install
```

Start Expo:

```sh
npm start
```

Platform-specific commands:

```sh
npm run android
npm run ios
npm run web
```

If Expo Go or Metro appears to be serving stale app assets, clear the cache:

```sh
npx expo start -c
```

On this Windows setup, PowerShell may block `npx`; use the local Expo command instead:

```powershell
.\node_modules\.bin\expo.cmd start -c
```

## Quality Commands

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run validate
```

`npm run validate` runs formatting, linting, type checking, and tests.

## Storybook

Run Storybook for component development:

```sh
npm run storybook
```

Build the static Storybook output:

```sh
npm run storybook:build
```

## Project Structure

```text
src/
  app/       app root, startup flow, providers, app-wide setup
  config/    runtime config and environment-backed constants
  features/  product features grouped by domain
  shared/    reusable UI, theme values, utilities, cross-feature code

docs/
  architecture.md  architecture notes and next decisions
  conventions.md   feature-folder conventions

assets/
  app icons, splash assets, favicon, generated icon sets
```

The project uses a lightweight feature-based architecture. Start product code inside `src/features/<feature>` and only promote code to `src/shared` after reuse is real.

## App Assets

Expo-facing assets are configured in `app.json`.

Important files:

- `assets/icon-spraywalls-v2.png`
- `assets/splash-icon-spraywalls-v2.png`
- `assets/favicon-spraywalls-v2.png`
- `assets/android-icon-background-spraywalls-v2.png`
- `assets/android-icon-foreground-spraywalls-v2.png`
- `assets/android-icon-monochrome-spraywalls-v2.png`

The master source image currently lives at:

```text
assets/spraywalls-app-icon-v2.png
```

Regenerate derived app assets from the master when the logo changes, then restart Expo with cache clearing so Expo Go fetches the new asset names/config.

## Product Roadmap

Near-term product areas:

1. Wall photo capture/import
2. Hold outlining and editing on top of the original image
3. Conversion from image annotations to an interactive board layout
4. Route creation with start, finish, foot-only, and hand/foot hold states
5. Route publishing and browsing
6. User profiles and saved walls/routes

## Documentation

See:

- `docs/requirements.md`
- `docs/architecture.md`
- `docs/conventions.md`
