# Lab 1 · เขียน prompt กำกวมใหม่ให้ชัด (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 1` และขึ้นต้นทุก prompt ด้วย `[Lab 1]` (ข้อย่อย เช่น `[Lab 1-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

## แนวคิด — เทคนิค 1 Specific Request

prompt กำกวม = AI ต้องเดา = แก้ไปมา = token เพิ่ม · prompt ที่ชัดมี 5 ช่อง:

| ช่อง | ใส่อะไร |
|---|---|
| เป้าหมาย | ทำอะไร เพื่ออะไร |
| Scope | ไฟล์ / ฟังก์ชัน / endpoint ที่แก้ได้ |
| กติกา | เงื่อนไขธุรกิจ ตัวเลขชัด |
| ข้อจำกัด | ห้ามทำอะไร · ใช้ของเดิมอะไร |
| Done when | ตรวจอย่างไรว่าเสร็จ |

```text
เป้าหมาย:   ...
Scope:      แก้ได้เฉพาะ ...
กติกา:      ...
ข้อจำกัด:   ห้าม ... / ใช้ ... เดิม
Done when:  ...
```

นิสัยที่ทำให้ prompt ชัดโดยไม่ต้องยาว: 1 prompt = 1 งาน · ใช้ตัวเลขและชื่อจริง (`≤ 50,000`, `ValidationError`) · บอกสิ่งที่ห้ามทำ · ให้ AI ถามกลับเมื่อโจทย์ยังไม่ชัด · follow-up ก็ต้องชัด — บอกว่าอะไรผิด ที่ไหน และอยากให้แก้แค่ไหน

## โจทย์

เขียน prompt 3 ข้อด้านล่างใหม่ด้วย 5 ช่อง — **เป้าหมาย · Scope · กติกา · ข้อจำกัด · Done when** — แล้วรันจริงบน repo นี้

1. `แก้ bug ยอดรวมหน่อย`
2. `เพิ่ม validation วันที่`
3. `ทำ export ให้ดีขึ้น`

แยก chat ต่อโจทย์: `Lab 1-1` · `Lab 1-2` · `Lab 1-3` (Lab 2 ข้อ A จะกลับมาใช้ chat `Lab 1-1` ต่อ)

**ไม่รู้ว่าต้องแก้ไฟล์ไหน?** ใช้ **Ask** (หรือ Plan) หา scope ก่อน แล้วค่อยส่งงานให้ Agent ใน session ใหม่:

```text
[Lab 1-2] ยังไม่ต้องแก้โค้ด
ค้นใน repository ว่าส่วนที่ตรวจวันที่ของใบเบิกอยู่ไฟล์ / ฟังก์ชันไหน
และมี test ไหนครอบอยู่แล้ว
Output: ตาราง ไฟล์ · ฟังก์ชัน · เหตุผล ไม่เกิน 5 แถว
```

หรืออ่านโค้ดเอง 5 นาทีเพื่อหาว่าแต่ละข้อควรแก้ตรงไหน — ลอง `npm start` แล้วเปิด `/claims` และ `/claims/export.csv` ดูผลจริง

## Checklist (5 ข้อ)

- [ ] ทุก prompt มีเป้าหมายและผลลัพธ์ที่ต้องการ
- [ ] ทุก prompt ระบุ scope (ไฟล์ / ฟังก์ชัน)
- [ ] มีข้อจำกัดอย่างน้อย 1 ข้อ
- [ ] มี Done when ที่ตรวจได้จริง
- [ ] ได้ผลถูกภายใน ≤ 2 prompts ต่อโจทย์

## Prompt พร้อมใช้ (GitHub Copilot) — สไลด์ 22

**Mode:** Agent · **Model:** เดิมจาก Lab 0 · **Session:** ใหม่ ต่อ 1 โจทย์

แนะนำให้ลองเขียนเอง 5 นาทีก่อน แล้วค่อยเทียบกับ prompt ด้านล่าง

> คัดลอกข้อความในแต่ละ code block ไปใช้ได้ทันทีทั้ง GitHub Copilot Chat และ GitHub Copilot CLI
>
> **เพิ่ม context file:** ใน Chat พิมพ์ `#` แล้วเลือกไฟล์ หรือกด `+` → **Files**; ใน CLI อ้างไฟล์ใน prompt ด้วย `@path` (เช่น `@src/claims/validate.ts`). ตรวจให้แน่ใจว่าไฟล์ที่ระบุใน prompt ถูกเพิ่มเป็น context ก่อนส่ง

### 1 · “แก้ bug ยอดรวมหน่อย”

```text
[Lab 1-1]
เป้าหมาย: แก้ยอดรวมใบเบิก
  ที่ทศนิยมเพี้ยน
Scope: แก้ได้เฉพาะ
  src/claims/total.ts
  tests/total.test.ts
กติกา: คิดเงินเป็นสตางค์ (integer)
  แล้วแปลงกลับเป็นบาทตอนคืนค่า
ข้อจำกัด: ห้ามเปลี่ยน signature
  ของ calcTotal()
Done when: CLM-0002 ได้ 1250.5
  และ npm test ผ่านทั้งหมด
```

### 2 · “เพิ่ม validation วันที่”

```text
[Lab 1-2]
เป้าหมาย: ตรวจวันที่ใบเบิก
  ให้ถูกกติกา
Scope: แก้ได้เฉพาะ
  src/claims/validate.ts
  tests/validate.test.ts
กติกา: รูปแบบ YYYY-MM-DD
  ไม่เป็นวันในอนาคต
  ไม่เก่ากว่า 90 วัน
ข้อจำกัด: ใช้ ValidationError เดิม
  ห้ามเพิ่ม dependency
Done when: มี test วันนี้ · พรุ่งนี้
  · 90 วัน · 91 วัน · npm test ผ่าน
```

### 3 · “ทำ export ให้ดีขึ้น”

```text
[Lab 1-3]
เป้าหมาย: export.csv เปิดใน Excel
  แล้วคอลัมน์ไม่เลื่อน
Scope: แก้ได้เฉพาะ
  src/claims/export.ts
  + test ใน tests/claims.test.ts
กติกา: มีแถว header
  escape comma และ " (RFC 4180)
ข้อจำกัด: ห้ามเพิ่ม library CSV
Done when: "Taxi, airport to office"
  ของ CLM-0001 อยู่คอลัมน์เดียว
  และ npm test ผ่าน
```

ปิดท้ายทุก prompt ได้: `ถ้าข้อมูลไม่พอ ให้ถามฉันก่อน ไม่เกิน 3 คำถาม`

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ดู tag ของ prompt วันนี้ — `bp_vague` ควรลด · `bp_goal_explicit` / `bp_scope_bounded` ควรเพิ่ม
