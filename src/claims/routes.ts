import { Router } from "express";
import { toCsv } from "./export";
import { cancelClaim, createClaim, getClaim, listClaims } from "./store";
import { validateClaim } from "./validate";

export const claimsRouter = Router();

claimsRouter.get("/", (_req, res) => {
  res.json(listClaims());
});

claimsRouter.get("/export.csv", (_req, res) => {
  res.type("text/csv").send(toCsv(listClaims()));
});

claimsRouter.get("/:id", (req, res) => {
  res.json(getClaim(req.params.id));
});

claimsRouter.post("/", (req, res) => {
  validateClaim(req.body);
  res.status(201).json(createClaim(req.body));
});

claimsRouter.post("/:id/cancel", (req, res) => {
  res.json(cancelClaim(req.params.id, req.body?.note));
});
