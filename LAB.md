# Lab 2 · A/B: session เก่า vs context ที่ใช่ (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 2` และขึ้นต้นทุก prompt ด้วย `[Lab 2]` (ข้อย่อย เช่น `[Lab 2-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

Branch นี้มี **test ที่ fail 1 ตัวโดยตั้งใจ** ใน `tests/total.test.ts` — ยอดรวมใบเบิกเชียงใหม่ทศนิยมเพี้ยน รัน `npm test` เพื่อดู error จริง

**A (8 นาที)** เปิด chat **`Lab 1-1`** (โจทย์แก้ bug ยอดรวมของ Lab 1) จาก Chat history แล้วพิมพ์ต่อใน session นั้น — ขึ้นต้นทุก prompt ด้วย `[Lab 2-A]` แก้ bug นี้ด้วย follow-up สั้น ๆ — บันทึกตัวเลข

**B (8 นาที)** `git stash -u` เพื่อเก็บผลของ A แล้วเปิด session ใหม่ชื่อ `Lab 2-B` ใช้ context template + `#file` + error จริงจาก `npm test` — บันทึกตัวเลข

```text
งาน:       แก้ bug ...
Context:   #file:... #file:...
Error:     (วาง error จาก npm test)
ข้อจำกัด:   ...
Done when: ...
```

**C (9 นาที)** สร้าง `.github/copilot-instructions.md` 4–6 บรรทัด (convention ของ repo นี้) แล้วทำ B ซ้ำใน session ใหม่

## Checklist (5 ข้อ)

- [ ] เปิด session ใหม่เมื่อเปลี่ยน task
- [ ] อ้างเฉพาะไฟล์ที่เกี่ยว (≤ 3 ไฟล์)
- [ ] แนบ error / log จริงที่ตัดข้อมูลลับแล้ว
- [ ] มี instructions file ที่ AI ทำตามได้จริง
- [ ] B หรือ C ใช้ prompts หรือ tokens น้อยกว่า A

## บันทึกลง scoreboard (แถว Lab 2 ใช้ตัวเลขของ C)

| รอบ | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| A | | | | |
| B | | | | |
| C | | | | |

## หลังทำ — ดูใน platform

ดู `bp_clear_context` · `bp_relevant_files` · `bp_error_context` ที่ควรเพิ่ม และ `eff_context_bloat` / `eff_long_session_drift` ที่ควรลด
