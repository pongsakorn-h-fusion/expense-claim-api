import { describe, expect, it } from "vitest";
import { ValidationError } from "../src/errors";
import type { NewClaimInput } from "../src/claims/types";
import { validateClaim } from "../src/claims/validate";

const valid: NewClaimInput = {
  employeeId: "EMP-001",
  date: "2026-11-12",
  category: "travel",
  description: "BTS to customer site",
  lines: [{ description: "BTS", amount: 62, quantity: 2 }],
};

function fieldsOf(input: NewClaimInput): string[] {
  try {
    validateClaim(input);
    return [];
  } catch (err) {
    if (err instanceof ValidationError) return err.details.map((d) => d.field);
    throw err;
  }
}

describe("validateClaim", () => {
  it("accepts a valid claim", () => {
    expect(fieldsOf(valid)).toEqual([]);
  });

  it("requires employeeId", () => {
    expect(fieldsOf({ ...valid, employeeId: "" })).toEqual(["employeeId"]);
  });

  it("rejects an unknown category", () => {
    expect(fieldsOf({ ...valid, category: "shopping" })).toEqual(["category"]);
  });

  it("rejects a line with amount 0", () => {
    expect(fieldsOf({ ...valid, lines: [{ description: "Free", amount: 0, quantity: 1 }] })).toEqual(["lines[0].amount"]);
  });
});
