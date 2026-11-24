# Lab 4 · Test-first: ห้ามเบิกซ้ำด้วยใบเสร็จเดิม (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 4` และขึ้นต้นทุก prompt ด้วย `[Lab 4]` (ข้อย่อย เช่น `[Lab 4-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

## โจทย์

ใบเบิกที่ใช้ `receiptUrl` ซ้ำกับใบเบิกเดิมต้องถูกปฏิเสธ **ยกเว้นใบเดิมถูกยกเลิกแล้ว**

Branch นี้แก้ bug ยอดรวมแล้ว และมี instructions file แบบกระชับ (`.github/copilot-instructions.md` + `.github/instructions/tests.instructions.md`)

## ขั้นตอน

0. รัน `npm test` แล้วจด test baseline (branch นี้ต้องผ่านทั้งหมด)
1. ให้ AI เสนอแผน ≤ 3 ขั้น แล้วรอยืนยัน — ยืนยันหรือแก้แผน
2. ขั้นแรก: เขียน test ที่ fail ด้วยเหตุผลที่ถูกก่อน
3. implement ทีละขั้นจน test ทั้งชุดผ่าน
4. ให้ AI review diff หา edge case ที่ยังไม่ครอบ

## Checklist (5 ข้อ)

- [ ] ขอแผนก่อนแก้โค้ด (≤ 3 ขั้น)
- [ ] มี test ที่ fail ก่อน implement
- [ ] test ทั้งชุดผ่าน รวมกรณียกเลิกแล้วเบิกใหม่
- [ ] review diff + ให้ AI หา edge case
- [ ] agent steps ต่อ prompt น้อยกว่า Lab 0

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ดู `bp_plan_first` · `bp_asks_tests` · `bp_asks_review` ที่ควรเพิ่ม และ `eff_bigbang_request` / `eff_retry_loop` ที่ควรลด
