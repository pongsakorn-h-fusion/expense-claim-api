import { describe, expect, it } from "vitest";
import { calcTotal } from "../src/claims/total";

describe("calcTotal", () => {
  it("sums amount × quantity", () => {
    expect(calcTotal([
      { description: "Lunch", amount: 100, quantity: 2 },
      { description: "Coffee", amount: 50, quantity: 1 },
    ])).toBe(250);
  });
});
