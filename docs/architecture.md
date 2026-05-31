# Architecture Notes

This starter is intentionally small. It gives you clean boundaries before the product architecture is fully known.

## Current Layout

- `src/app`: application root, providers, navigation shell, and app-wide setup.
- `src/config`: environment-backed configuration and runtime constants.
- `src/features`: product features grouped by domain.
- `src/shared`: reusable UI primitives, theme values, utilities, and cross-feature code.
- `__tests__`: integration-style tests that exercise user-visible behavior.

## Suggested Next Decisions

1. Navigation: add `@react-navigation/native` when the app has at least two real screens.
2. Server state: add TanStack Query or another data layer when remote API behavior is known.
3. Local state: start with React state/context; add Zustand, Redux Toolkit, or another store only when state becomes shared and complex.
4. Design system: promote repeated styles from feature screens into `src/shared/theme` and `src/shared/ui`.
5. Environments: keep public Expo variables under the `EXPO_PUBLIC_` prefix and document required values in `.env.example`.
