# Lab 8 · Post-test — โจทย์ A เดิม ด้วย 7 เทคนิค (20 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 8` และขึ้นต้นทุก prompt ด้วย `[Lab 8]` (ข้อย่อย เช่น `[Lab 8-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

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

## บันทึกลง scoreboard — เทียบกับ Lab 0

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

เทียบ tag ก่อน/หลังของโจทย์เดิมใน platform — marker ของวันนี้คือ pivot day ของทีม
