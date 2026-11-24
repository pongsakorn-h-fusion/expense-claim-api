# Lab 4 · Test-first: ห้ามเบิกซ้ำด้วยใบเสร็จเดิม (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 4` และขึ้นต้นทุก prompt ด้วย `[Lab 4]` (ข้อย่อย เช่น `[Lab 4-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

## แนวคิด — เทคนิค 4 Verify First

ไม่บอกเกณฑ์เสร็จ — agent ไม่รู้ว่าเมื่อไรควรหยุด จึงวนหลายรอบ · ทำงานเป็นขั้นเล็ก:

1. **Plan** — ให้ AI เสนอแผน ≤ 3 ขั้น แล้วรอยืนยัน
2. **Test** — เขียน test ที่ fail ด้วยเหตุผลที่ถูกก่อน
3. **Implement** — แก้เฉพาะให้ test ผ่าน ทีละขั้น
4. **Verify** — รัน test ทั้งชุด ไม่ใช่แค่ test ใหม่
5. **Review** — อ่าน diff + ให้ AI หา edge case ที่ยังไม่ครอบ

Review ก่อน accept diff: แก้เฉพาะไฟล์ใน scope · มี test กรณีหลัก + ขอบ · test ทั้งชุดผ่าน · ไม่มี dependency ใหม่ที่ไม่ได้ขอ · ไม่มี secret / ข้อมูลจริงในโค้ดหรือ test

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

## Prompt พร้อมใช้ (GitHub Copilot) — สไลด์ 42

**Mode:** ขั้น 1 ใช้ Plan (หรือ Ask) · ขั้น 2–4 ใช้ Agent · **Model:** เดิม · session ใหม่

> บรรทัดที่ขึ้นต้นด้วย `#` ใน prompt คือคำอธิบาย ไม่ต้องพิมพ์ · ข้อความในวงเล็บ เช่น `(วาง error จาก npm test)` ให้แทนด้วยของจริง

### 1 · ขอแผนก่อน (Plan mode)

```text
[Lab 4]
ก่อนแก้โค้ด เสนอแผนไม่เกิน 3 ขั้น แล้วรอฉันยืนยัน
งาน: ปฏิเสธใบเบิกที่ receiptUrl ซ้ำกับใบเดิม
  ยกเว้นใบเดิมถูกยกเลิกแล้ว (cancelled)
Scope: src/claims/*.ts · tests/
ข้อจำกัด: ใช้ ValidationError เดิม · ห้ามเพิ่ม dependency
```

### 2 · Test ก่อน (Agent)

```text
[Lab 4]
ยืนยันแผน — ทำขั้น 1 เท่านั้น:
เขียน test ที่ fail ยังไม่แก้ src/
กรณี: ซ้ำ → ปฏิเสธ · ใบเดิม cancelled → ผ่าน
  · receiptUrl ใหม่ → ผ่าน
Done when: test ใหม่ fail ด้วย "duplicate receipt"
  และ test เดิมยังผ่าน
```

### 3 · Implement ทีละขั้น

```text
[Lab 4]
ทำขั้นถัดไป: แก้โค้ดให้ test ทั้งชุดผ่าน
แก้เฉพาะไฟล์ในแผน
รัน npm test แล้วตอบผล pass / fail
```

### 4 · Review ก่อน accept

```text
[Lab 4]
Review #changes — มี edge case อะไร
ที่ test ยังไม่ครอบ?
Output: รายการไม่เกิน 5 ข้อ
  ยังไม่ต้องแก้โค้ด
```

`#changes` = แนบ diff ที่ยังไม่ commit ให้ Copilot อ่าน · ถ้าเวอร์ชันของคุณไม่มี Plan mode ให้ใช้ Ask ทำขั้น 1

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ดู `bp_plan_first` · `bp_asks_tests` · `bp_asks_review` ที่ควรเพิ่ม และ `eff_bigbang_request` / `eff_retry_loop` ที่ควรลด
