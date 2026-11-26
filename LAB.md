# Lab 2 · A/B: session เก่า vs context ที่ใช่ (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 2` และขึ้นต้นทุก prompt ด้วย `[Lab 2]` (ข้อย่อย เช่น `[Lab 2-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

## แนวคิด — เทคนิค 2 Context Engineering

5 กติกา context:

1. prompt แรกของทุก task ต้องพก context — goal, ไฟล์, error, ข้อจำกัด
2. อ้างเฉพาะที่เกี่ยว — ≤ 3 ไฟล์ ด้วย `#file` หรือแนบ selection แทนการแนบทั้ง repo
3. แนบ error / log จริง — ตัด token, รหัสผ่าน, ข้อมูลส่วนบุคคลออกก่อน
4. เปลี่ยน task = เปิด session ใหม่ · session ยาวเกิน ~8 prompts → ให้ AI สรุป แล้วเริ่มใหม่ด้วยสรุปนั้น
5. กติกาที่ใช้ทั้ง repo ใส่ instructions file — ไม่ต้องพิมพ์ซ้ำทุก prompt (`.github/copilot-instructions.md` ถูกแนบเป็น context ให้ทุก chat ใน repo อัตโนมัติ)

## โจทย์

Branch นี้มี **test ที่ fail 1 ตัวโดยตั้งใจ** ใน `tests/total.test.ts` — ยอดรวมใบเบิกเชียงใหม่ทศนิยมเพี้ยน รัน `npm test` เพื่อดู error จริง

**A (8 นาที)** เปิด chat **`Lab 1-1`** (โจทย์แก้ bug ยอดรวมของ Lab 1) จาก Chat history แล้วพิมพ์ต่อใน session นั้น — ขึ้นต้นทุก prompt ด้วย `[Lab 2-A]` แก้ bug นี้ด้วย follow-up สั้น ๆ — บันทึกตัวเลข

**B (8 นาที)** `git stash -u` เพื่อเก็บผลของ A แล้วเปิด session ใหม่ชื่อ `Lab 2-B` แนบไฟล์ที่เกี่ยวข้องเป็น context พร้อม error จริงจาก `npm test` — บันทึกตัวเลข

```text
งาน: แก้ bug ยอดรวมใบเบิกทศนิยมเพี้ยน
Context: src/claims/total.ts และ tests/total.test.ts
Error: expected 1250.5, received 1250.4999999999998
ข้อจำกัด: ห้ามเปลี่ยน signature ของ calcTotal()
Done when: npm test ผ่านทั้งหมด
```

**C (9 นาที)** สร้าง `.github/copilot-instructions.md` 4–6 บรรทัด (convention ของ repo นี้) แล้วทำ B ซ้ำใน session ใหม่

## Checklist (5 ข้อ)

- [ ] เปิด session ใหม่เมื่อเปลี่ยน task
- [ ] อ้างเฉพาะไฟล์ที่เกี่ยว (≤ 3 ไฟล์)
- [ ] แนบ error / log จริงที่ตัดข้อมูลลับแล้ว
- [ ] มี instructions file ที่ AI ทำตามได้จริง
- [ ] B หรือ C ใช้ prompts หรือ tokens น้อยกว่า A

## Prompt พร้อมใช้ (GitHub Copilot) — สไลด์ 28

**Mode:** Agent · **Model:** เดิม · **Session:** A ใช้ chat `Lab 1-1` · B / C ใช้ session ใหม่

> คัดลอกข้อความในแต่ละ code block ไปใช้ได้ทันทีทั้ง GitHub Copilot Chat และ GitHub Copilot CLI
>
> **เพิ่ม context file:** ใน Chat พิมพ์ `#` แล้วเลือกไฟล์ หรือกด `+` → **Files**; ใน CLI อ้างไฟล์ใน prompt ด้วย `@path` (เช่น `@src/claims/total.ts`). ตรวจให้แน่ใจว่าไฟล์ที่ระบุใน prompt ถูกเพิ่มเป็น context ก่อนส่ง

### A · chat Lab 1-1 + follow-up สั้น

```text
[Lab 2-A] test total ยัง fail
ตรวจ tests/total.test.ts และ src/claims/total.ts
แก้สาเหตุที่ทำให้ยอดรวมทศนิยมเพี้ยน
ข้อจำกัด: ห้ามเปลี่ยน signature ของ calcTotal()
Done when: npm test ผ่านทั้งหมด
```

ถ้าการแก้ครั้งแรกยังไม่ผ่าน ให้ส่ง follow-up นี้:

```text
[Lab 2-A] ยังไม่ผ่าน ตรวจผลล่าสุดแล้วแก้เฉพาะสาเหตุที่ยังทำให้ test ล้ม
รัน npm test อีกครั้งและรายงานผล
```

### B · session ใหม่ + context

```text
[Lab 2-B]
งาน: แก้ bug ยอดรวมใบเบิก
  ทศนิยมเพี้ยน
Context:
  src/claims/total.ts
  tests/total.test.ts
Error: expected 1250.5, received 1250.4999999999998
ข้อจำกัด: ห้ามเปลี่ยน signature
  ของ calcTotal()
Done when: npm test ผ่านทั้งหมด
```

### C · สร้าง instructions แล้วทำ B ซ้ำ

```text
[Lab 2-C]
สร้างไฟล์
.github/copilot-instructions.md
ไม่เกิน 6 บรรทัด ดู convention จาก
src/errors.ts
tests/validate.test.ts
ต้องมี:
- TypeScript strict ห้ามใช้ any
- Error ใช้ ValidationError
- Test: vitest ใน tests/*.test.ts
- เงินคิดเป็นสตางค์ (integer)
- แก้เฉพาะไฟล์ที่ระบุ

ใช้ prompt B ใน session ใหม่หลังสร้าง instructions file
```

chat เดิม = เปิด `Lab 1-1` จาก Chat history · session ใหม่ = **+ (New Chat)** · `git stash -u` ก่อนเริ่ม B · C ใช้ prompt ของ B ทุกตัวอักษร เพื่อเทียบได้

## บันทึกลง scoreboard (แถว Lab 2 ใช้ตัวเลขของ C)

| รอบ | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| A | | | | |
| B | | | | |
| C | | | | |

## หลังทำ — ดูใน platform

ดู `bp_clear_context` · `bp_relevant_files` · `bp_error_context` ที่ควรเพิ่ม และ `eff_context_bloat` / `eff_long_session_drift` ที่ควรลด
