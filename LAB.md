# Lab 7 · Right-size the agent (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 7` และขึ้นต้นทุก prompt ด้วย `[Lab 7]` (ข้อย่อย เช่น `[Lab 7-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

เทคนิค 7 — จัดกำลัง agent ให้พอดีงาน · วัดในระบบ: `eff_effort_overkill` · `eff_light_model_struggle` · `eff_subagent_fanout` · `eff_vision_heavy` · `eff_tool_output_bloat`

> branch นี้เริ่มจาก baseline ปกติ (npm test ผ่านทั้งหมด) · bug ยอดรวมของ `CLM-0002` ยังอยู่ — ใช้ในข้อ B และ C

## โจทย์ (ทำทีละข้อแล้วบันทึกตัวเลขลง scoreboard)

1. **A · Effort + subagent (9 นาที)** — งานเล็ก: "แก้ข้อความ error ใน `src/claims/validate.ts` ให้เป็นภาษาไทย" รัน 2 แบบแล้วเทียบ: (1) effort สูงสุด + เปิด subagent (2) effort ปกติ + ไม่ใช้ subagent — บันทึก steps / tokens ของทั้งคู่
2. **B · Vision (8 นาที)** — `npm start` แล้วเปิด `http://localhost:3000/claims/CLM-0002` (`total` เป็น `1250.4999999999998`) จับภาพหน้าจอ — Windows `Win+Shift+S` (Snipping Tool) · Mac `⌃⇧⌘4` (ลากเลือกส่วน, copy ลง clipboard) หรือ `⌃⇧⌘3` (เต็มจอ) — แล้ว `Ctrl/⌘+V` หรือลากไฟล์ลงช่อง Chat ถามว่า total ผิดเพราะอะไร 2 แบบ: (1) screenshot เต็มจอ (2) crop เฉพาะส่วน `total` — บันทึก input tokens · ถ้าแปลงเป็น text ได้ (copy JSON) ให้ทำอีกรอบแล้วเทียบ
3. **C · Tool output (8 นาที)** — ถามคำถามเดียวกับข้อ B เป็น text 2 แบบ: (1) agent mode เปิด tool / MCP ทั้งหมด ไม่ระบุไฟล์ (2) ปิด MCP server / tool ที่ไม่ใช้ + ระบุไฟล์เป้าหมายเดียว `#file:src/claims/total.ts` — เทียบ steps / tokens

## Checklist (5 ข้อ)

- [ ] เริ่มที่ effort ปกติ ก่อนเพิ่มความแรง
- [ ] งานจุดเดียวไม่ใช้ subagent
- [ ] ภาพที่แนบ crop เฉพาะส่วน (หรือแปลงเป็น text)
- [ ] ปิด tool / MCP ที่ไม่ใช้ก่อนเริ่มงาน
- [ ] บันทึกเทียบ 2 แบบของ A และ B ครบ

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ดู efficiency tags ต่อ turn: `eff_effort_overkill` · `eff_subagent_fanout` · `eff_vision_heavy` · `eff_tool_output_bloat` ควรไม่ขึ้นหลังจูนแล้ว · est. credits ต่อ turn ใช้เทียบข้อ A/B ได้ (rate ตั้งแล้ว)
