# Lab 3 · Token audit (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 3` และขึ้นต้นทุก prompt ด้วย `[Lab 3]` (ข้อย่อย เช่น `[Lab 3-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

## แนวคิด — เทคนิค 3 Token Optimization

token ส่วนใหญ่ไม่ได้มาจากสิ่งที่เราพิมพ์ — ทุก request ส่ง system prompt, instructions file, ไฟล์ที่แนบ + แท็บที่เปิด, ประวัติ chat และ tool / MCP definitions ไปด้วย · prompt ที่พิมพ์มักเป็นส่วนที่เล็กที่สุด

- **แกน 1 · ลด context ที่โหลดอยู่ตลอด** — instructions file สั้น ไม่ซ้ำกับ `AGENTS.md` · แบ่ง 3 ชั้น: always-on (กฎที่ใช้กับทุกงาน) · conditional (`.github/instructions/*.instructions.md` + `applyTo`) · on-demand (prompt file) · ปิดแท็บที่ไม่เกี่ยว
- **แกน 2 · เลือก mode · model · tools ก่อนเริ่ม** — คำถามที่ตอบได้จาก context → Ask (ไม่มี → Plan) · แก้จุดเดียวรู้ไฟล์ชัด → inline chat (`Ctrl+I`) · หลายไฟล์หลายขั้น → Agent · เปิดเฉพาะ MCP / tool ที่ใช้ · อย่าสลับกลางทาง
- **แกน 3 · คุม output และ noise** — ตั้ง default ให้ตอบกระชับ กำหนดรูปแบบเมื่อเหมาะ แต่ห้ามย่อคำเตือน security / การยืนยัน action ที่ย้อนไม่ได้

วัด **outcome ต่อ token** (งานที่ตรวจแล้วว่าเสร็จ ÷ token ทั้งหมด) — ไม่ใช่ token ต่ำสุด

ตัวอย่าง scoped file:

```markdown
---
applyTo: "tests/**/*.ts"
---
- ใช้ vitest
- ชื่อ test: should <ผลลัพธ์> when <เงื่อนไข>
- API test เรียก resetStore() ใน beforeEach
```

## โจทย์

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

## Prompt พร้อมใช้ (GitHub Copilot) — สไลด์ 36

**Mode:** A, C ใช้ Agent · B ใช้ Ask/Plan แล้ว Agent (prompt เดียวกัน) · **ก่อนเริ่ม:** ปิดแท็บ + ปิด MCP / skills ใน Configure Tools

> บรรทัดที่ขึ้นต้นด้วย `#` ใน prompt คือคำอธิบาย ไม่ต้องพิมพ์ · ข้อความในวงเล็บ เช่น `(วาง error จาก npm test)` ให้แทนด้วยของจริง

### A · ตรวจ always-on context

```text
[Lab 3-A]
อ่าน #file:copilot-instructions.md
และ #file:AGENTS.md แล้ว:
1) ตัดกฎที่ซ้ำกัน และกฎที่
   ดูได้จากโค้ดเอง
2) ย้ายกฎของ test ไป
   .github/instructions/
   tests.instructions.md
   พร้อม front matter
   applyTo: "tests/**/*.ts"
3) core เหลือ ≤ 10 บรรทัด
Output: ตารางก่อน/หลัง
  (บรรทัด · คำ) + diff
```

### B · Ask vs Agent (งานข้อ 1)

```text
# รัน Ask (หรือ Plan) แล้ว Agent
# ใช้ session ใหม่ทั้งสองรอบ
[Lab 3-B]
ทำไม test นี้ fail?
#file:src/claims/total.ts
#file:tests/total.test.ts
Error: (วาง error จาก npm test)
Output: 3 bullet
  ยังไม่ต้องแก้โค้ด

# จด agent steps / tokens
# ของทั้ง 2 รอบ
```

### C · concise default

```text
# เพิ่มท้าย copilot-instructions.md
## Output
- เริ่มด้วยคำตอบ ไม่ทักทาย
  ไม่สรุปซ้ำ
- งานแก้โค้ด: บอกสิ่งที่เปลี่ยน
  + ผล test
- คงตัวเลข เงื่อนไข คำเตือน
  และคำสั่งไว้ครบ

# ถาม B ซ้ำ ขึ้นต้น [Lab 3-C]
# เทียบความยาวคำตอบ
```

นับคำก่อน/หลัง: `wc -w .github/copilot-instructions.md AGENTS.md` (tokens ≈ คำ × 1.4) · Configure Tools = ไอคอนเครื่องมือในช่อง Chat · ไม่เห็น Ask ใช้ Plan แทน

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
