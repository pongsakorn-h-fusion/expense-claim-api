import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app";
import { resetStore } from "../src/claims/store";

const app = createApp();

beforeEach(() => {
  resetStore();
});

describe("claims API", () => {
  it("lists the seeded claims", async () => {
    const res = await request(app).get("/claims");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  it("creates a claim", async () => {
    const res = await request(app).post("/claims").send({
      employeeId: "EMP-003",
      date: "2026-11-12",
      category: "meal",
      description: "Client lunch",
      lines: [{ description: "Lunch", amount: 480, quantity: 1 }],
    });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: "CLM-0004", status: "submitted", total: 480 });
  });

  it("returns 400 for an invalid claim", async () => {
    const res = await request(app).post("/claims").send({ employeeId: "EMP-003" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("ValidationError");
  });

  it("cancels a claim and records it in history", async () => {
    const res = await request(app).post("/claims/CLM-0003/cancel").send({ note: "duplicate" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("cancelled");
    expect(res.body.history.at(-1)).toMatchObject({ status: "cancelled", note: "duplicate" });
  });

  it("returns 404 for an unknown claim", async () => {
    const res = await request(app).get("/claims/CLM-9999");
    expect(res.status).toBe(404);
  });
});
