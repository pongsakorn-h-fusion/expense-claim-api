# AGENTS.md

Guidance for AI coding agents working in this repository.

- This is a TypeScript project. Always write TypeScript, never JavaScript.
- Do not use `any`.
- Tests use vitest (not Jest) and live in `tests/*.test.ts`.
- Validation problems throw `ValidationError` from `src/errors.ts`.
- Run `npm test` after every change.
- Use double quotes and semicolons.
