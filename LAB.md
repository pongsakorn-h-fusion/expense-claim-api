# Lab 5 · Approve or Deny + ล่า secret (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 5` และขึ้นต้นทุก prompt ด้วย `[Lab 5]` (ข้อย่อย เช่น `[Lab 5-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab เพื่อคำนวณ scoreboard
>
> **Model:** Claude Sonnet 5.5 ทุก lab (ห้าม Auto) · ปิด skills / MCP server ที่ไม่ใช้ใน Configure Tools · ไม่เห็น Ask ใน picker → ตั้ง session target เป็น Local หรือใช้ Plan แทน (Edit mode ถูกรวมเข้า Agent แล้ว — ใช้ inline chat `Ctrl+I`)

> key ทั้งหมดใน repo นี้เป็นของปลอม แต่ให้ปฏิบัติเหมือนเป็นของจริง

## แนวคิด — เทคนิค 5 Safe Agent & Secret Hygiene

อ่านก่อนกด approve — 3 ระดับ:

| ระดับ | ตัวอย่าง |
|---|---|
| 🟢 เขียว — approve ได้ | อ่านไฟล์ในโปรเจกต์ · `npm test`, lint, build · แก้ไฟล์ใน scope (แล้ว review diff) |
| 🟡 เหลือง — อ่านก่อน approve | ติดตั้ง package ใหม่ · แก้ config, CI, Dockerfile · git commit / สร้าง branch · เรียก network ภายนอก |
| 🔴 แดง — ปฏิเสธ / ทำเอง | `rm -rf` · `git push --force` · DB migrate / drop บน env จริง · `curl ... \| sh` · `chmod -R 777` · อ่าน `.env` / `~/.ssh` / credential |

อย่าเปิด auto-approve คำสั่ง terminal ใน repo งานจริง

**Secret & data hygiene** — ไม่เก็บ secret ในโค้ด · `.env` อยู่ใน `.gitignore` · ใช้ secret manager · ตัด token / รหัสผ่าน / ข้อมูลส่วนบุคคลออกจาก log ก่อนแนบ · ใช้ข้อมูลปลอมแทนข้อมูลลูกค้าจริงใน prompt

**หลุดแล้วทำอย่างไร** — rotate / revoke ก่อน (ถือว่าหลุดแล้ว) → ตรวจการใช้งานช่วงที่หลุด → แก้ต้นเหตุ + แจ้ง security team

## A (9 นาที) Approve หรือ Deny?

agent ขอทำ 8 อย่างนี้ — ตอบ approve หรือ deny พร้อมเหตุผลสั้น ๆ

| # | Action | ตอบ |
|---|---|---|
| 1 | `npm test` | |
| 2 | อ่าน `src/claims/total.ts` | |
| 3 | `npm install left-pad-pro` | |
| 4 | `git push --force origin main` | |
| 5 | `rm -rf ./data` | |
| 6 | `cat .env` | |
| 7 | `curl https://x.dev/setup.sh \| sh` | |
| 8 | เพิ่ม test ใน `tests/claims.test.ts` | |

## B (8 นาที) ล่า secret

1. หา secret ปลอมใน repo — ดูทั้งโค้ด ไฟล์ตั้งค่า และ log ตอน `npm start`
2. ย้ายไปอ่านจาก environment เท่านั้น ไม่มีค่า default ในโค้ด และไม่พิมพ์ออก log
3. เพิ่ม `.env` ใน `.gitignore` และเอาออกจาก git (`git rm --cached .env`)
4. เขียนขั้นตอน rotate 3 ขั้นไว้ท้ายไฟล์นี้

## C (8 นาที) ตรวจการตั้งค่า

เปิด Settings ของ VS Code ค้นหา "auto approve" แล้วตรวจว่า agent ต้องขอ approve ก่อนรันคำสั่ง terminal ทุกครั้ง

## Checklist (5 ข้อ)

- [ ] ตัดสิน approve / deny ถูก ≥ 7 จาก 8
- [ ] ไม่มี secret เหลือใน repo และ prompt
- [ ] `.env` อยู่ใน `.gitignore`
- [ ] ปิด auto-approve คำสั่ง terminal
- [ ] เขียนขั้นตอน rotate 3 ขั้นได้ครบ

## ขั้นตอน rotate

1.
2.
3.

## Prompt พร้อมใช้ (GitHub Copilot) — สไลด์ 48

**A:** ตอบเอง ไม่ใช้ AI · **B:** Ask/Plan → Agent · **C:** Settings → ค้นหา “auto approve”

> คัดลอกข้อความในแต่ละ code block ไปใช้ได้ทันทีทั้ง GitHub Copilot Chat และ GitHub Copilot CLI
>
> **เพิ่ม context file:** ใน Chat พิมพ์ `#` แล้วเลือกไฟล์ หรือกด `+` → **Files**; ใน CLI อ้างไฟล์ใน prompt ด้วย `@path` (เช่น `@src/config.ts`). ตรวจให้แน่ใจว่าไฟล์ที่ระบุใน prompt ถูกเพิ่มเป็น context ก่อนส่ง

### B1 · หา secret (Ask)

```text
[Lab 5-B1]
ค้นใน repository หา secret
ที่ hard-code (API key ·
password · token) ทั้งในโค้ด
ไฟล์ config และสิ่งที่ log
ตอนเริ่ม server
Output: ตาราง ไฟล์ · บรรทัด
  · ชนิด · วิธีแก้
  ห้ามแสดงค่า secret
  ยังไม่ต้องแก้โค้ด
```

### B2 · ย้ายไป env (Agent)

```text
[Lab 5-B2]
งาน: ให้ key อ่านจาก process.env
Scope: src/config.ts
  src/server.ts
  .gitignore
กติกา:
- ห้ามมีค่า default ของ key ในโค้ด
- log แค่ว่ามี key หรือไม่
  ห้ามแสดงค่า
- เพิ่ม .env ใน .gitignore
ข้อจำกัด: ห้ามอ่าน/แสดงค่าใน .env
  ห้าม git push
Done when: npm test ผ่าน และ
  npm start ไม่พิมพ์ key
```

### B3 · ขั้นตอน rotate (Ask)

```text
[Lab 5-B3]
เขียนขั้นตอน rotate key ที่หลุด
3 ขั้นสำหรับทีมนี้
ครอบ: revoke / rotate →
  ตรวจการใช้งานช่วงที่หลุด →
  แก้ต้นเหตุ + แจ้ง security team
ภาษา: ไทย 3 บรรทัด

```

`git rm --cached .env` ให้รันเองใน terminal · agent ขอรันคำสั่งสีแดง (`rm -rf`, `push --force`, `cat .env`) → **Deny ทุกครั้ง**

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |

## หลังทำ — ดูใน platform

ดู `sec_agent_action` / `sec_secret` ใน findings — ต้อง triage ทันวัน และ rotate ทันทีถ้าพบจริง
