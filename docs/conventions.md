# Conventions

## Architecture Style

This project uses a lightweight feature-based architecture, also known as vertical slice architecture or domain-oriented frontend architecture.

The goal is locality: a product change should usually affect one feature folder, not separate global `screens`, `components`, `hooks`, `api`, and `types` folders.

## Feature Folders

Use `src/features` for product behavior. A feature is a user-facing capability or product area, not a file type.

Good examples:

```text
src/features/auth
src/features/onboarding
src/features/profile
src/features/projects
src/features/settings
```

Prefer this:

```text
src/features/projects/
  screens/
  components/
  hooks/
  api/
  types.ts
```

Over this:

```text
src/screens
src/components
src/hooks
src/api
src/types
```

Keep code inside a feature when it only exists for that feature. Promote code to `src/shared` only after multiple unrelated features use it.

## Folder Roles

- `src/app`: app root, providers, navigation shell, app-wide setup.
- `src/config`: environment-backed runtime config.
- `src/features`: product capabilities grouped by domain.
- `src/shared`: reusable UI, theme, utilities, and cross-feature code.

## Placement Rule

1. Product-specific code goes in `src/features/<feature>`.
2. App-wide setup goes in `src/app`.
3. Runtime configuration goes in `src/config`.
4. Reused cross-feature code goes in `src/shared`.

Start local to the feature. Move code outward only when reuse is real.
