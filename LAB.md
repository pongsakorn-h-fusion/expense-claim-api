# Lab 1 · เขียน prompt กำกวมใหม่ให้ชัด (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 1` และขึ้นต้นทุก prompt ด้วย `[Lab 1]` (ข้อย่อย เช่น `[Lab 1-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

เขียน prompt 3 ข้อด้านล่างใหม่ด้วย 5 ช่อง — **เป้าหมาย · Scope · กติกา · ข้อจำกัด · Done when** — แล้วรันจริงบน repo นี้

1. `แก้ bug ยอดรวมหน่อย`
2. `เพิ่ม validation วันที่`
3. `ทำ export ให้ดีขึ้น`

แยก chat ต่อโจทย์: `Lab 1-1` · `Lab 1-2` · `Lab 1-3` (Lab 2 ข้อ A จะกลับมาใช้ chat `Lab 1-1` ต่อ)

**ไม่รู้ว่าต้องแก้ไฟล์ไหน?** ใช้ **Ask** (หรือ Plan) หา scope ก่อน แล้วค่อยส่งงานให้ Agent ใน session ใหม่:

```text
[Lab 1-2] ยังไม่ต้องแก้โค้ด
ใน #codebase ส่วนที่ตรวจวันที่ของใบเบิกอยู่ไฟล์ / ฟังก์ชันไหน
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

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ดู tag ของ prompt วันนี้ — `bp_vague` ควรลด · `bp_goal_explicit` / `bp_scope_bounded` ควรเพิ่ม
