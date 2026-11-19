export type ClaimStatus = "submitted" | "approved" | "cancelled";

export const CATEGORIES = ["travel", "meal", "hotel", "other"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface ClaimLine {
  description: string;
  /** Unit price in THB. */
  amount: number;
  quantity: number;
}

export interface HistoryEntry {
  at: string;
  status: ClaimStatus;
  note?: string;
}

export interface Claim {
  id: string;
  employeeId: string;
  /** Expense date, YYYY-MM-DD. */
  date: string;
  category: Category;
  description: string;
  lines: ClaimLine[];
  /** Claim total in THB. */
  total: number;
  receiptUrl?: string;
  status: ClaimStatus;
  history: HistoryEntry[];
}

export interface NewClaimInput {
  employeeId: string;
  date: string;
  category: string;
  description: string;
  lines: ClaimLine[];
  receiptUrl?: string;
}
