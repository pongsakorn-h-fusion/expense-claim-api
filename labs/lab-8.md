# Lab 8 · Post-test — โจทย์ A เดิม ด้วย 7 เทคนิค (20 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 8` และขึ้นต้นทุก prompt ด้วย `[Lab 8]` (ข้อย่อย เช่น `[Lab 8-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

## แนวคิด

Post-test — ทำโจทย์ A เดิมจาก Lab 0 บนจุดเริ่มต้นเดียวกัน ด้วย model เดียวกัน แต่ใช้ครบ 7 เทคนิค แล้วนำแถว Lab 8 ไปเทียบกับ Lab 0 ใน Report ก่อน/หลัง (ข้อที่ทำได้ · prompts · agent steps · tokens · นาที)

## ก่อนเริ่ม

Branch นี้คือ **จุดเริ่มต้นเดียวกับ `lab-0`** (ยังไม่มี instructions file) เพื่อให้เทียบก่อน/หลังได้ตรง — เริ่มใน **chat session ใหม่**

## โจทย์ A

เพิ่มกฎ: **ใบเบิกยอดเกิน 1,000 บาท ต้องแนบใบเสร็จ** (`receiptUrl`) ถ้าไม่มีให้ตอบ error ตามรูปแบบเดิมของ API (`ValidationError`) และเพิ่ม test

ใช้ครบทั้ง 7 เทคนิค:

1. prompt 5 ช่อง — เป้าหมาย · Scope · กติกา · ข้อจำกัด · Done when
2. context ใน prompt แรก — `#file` เฉพาะที่เกี่ยว
3. mode / tools ที่ใช่ — ปิดแท็บและ tool ที่ไม่ใช้
4. plan + test ก่อน — แผน ≤ 3 ขั้น, test ที่ fail ก่อน
5. อ่านก่อน approve — ทุกคำสั่งที่ agent ขอรัน
6. evidence + output — แนบ repro steps / log จริง · ระบุรูปแบบผลลัพธ์และภาษา
7. right-size agent — effort ปกติก่อน · งานเล็กไม่ใช้ subagent · crop ภาพ · จำกัด tool output

## Checklist (5 ข้อ) — เดียวกับ Lab 0

- [ ] โค้ดทำงานตามกฎครบ (≤ 1,000 ไม่บังคับ · > 1,000 ต้องมีใบเสร็จ)
- [ ] มี test อย่างน้อย 3 กรณี (= 1,000 · > 1,000 ไม่มีใบเสร็จ · > 1,000 มีใบเสร็จ)
- [ ] `npm test` ผ่านทั้งหมด
- [ ] ไม่แก้ไฟล์นอก scope และไม่มี secret / ข้อมูลจริงใน prompt
- [ ] Review diff ก่อน accept ทุกครั้ง

## Prompt พร้อมใช้ (GitHub Copilot) — สไลด์ 60

**Mode:** Plan → Agent · **Model:** Sonnet 5.5 (= Lab 0) · **Session:** ใหม่ · ปิดแท็บ / MCP / skills ที่ไม่ใช้

> คัดลอกข้อความในแต่ละ code block ไปใช้ได้ทันทีทั้ง GitHub Copilot Chat และ GitHub Copilot CLI
>
> **เพิ่ม context file:** ใน Chat พิมพ์ `#` แล้วเลือกไฟล์ หรือกด `+` → **Files**; ใน CLI อ้างไฟล์ใน prompt ด้วย `@path` (เช่น `@src/claims/validate.ts`). ตรวจให้แน่ใจว่าไฟล์ที่ระบุใน prompt ถูกเพิ่มเป็น context ก่อนส่ง

### 1 · Prompt แรก — ครบ 7 เทคนิค (Plan / Agent)

```text
[Lab 8]
เป้าหมาย: ใบเบิกยอดรวม > 1,000 บาท ต้องมี receiptUrl
Scope: แก้ได้เฉพาะ src/claims/validate.ts
  และ tests/validate.test.ts
กติกา: ≤ 1,000 ไม่บังคับ
  > 1,000 ไม่มี receiptUrl → ValidationError
  field "receiptUrl" ตามรูปแบบ error เดิม
ข้อจำกัด: ใช้ calcTotal() เดิม · ห้ามเพิ่ม dependency
  ไฟล์อื่นถามก่อน
Done when: test 3 กรณี (= 1,000 · > 1,000 ไม่มี
  · > 1,000 มี) และ npm test ผ่านทั้งหมด
Output: diff + ผล test · สรุปไทย ≤ 3 bullet
ก่อนแก้โค้ด เสนอแผน ≤ 3 ขั้น แล้วรอฉันยืนยัน
```

### 2 · หลังยืนยันแผน (Agent)

```text
[Lab 8]
ยืนยันแผน — ทำขั้น 1:
เขียน test ที่ fail ก่อน
ยังไม่แก้ src/
Done when: test ใหม่ fail ด้วยเหตุผลที่ถูกต้อง
และ test เดิมยังผ่าน
```

หลังตรวจ test ที่เพิ่มแล้ว ให้ส่ง prompt นี้:

```text
[Lab 8]
ทำขั้นถัดไปตามแผนที่ยืนยันแล้ว
แก้เฉพาะไฟล์ใน scope จน npm test ผ่านทั้งหมด
Output: diff และผล test เท่านั้น
```

### 3 · Review ก่อน accept

```text
[Lab 8]
Review diff ที่ยังไม่ commit — edge case
ที่ test ยังไม่ครอบ ≤ 5 ข้อ
ยังไม่ต้องแก้โค้ด
```

อ่านทุกคำสั่งก่อน Approve (เทคนิค 5) · บันทึกแถว Lab 8 แล้วเทียบกับ Lab 0 ด้วย model เดียวกัน

## บันทึกลง scoreboard — เทียบกับ Lab 0

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

เทียบ tag ก่อน/หลังของโจทย์เดิมใน platform — marker ของวันนี้คือ pivot day ของทีม
