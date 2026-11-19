# Lab 6 · Evidence & Output (25 นาที)

เทคนิค 6 — ทำให้ AI **ตรวจย้อนได้** และได้ผลลัพธ์ **ในรูปแบบที่ใช้ต่อได้ทันที** · วัดในระบบ: `bp_repro_steps` · `bp_output_format` · `bp_language_requested`

## โจทย์ (ทำ 3 ข้อ ใช้ session ใหม่ต่อข้อ)

1. **Repro steps** — bug ยอดรวมมีอยู่จริงใน branch นี้: `curl localhost:3000/claims/CLM-0002` จะเห็น `"total": 1250.4999999999998` (ควรเป็น 1250.5 — ใบเบิกเชียงใหม่ 890.3 + 134.1 + 226.1) แนบ **curl + response จริง** (GET ใบเบิกเชียงใหม่ + POST สร้างใบเบิกเดียวกัน) ให้ AI แก้ `calcTotal` ใน `src/claims/total.ts` — ห้ามพิมพ์อธิบายเอง ให้ข้อมูลที่ตรวจย้อนได้เท่านั้น
2. **Output format** — ขอ `GET /claims/export.json` ใหม่โดยระบุชัด: field และลำดับ, ชื่อ key, เรียงตาม `id` · ขอโค้ดเป็น **diff เท่านั้น**
3. **Language** — ขอคำอธิบาย logic ใน `src/claims/validate.ts` เป็น **ภาษาไทย 3 bullet** ไม่เกิน 20 คำต่อ bullet

## Checklist (5 ข้อ)

- [ ] ทุก bug แนบ repro steps จริง (curl / log / error) โดยไม่มีข้อมูลลับ
- [ ] แก้ total แล้ว `curl /claims/CLM-0002` ได้ 1250.5 และเขียน test ตาม repro (เชื่อมเทคนิค 4)
- [ ] ทุก prompt ระบุรูปแบบผลลัพธ์ที่ต้องการก่อนเริ่ม
- [ ] งานที่ต้องการภาษาใด ระบุภาษา + รูปแบบบรรทัดชัด
- [ ] ได้ผลตรงรูปแบบภายใน ≤ 2 prompts ต่อโจทย์
- [ ] Review diff ก่อน accept ทุกครั้ง

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ดู tag ของ prompt วันนี้: `bp_repro_steps` · `bp_output_format` · `bp_language_requested` ควรขึ้น · ถ้ายังไม่ขึ้น แปลว่า prompt ยังไม่พกข้อมูลพวกนี้
