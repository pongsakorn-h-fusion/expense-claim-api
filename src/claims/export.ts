import type { Claim } from "./types";

export function toCsv(claims: Claim[]): string {
  return claims
    .map((c) => [c.id, c.employeeId, c.date, c.category, c.description, c.total, c.status].join(","))
    .join("\n");
}
