import { NotFoundError } from "../errors";
import { calcTotal } from "./total";
import type { Category, Claim, ClaimLine, ClaimStatus, HistoryEntry, NewClaimInput } from "./types";

const claims = new Map<string, Claim>();
let nextId = 1;

function seedClaim(
  employeeId: string,
  date: string,
  category: Category,
  description: string,
  lines: ClaimLine[],
  status: ClaimStatus,
  receiptUrl?: string,
): void {
  const id = `CLM-${String(nextId++).padStart(4, "0")}`;
  const history: HistoryEntry[] = [{ at: `${date}T09:00:00.000Z`, status: "submitted" }];
  if (status !== "submitted") {
    history.push({ at: `${date}T15:00:00.000Z`, status });
  }
  claims.set(id, { id, employeeId, date, category, description, lines, total: calcTotal(lines), receiptUrl, status, history });
}

export function resetStore(): void {
  claims.clear();
  nextId = 1;
  seedClaim("EMP-001", "2026-11-03", "travel", "Taxi, airport to office", [{ description: "Taxi", amount: 450, quantity: 1 }],
    "approved", "https://receipts.example.test/r/1001");
  seedClaim("EMP-002", "2026-11-05", "hotel", "Chiang Mai workshop", [
    { description: "Hotel 1 night", amount: 890.3, quantity: 1 },
    { description: "Dinner", amount: 134.1, quantity: 1 },
    { description: "Taxi", amount: 226.1, quantity: 1 },
  ], "submitted", "https://receipts.example.test/r/1002");
  seedClaim("EMP-001", "2026-11-10", "meal", "Team lunch", [{ description: "Lunch", amount: 320, quantity: 1 }], "submitted");
}

export function listClaims(): Claim[] {
  return [...claims.values()];
}

export function getClaim(id: string): Claim {
  const claim = claims.get(id);
  if (!claim) {
    throw new NotFoundError(`Claim ${id}`);
  }
  return claim;
}

export function createClaim(input: NewClaimInput): Claim {
  const id = `CLM-${String(nextId++).padStart(4, "0")}`;
  const claim: Claim = {
    id,
    employeeId: input.employeeId,
    date: input.date,
    category: input.category as Category,
    description: input.description,
    lines: input.lines,
    total: calcTotal(input.lines),
    receiptUrl: input.receiptUrl,
    status: "submitted",
    history: [{ at: new Date().toISOString(), status: "submitted" }],
  };
  claims.set(id, claim);
  return claim;
}

export function cancelClaim(id: string, note?: string): Claim {
  const claim = getClaim(id);
  claim.status = "cancelled";
  claim.history.push({ at: new Date().toISOString(), status: "cancelled", note });
  return claim;
}

resetStore();
