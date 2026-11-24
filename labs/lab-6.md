# Lab 6 · Evidence & Output (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 6` และขึ้นต้นทุก prompt ด้วย `[Lab 6]` (ข้อย่อย เช่น `[Lab 6-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

## แนวคิด — เทคนิค 6 Evidence & Output

3 แท็กที่ระบบวัดอยู่ ต่อยอดจาก 5 ช่องของเทคนิค 1:

| Tag | ใส่อะไรใน prompt |
|---|---|
| `bp_repro_steps` | ขั้นตอนทำซ้ำ — แนบ curl / log / error จริง AI ไม่ต้องเดา input และตรวจซ้ำได้ |
| `bp_output_format` | รูปแบบผลลัพธ์ — diff · ตาราง · JSON · ไฟล์เดียว ลด output ยาวที่อ่านแล้วทิ้ง |
| `bp_language_requested` | ภาษาที่ต้องการ — เช่น “ตอบไทย 3 bullet” คุมความยาว อ่านเร็ว |

ตัวอย่างก่อน / หลัง — `ทำ export เป็น json ด้วย` (AI ต้องเดา field · การเรียง · ความยาว · ภาษา) เทียบกับ:

```text
งาน: เพิ่ม GET /claims/export.json
Field: ตาม /claims/:id · เรียงตาม id
Output: ขอ diff อย่างเดียว
        ไม่ต้องอธิบายทั้งไฟล์
ภาษา: อธิบายเป็นภาษาไทย 3 bullet
Done when: test ใหม่ผ่าน
```

repro steps ต้องไม่มีข้อมูลลับ — ตัด token / รหัสผ่านออกก่อนแนบ (เชื่อมกับเทคนิค 5)

## ก่อนเริ่ม

เทคนิค 6 — ทำให้ AI **ตรวจย้อนได้** และได้ผลลัพธ์ **ในรูปแบบที่ใช้ต่อได้ทันที** · วัดในระบบ: `bp_repro_steps` · `bp_output_format` · `bp_language_requested`

## โจทย์ (ทำ 3 ข้อ ใช้ session ใหม่ต่อข้อ)

1. **Repro steps** — bug ยอดรวมมีอยู่จริงใน branch นี้: `curl localhost:3000/claims/CLM-0002` จะเห็น `"total": 1250.4999999999998` (ควรเป็น 1250.5 — ใบเบิกเชียงใหม่ 890.3 + 134.1 + 226.1) แนบ **curl + response จริง** (GET ใบเบิกเชียงใหม่ + POST สร้างใบเบิกเดียวกัน) ให้ AI แก้ `calcTotal` ใน `src/claims/total.ts` — ห้ามพิมพ์อธิบายเอง ให้ข้อมูลที่ตรวจย้อนได้เท่านั้น · Done when: `curl localhost:3000/claims/CLM-0002` ได้ `1250.5` และมี test ตาม repro (เชื่อมเทคนิค 4)
2. **Output format** — ขอ `GET /claims/export.json` ใหม่โดยระบุชัด: field และลำดับ, ชื่อ key, เรียงตาม `id` · ขอโค้ดเป็น **diff เท่านั้น**
3. **Language** — ขอคำอธิบาย logic ใน `src/claims/validate.ts` เป็น **ภาษาไทย 3 bullet** ไม่เกิน 20 คำต่อ bullet

## Checklist (5 ข้อ)

- [ ] ทุก bug แนบ repro steps จริง (curl / log / error) ไม่มีข้อมูลลับ
- [ ] ทุก prompt ระบุรูปแบบผลลัพธ์ก่อนเริ่ม
- [ ] งานที่ต้องการภาษา ระบุภาษา + บรรทัดชัด
- [ ] ได้ผลตรงรูปแบบ ≤ 2 prompts ต่อโจทย์
- [ ] Review diff ก่อน accept ทุกครั้ง

## Prompt พร้อมใช้ (GitHub Copilot) — สไลด์ 53

**Mode:** ข้อ 1–2 ใช้ Agent · ข้อ 3 ใช้ Ask · **Session:** ใหม่ต่อข้อ

> บรรทัดที่ขึ้นต้นด้วย `#` ใน prompt คือคำอธิบาย ไม่ต้องพิมพ์ · ข้อความในวงเล็บ เช่น `(วาง error จาก npm test)` ให้แทนด้วยของจริง

### 1 · Repro steps

```text
[Lab 6-1]
งาน: แก้ยอดรวมใบเบิกผิด
Repro:
$ curl localhost:3000/claims/CLM-0002
→ "total": 1250.4999999999998
  ควรเป็น 1250.5
  (890.3 + 134.1 + 226.1)
Scope: #file:src/claims/total.ts
  + test ตาม repro
Done when: curl เดิมได้ 1250.5
  และ npm test ผ่าน
Output: diff + ผล test เท่านั้น
```

### 2 · Output format

```text
[Lab 6-2]
งาน: เพิ่ม GET /claims/export.json
Field ตามลำดับ: id, employeeId,
  date, category, total, status
เรียง: ตาม id จากน้อยไปมาก
Scope: #file:src/claims/routes.ts
  #file:src/claims/export.ts
Output: ขอ diff อย่างเดียว
  ไม่ต้องอธิบายทั้งไฟล์
Done when: มี test ใหม่
  และ npm test ผ่าน
```

### 3 · Language

```text
[Lab 6-3]
อธิบาย logic ของ
#file:src/claims/validate.ts
ภาษา: ไทย 3 bullet
  ไม่เกิน 20 คำต่อ bullet
Output: ไม่ต้องแสดงโค้ด
```

repro ที่วางต้องไม่มี token / รหัสผ่าน / ข้อมูลจริง — ตัดออกก่อนวาง (เทคนิค 5) · ข้อ 1 ต้อง `npm start` ก่อน curl

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ดู tag ของ prompt วันนี้: `bp_repro_steps` · `bp_output_format` · `bp_language_requested` ควรขึ้น · ถ้ายังไม่ขึ้น แปลว่า prompt ยังไม่พกข้อมูลพวกนี้
