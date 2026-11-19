# Copilot Instructions for expense-claim-api

Hello Copilot! Thank you for helping our team. Please read all of these instructions carefully before you answer any question or write any code, and please always follow them in every single response.

## About this project

This project is an expense claim API. It is written in TypeScript. It uses Express for the HTTP server. It uses vitest for tests. Employees create expense claims and the API stores them. The API can also export claims to CSV. The project is written in TypeScript, so please always write TypeScript and never JavaScript.

## General rules

- Always write TypeScript, never JavaScript.
- Always use strict TypeScript types. Please do not use `any` anywhere in the code.
- Please make sure the code is clean, readable and easy to maintain.
- Please always follow best practices.
- Please write good variable names that are clear and descriptive.
- Please add comments to explain your code when it is helpful.
- When you answer a question, please start by restating the question, then explain your reasoning step by step, then give the answer, and then summarize what you did at the end.
- Please always offer to help with anything else at the end of your answer.

## Errors

- Validation problems must throw `ValidationError` from `src/errors.ts`.
- Please do not invent a new error class for validation problems. Use `ValidationError` from `src/errors.ts`.
- Missing records must throw `NotFoundError` from `src/errors.ts`.

## Testing rules

- We use vitest for all tests. Do not use Jest.
- Test files live in the `tests/` folder and end with `.test.ts`.
- Use `describe` and `it` blocks. Test names should read like a sentence.
- API tests use supertest and must call `resetStore()` in `beforeEach` so tests do not affect each other.
- Please write tests for every change you make.
- Please always run the tests after you change code.
- Remember: we use vitest, not Jest.

## Money

- Amounts are in Thai baht (THB).
- Please be careful with money and decimals.

## Style

- Use double quotes for strings.
- Use semicolons.
- Use 2 spaces for indentation.
- Please keep functions small.
- Please always write TypeScript, never JavaScript.
- Please do not use `any`.
