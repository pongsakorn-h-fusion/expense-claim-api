import { ValidationError, type FieldError } from "../errors";
import { CATEGORIES, type NewClaimInput } from "./types";

export function validateClaim(input: NewClaimInput): void {
  const errors: FieldError[] = [];

  if (!input.employeeId) {
    errors.push({ field: "employeeId", message: "is required" });
  }
  if (!input.date || Number.isNaN(Date.parse(input.date))) {
    errors.push({ field: "date", message: "must be a valid date (YYYY-MM-DD)" });
  }
  if (!(CATEGORIES as readonly string[]).includes(input.category)) {
    errors.push({ field: "category", message: `must be one of ${CATEGORIES.join(", ")}` });
  }
  if (!Array.isArray(input.lines) || input.lines.length === 0) {
    errors.push({ field: "lines", message: "must have at least one line" });
  } else {
    input.lines.forEach((line, i) => {
      if (!(line.amount > 0)) {
        errors.push({ field: `lines[${i}].amount`, message: "must be greater than 0" });
      }
      if (!Number.isInteger(line.quantity) || line.quantity < 1) {
        errors.push({ field: `lines[${i}].quantity`, message: "must be a whole number of at least 1" });
      }
    });
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
}
