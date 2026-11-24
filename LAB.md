# Lab 3 · Token audit (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 3` และขึ้นต้นทุก prompt ด้วย `[Lab 3]` (ข้อย่อย เช่น `[Lab 3-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

Branch นี้มีของที่ตั้งใจใส่ไว้ให้ audit:

- `.github/copilot-instructions.md` ที่ยาวเกินจำเป็น มีกฎซ้ำ และมีกฎของ test ปนอยู่
- `AGENTS.md` ที่มีกฎซ้ำกับไฟล์ข้างบน
- test ที่ fail 1 ตัว (เหมือน `lab-2`)

**A (8 นาที) ตรวจ always-on context**

1. นับคำ: `wc -w .github/copilot-instructions.md AGENTS.md` (ประมาณ tokens ≈ คำ × 1.4)
2. ตัดกฎที่ซ้ำกับ `AGENTS.md` และกฎที่ AI หาเองได้จากโค้ด
3. ย้ายกฎของ test ไป `.github/instructions/tests.instructions.md` ที่มี `applyTo: "tests/**/*.ts"`
4. ให้ core instructions เหลือ ≤ 10 บรรทัด แล้วนับคำอีกครั้ง

**B (9 นาที) เลือก mode** (Ask / inline chat / Agent) ให้ 3 งาน แล้วรันงานข้อ 1 ทั้งแบบ Ask (ไม่มี → Plan) และ Agent — บันทึก steps / tokens ของทั้งคู่

1. ทำไม `tests/total.test.ts` fail (แนบ error)
2. แก้ข้อความ error ใน `src/claims/validate.ts` ให้เป็นภาษาไทย
3. เพิ่ม `GET /claims/:id/history` + test

**C (8 นาที) คุม output** — เพิ่ม concise default ใน instructions · ถามคำถามเดิมซ้ำ · ปิด MCP server / tool ที่ไม่ใช้

## Checklist (5 ข้อ)

- [ ] core instructions ≤ 10 บรรทัด + มี scoped file ที่มี `applyTo`
- [ ] ปิดแท็บ / ไฟล์ที่ไม่เกี่ยวก่อนเริ่ม task
- [ ] เลือก mode ถูก 3 / 3
- [ ] บันทึก Ask vs Agent ของคำถามเดียวกันครบ
- [ ] คำตอบหลังตั้ง concise สั้นลงแต่ยังครบข้อมูลที่ต้องใช้

## บันทึก

| | คำ (ก่อน) | คำ (หลัง) |
|---|---|---|
| instructions + AGENTS.md | | |

| งานข้อ 1 | Agent steps | Tokens |
|---|---|---|
| Ask | | |
| Agent | | |

## หลังทำ — ดูใน platform

ดู eff_* ต่อ turn — `eff_low_cache` · `eff_verbose_output_ask` · `eff_flagship_simple` และ est. credits ต่อ turn ที่เริ่มมีค่าหลังตั้ง rate
