# expense-claim-api

- Lead with the answer. No greetings or closing summaries. For code changes, say what changed and the test result.
- TypeScript strict; no `any`.
- Validation errors: throw `ValidationError` from `src/errors.ts`; missing records: `NotFoundError`.
- Money: compute in satang (integer), return THB with 2 decimals.
- Keep changes inside the files the task names; ask before touching others.
