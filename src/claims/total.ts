import type { ClaimLine } from "./types";

/** Claim total in THB, computed in satang to avoid floating-point drift. */
export function calcTotal(lines: ClaimLine[]): number {
  const satang = lines.reduce((sum, line) => sum + Math.round(line.amount * 100) * line.quantity, 0);
  return satang / 100;
}
