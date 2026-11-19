# Lab 4 · Test-first: ห้ามเบิกซ้ำด้วยใบเสร็จเดิม (25 นาที)

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
