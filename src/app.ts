import express, { type NextFunction, type Request, type Response } from "express";
import { claimsRouter } from "./claims/routes";
import { NotFoundError, ValidationError } from "./errors";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/claims", claimsRouter);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ValidationError) {
      res.status(400).json({ error: "ValidationError", details: err.details });
      return;
    }
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: "NotFound", message: err.message });
      return;
    }
    console.error(err);
    res.status(500).json({ error: "InternalError" });
  });

  return app;
}
