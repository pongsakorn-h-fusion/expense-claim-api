# Lab 7 · Right-size the agent (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 7` และขึ้นต้นทุก prompt ด้วย `[Lab 7]` (ข้อย่อย เช่น `[Lab 7-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

## แนวคิด — เทคนิค 7 Agent Right-Sizing

agent ใช้กำลังเกินงาน — 5 สัญญาณจาก efficiency tags:

| Tag | สัญญาณ | ทำอย่างไร |
|---|---|---|
| `eff_effort_overkill` | effort สูงกับงานเล็ก | เริ่ม effort ปกติ — ค่อยเพิ่มเมื่องานยากจริง |
| `eff_light_model_struggle` | model เบา วนหลายรอบ | เลือก model ตรงงานตั้งแต่แรก ไม่สลับกลางทาง |
| `eff_subagent_fanout` | subagent หลายตัวกับงานจุดเดียว | งานเล็กใช้ Ask / inline chat ไม่ต้อง fan out |
| `eff_vision_heavy` | ส่งรูปซ้ำ ๆ ทั้งจอ | crop เฉพาะจอ error · แปลงเป็น text เมื่อทำได้ |
| `eff_tool_output_bloat` | context บวมจาก tool output | ระบุไฟล์เป้าหมาย · จำกัด output ของ tool |

วัดต่อ turn — เทียบ 2 แบบทุกครั้ง (งานเดียวกัน ต่าง effort / model / subagent) · เริ่มเบา ค่อยเพิ่ม · จุดมุ่งหมายคือ **งานที่ตรวจแล้วเสร็จต่อ credits** ไม่ใช่ credits ต่ำสุด

## ก่อนเริ่ม

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

## Prompt พร้อมใช้ (GitHub Copilot) — สไลด์ 58

**Model:** เดิม · **Effort:** ตั้งใน model picker (ถ้า model รองรับ) · **Tools:** Configure Tools ในช่อง Chat

> บรรทัดที่ขึ้นต้นด้วย `#` ใน prompt คือคำอธิบาย ไม่ต้องพิมพ์ · ข้อความในวงเล็บ เช่น `(วาง error จาก npm test)` ให้แทนด้วยของจริง

### A · Effort + subagent

```text
[Lab 7-A]
# แบบ 1 — เกินงาน (effort สูง)
ใช้ #runSubagent สำรวจทั้ง repo
แล้วแก้ข้อความ error เป็นไทยใน
src/claims/validate.ts

# แบบ 2 — พอดีงาน (effort ปกติ)
แก้ข้อความ error เป็นไทยใน
#file:src/claims/validate.ts
คง field และ ValidationError เดิม
อัปเดต test ที่ assert ข้อความ
ไม่ใช้ subagent
Done when: npm test ผ่าน
```

### B · Vision

```text
[Lab 7-B]
# browser: /claims/CLM-0002
# จับภาพ: Win+Shift+S · Mac ⌃⇧⌘4
# แล้ว Ctrl/⌘+V ลงช่อง Chat
# แบบ 1 เต็มจอ · แบบ 2 crop
total ของ CLM-0002 ในภาพ
ผิดเพราะอะไร? ตอบ 2 bullet

# แบบ 3 — text แทนภาพ
total ของ CLM-0002 ควรเป็น
1250.5 แต่ได้ 1250.4999999999998
JSON: (วางจาก /claims/CLM-0002)
สาเหตุคืออะไร? ตอบ 2 bullet
```

ตัวอย่างภาพ: แบบ 1 = ภาพเต็มหน้า `/claims/CLM-0002` · แบบ 2 = crop เฉพาะบรรทัด `"total":1250.4999999999998`

### C · Tool output

```text
[Lab 7-C]
# แบบ 1 — tools ทั้งหมด ไม่ระบุไฟล์
total ของ CLM-0002 ผิดเพราะอะไร?

# แบบ 2 — ปิด MCP ที่ไม่ใช้
#file:src/claims/total.ts
total ของ CLM-0002 =
1250.4999999999998 (ควร 1250.5)
สาเหตุคืออะไร? ตอบ 2 bullet
ยังไม่ต้องแก้โค้ด
```

ถ้าไม่มี `#runSubagent` ในเวอร์ชันของคุณ ใช้ `#codebase` แทน (ค้นทั้ง repo) · ทุกแบบรันใน session ใหม่ ขึ้นต้นด้วย tag แล้วจด steps / tokens

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ดู efficiency tags ต่อ turn: `eff_effort_overkill` · `eff_subagent_fanout` · `eff_vision_heavy` · `eff_tool_output_bloat` ควรไม่ขึ้นหลังจูนแล้ว · est. credits ต่อ turn ใช้เทียบข้อ A/B ได้ (rate ตั้งแล้ว)
