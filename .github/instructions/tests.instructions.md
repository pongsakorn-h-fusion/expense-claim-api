---
applyTo: "tests/**/*.ts"
---
- vitest + supertest; files in `tests/*.test.ts`.
- API tests call `resetStore()` in `beforeEach`.
- Test names read as sentences: "rejects ... when ...".
