# expense-claim-api

Lab repo สำหรับ workshop **AI-Assisted Development ให้ได้ผลจริง** — API ใบเบิกค่าใช้จ่ายขนาดเล็ก (TypeScript + Express + vitest)

> ข้อมูล, URL และ key ทั้งหมดใน repo นี้เป็นของปลอม · ห้ามใส่ข้อมูลลูกค้า, ข้อมูลส่วนบุคคล หรือ credential จริงลงใน repo หรือ prompt

## เริ่มต้น

ต้องมี Node.js 20 ขึ้นไป

```bash
npm install
npm test          # ต้องผ่านทั้งหมดบน main และ lab-0
npm start         # http://localhost:3000/claims
```

ถ้า npm เตือนเรื่อง install script ของ `esbuild` ข้ามได้ — ไม่กระทบการรัน

## Branch ต่อ lab

แต่ละ lab เริ่มจาก branch ของตัวเอง และมีไฟล์ `LAB.md` บอกโจทย์ เวลา และ checklist — **`LAB.md` อยู่ใน branch `lab-N` เท่านั้น ไม่อยู่บน `main`**

ทุก branch แตกจาก `main` **แยกกัน ไม่ต่อกัน** — งานที่ทำใน lab ก่อนจะไม่ตามมา (ตั้งใจให้ทุกคนเริ่มจุดเดียวกัน จึงเทียบ scoreboard ได้) ไม่ต้อง commit หรือ merge ข้าม lab

| Branch | Lab | หมายเหตุ |
|---|---|---|
| `lab-0` | Baseline — โจทย์ A | ทำแบบที่ทำปกติ |
| `lab-1` | Specific Request | |
| `lab-2` | Context Engineering | มี test fail 1 ตัวโดยตั้งใจ |
| `lab-3` | Token audit | มี test fail 1 ตัว + instructions file ที่ยาวเกินจำเป็นโดยตั้งใจ |
| `lab-4` | Verify First | |
| `lab-5` | Safe Agent & Secret Hygiene | |
| `lab-6` | Evidence & Output (repro steps · output format · language) | |
| `lab-7` | Right-size the agent (effort · model · subagent · vision · tool output) | |
| `lab-8` | Post-test — โจทย์ A เดิม | จุดเริ่มต้นเดียวกับ `lab-0` เพื่อเทียบก่อน/หลัง |

เปลี่ยน lab:

```bash
git fetch origin      # ครั้งแรก หรือเมื่อหา branch lab-N ไม่เจอ
git stash -u          # เก็บงานของ lab ก่อนไว้ (ดูย้อนได้ด้วย git stash list)
git checkout lab-2
npm test
```

| อาการ | แก้ |
|---|---|
| `error: pathspec 'lab-N' did not match` | `git fetch origin` แล้ว `git checkout lab-N` ใหม่ |
| `would be overwritten by checkout` | `git stash -u` ก่อน แล้วค่อย checkout |

## ระบุ lab ทุก session (ใช้คำนวณ scoreboard)

ตั้งชื่อ chat `Lab N` และขึ้นต้นทุก prompt ด้วย `[Lab N]` (ข้อย่อย เช่น `[Lab 2-A]`) — platform แยก prompts / agent steps / tokens ต่อ lab จาก tag นี้

ใช้ model **Claude Sonnet 5.5** ทุก lab · ปิด skills / MCP server ที่ไม่ใช้ก่อนเริ่ม · ไม่เห็น Ask ใน mode picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน

## API

| Method | Path | ทำอะไร |
|---|---|---|
| GET | `/claims` | รายการใบเบิกทั้งหมด |
| GET | `/claims/:id` | ใบเบิก 1 รายการ |
| POST | `/claims` | สร้างใบเบิก |
| POST | `/claims/:id/cancel` | ยกเลิกใบเบิก (`{ "note": "..." }` ไม่บังคับ) |
| GET | `/claims/export.csv` | ส่งออก CSV |

ตัวอย่างสร้างใบเบิก:

```bash
curl -X POST localhost:3000/claims -H 'content-type: application/json' -d '{
  "employeeId": "EMP-003",
  "date": "2026-11-12",
  "category": "meal",
  "description": "Client lunch",
  "lines": [{ "description": "Lunch", "amount": 480, "quantity": 1 }]
}'
```

Validation error ตอบ `400` รูปแบบ `{ "error": "ValidationError", "details": [{ "field": "...", "message": "..." }] }`

ข้อมูลเก็บใน memory และรีเซ็ตทุกครั้งที่ restart (มีใบเบิกตัวอย่าง 3 รายการ)

## โครงสร้าง

```
src/
  app.ts            Express app + error handler
  server.ts         จุดเริ่มรัน
  config.ts         ค่าตั้งค่า
  errors.ts         ValidationError, NotFoundError
  claims/
    types.ts        Claim, ClaimLine, NewClaimInput
    store.ts        ที่เก็บข้อมูลใน memory + ข้อมูลตัวอย่าง
    validate.ts     ตรวจข้อมูลใบเบิก
    total.ts        คำนวณยอดรวม
    export.ts       ส่งออก CSV
    routes.ts       เส้นทาง /claims
tests/              vitest + supertest
```
