# Lab 0 · Baseline — ทำแบบที่ทำปกติ (15 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 0` และขึ้นต้นทุก prompt ด้วย `[Lab 0]` (ข้อย่อย เช่น `[Lab 0-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

## โจทย์ A

เพิ่มกฎ: **ใบเบิกยอดเกิน 1,000 บาท ต้องแนบใบเสร็จ** (`receiptUrl`) ถ้าไม่มีให้ตอบ error ตามรูปแบบเดิมของ API (`ValidationError`) และเพิ่ม test

ใช้ AI แบบที่คุณทำทุกวัน **ยังไม่ต้องใช้เทคนิคใด** — เราต้องการ baseline จริง

ก่อนเริ่ม: `npm install` แล้ว `npm test` ต้องผ่านทั้งหมด

ตั้งค่า Copilot Chat ก่อนพิมพ์ prompt แรก:

1. เปิด Chat (`Ctrl+Alt+I` · Mac `⌃⌘I`) → **+ New Chat** แล้วตั้งชื่อ `Lab 0`
2. Mode: **Agent**
3. Model: **Claude Sonnet 5.5** — จดชื่อ model + ตัวคูณ premium request ลง scoreboard · ห้ามใช้ Auto (เทียบ token กับ Lab 8 ไม่ได้)
4. ปิด skills และ MCP server ที่ติดตั้งไว้ใช้งานอื่น (Configure Tools) — ทุกคนเริ่มจากสภาพเดียวกัน

Prompt baseline (ขึ้นต้นด้วย tag แล้วพิมพ์แบบที่ทำทุกวัน):

```text
[Lab 0]
เพิ่มกฎใบเบิกที่ยอดเกิน 1,000 บาท
ต้องมี receiptUrl ถ้าไม่มีให้ error
แล้วเพิ่ม test ด้วย
```

## Checklist (5 ข้อ) — ใช้ซ้ำใน Lab 8

- [ ] โค้ดทำงานตามกฎครบ (≤ 1,000 ไม่บังคับ · > 1,000 ต้องมีใบเสร็จ)
- [ ] มี test อย่างน้อย 3 กรณี (= 1,000 · > 1,000 ไม่มีใบเสร็จ · > 1,000 มีใบเสร็จ)
- [ ] `npm test` ผ่านทั้งหมด
- [ ] ไม่แก้ไฟล์นอก scope และไม่มี secret / ข้อมูลจริงใน prompt
- [ ] Review diff ก่อน accept ทุกครั้ง

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ตั้ง productivity marker (pivot day) วันนี้ใน platform — เทียบก่อน/หลังของทีมได้ทันที
