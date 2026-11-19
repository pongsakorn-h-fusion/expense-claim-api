import { describe, expect, it } from "vitest";
import { calcTotal } from "../src/claims/total";

describe("calcTotal", () => {
  it("sums amount × quantity", () => {
    expect(calcTotal([
      { description: "Lunch", amount: 100, quantity: 2 },
      { description: "Coffee", amount: 50, quantity: 1 },
    ])).toBe(250);
  });

  it("returns the Chiang Mai claim total in baht", () => {
    expect(calcTotal([
      { description: "Hotel 1 night", amount: 890.3, quantity: 1 },
      { description: "Dinner", amount: 134.1, quantity: 1 },
      { description: "Taxi", amount: 226.1, quantity: 1 },
    ])).toBe(1250.5);
  });
});
