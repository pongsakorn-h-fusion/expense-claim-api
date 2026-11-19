import type { ClaimLine } from "./types";

/** Claim total in THB. */
export function calcTotal(lines: ClaimLine[]): number {
  return lines.reduce((sum, line) => sum + line.amount * line.quantity, 0);
}
