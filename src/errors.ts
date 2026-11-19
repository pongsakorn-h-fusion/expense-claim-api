export interface FieldError {
  field: string;
  message: string;
}

export class ValidationError extends Error {
  constructor(public readonly details: FieldError[]) {
    super(details.map((d) => `${d.field}: ${d.message}`).join("; "));
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(what: string) {
    super(`${what} not found`);
    this.name = "NotFoundError";
  }
}
