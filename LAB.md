# Lab 7 · Right-size the agent (25 นาที)

เทคนิค 7 — จัดกำลัง agent ให้พอดีงาน · วัดในระบบ: `eff_effort_overkill` · `eff_light_model_struggle` · `eff_subagent_fanout` · `eff_vision_heavy` · `eff_tool_output_bloat`

> branch นี้เริ่มจาก baseline ปกติ (npm test ผ่านทั้งหมด)

## โจทย์ (ทำทีละข้อแล้วบันทึกตัวเลขลง scoreboard)

1. **A · Effort + subagent (9 นาที)** — งานเล็ก: "แก้ข้อความ error ใน `src/claims/validate.ts` ให้เป็นภาษาไทย" รัน 2 แบบแล้วเทียบ: (1) effort สูงสุด + เปิด subagent (2) effort ปกติ + ไม่ใช้ subagent — บันทึก steps / tokens ของทั้งคู่
2. **B · Vision (8 นาที)** — แนบภาพปัญหาให้ AI อ่าน 2 แบบ: (1) screenshot เต็มจอ (2) crop เฉพาะส่วน error — บันทึก input tokens · ถ้าแปลงเป็น text ได้ ให้ทำอีกรอบแล้วเทียบ
3. **C · Tool output (8 นาที)** — ปิด MCP server / tool ที่ไม่ใช้ แล้วถามคำถามเดิมซ้ำโดยระบุไฟล์เป้าหมายเดียว (`src/claims/total.ts`) — เทียบกับรอบที่ไม่จำกัด

## Checklist (5 ข้อ)

- [ ] งานเล็กเริ่มที่ effort ปกติ ก่อนเพิ่มความแรง
- [ ] ไม่ใช้ subagent กับงานจุดเดียว
- [ ] ภาพที่แนบ crop เฉพาะส่วนที่ต้องใช้ (หรือแปลงเป็น text)
- [ ] ปิด tool / MCP ที่ไม่ใช้ก่อนเริ่มงาน
- [ ] บันทึกเทียบ 2 แบบของข้อ A และ B ครบ

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ดู efficiency tags ต่อ turn: `eff_effort_overkill` · `eff_subagent_fanout` · `eff_vision_heavy` · `eff_tool_output_bloat` ควรไม่ขึ้นหลังจูนแล้ว · est. credits ต่อ turn ใช้เทียบข้อ A/B ได้ (rate ตั้งแล้ว)
