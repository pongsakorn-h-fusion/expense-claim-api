# Lab 9 (Bonus) · สร้าง Skill ของทีม (25 นาที)

> **ระบุ lab ทุก session:** ตั้งชื่อ chat `Lab 9` และขึ้นต้นทุก prompt ด้วย `[Lab 9]` (ข้อย่อย เช่น `[Lab 9-A]`) — platform ใช้แยก prompts / agent steps / tokens ต่อ lab
>
> **Model:** Claude Sonnet 5.5 (เดิม) · **Mode:** Agent · session ใหม่ต่อข้อ · lab นี้เป็น bonus — **ไม่นับใน scoreboard /45**

## แนวคิด — Instructions · Skills · Agents

เก็บ 7 เทคนิคไว้ในไฟล์ — ทั้งทีมเรียกใช้ซ้ำ ไม่ต้องพิมพ์ prompt ยาวทุกครั้ง

| | ไฟล์ | โหลดเมื่อไร | ใช้กับ |
|---|---|---|---|
| **Instructions** | `.github/copilot-instructions.md` · `.github/instructions/*.instructions.md` | ตลอด (always-on) เมื่อทำงานกับไฟล์ที่ตรง `applyTo` | coding standard · กฎของ repo |
| **Skills** | `.github/skills/<name>/SKILL.md` + ไฟล์ประกอบ | ตามสั่ง (on-demand) — เรียก `/<name>` หรือ agent หยิบเองจาก `description` | งานซ้ำที่มีขั้นตอน + template / script |
| **Agents** | `.github/agents/<name>.agent.md` | เมื่อเลือกจาก agent picker | บทบาทที่ต้องกำหนด tools / guardrails เช่น reviewer |

**Instructions** วางกติกา → **Skills** ทำ workflow ซ้ำได้ → **Agents** รวม tools + กติกาเป็นบทบาทเดียว

Skill โหลด 3 ระดับ — เป็นชั้น On-demand ของเทคนิค 3:

1. `name` + `description` อยู่ใน context ตลอด (สั้นมาก)
2. เนื้อหา `SKILL.md` โหลดเมื่องานตรง `description`
3. ไฟล์ประกอบ อ่านเมื่อขั้นตอนอ้างถึง

`description` คือตัว trigger — เขียนให้ชัดว่า "ใช้เมื่อไร" · `name` ต้องตรงชื่อโฟลเดอร์ · ใช้แทน prompt file (`*.prompt.md`) เดิมได้

อ้างอิง: <https://awesome-copilot.github.com/learning-hub/what-are-agents-skills-instructions/>

## ก่อนเริ่ม

```bash
git fetch origin
git stash -u
git checkout lab-bonus
npm test
```

> branch นี้เริ่มจาก baseline ปกติ (`main`) — ยังไม่มีโฟลเดอร์ `.github/` · กฎใบเบิกเดิมอยู่ที่ `src/claims/validate.ts` (ใช้ `ValidationError` จาก `src/errors.ts`) และยอดรวมคำนวณด้วย `calcTotal()` ใน `src/claims/total.ts`

## โจทย์ (ทำทีละข้อ · session ใหม่ต่อข้อ)

1. **A · สร้าง skill (8 นาที)** — ให้ Agent เขียน `.github/skills/add-claim-rule/SKILL.md` ที่มี `name` · `description` · ขั้นตอน ≤ 20 บรรทัด (แผน → test ที่ fail ก่อน → แก้ → `npm test`) · อ่านแล้วแก้เองให้สั้นและตรง
2. **B · เรียกด้วย `/` (8 นาที)** — พิมพ์ `/add-claim-rule` แล้วสั่งกฎใหม่: ใบเบิกหมวด `meal` ยอดรวมต้องไม่เกิน 1,500 บาท — ดูว่า agent ทำตามขั้นใน `SKILL.md` เอง (เสนอแผน → เขียน test → แก้ → รัน test)
3. **C · ให้ agent หาเอง (6 นาที)** — session ใหม่ **ไม่พิมพ์ `/`** สั่งกฎ: ใบเบิกหมวด `hotel` ต้องมี `receiptUrl` ทุกใบ — เช็คใน chat ว่า agent อ่าน `SKILL.md` ก่อนลงมือ ถ้าไม่ ให้ปรับ `description` ให้ตรงงานขึ้น แล้วลองใหม่
4. **D · Bonus: custom agent (3 นาที)** — สร้าง `.github/agents/claim-reviewer.agent.md` (review diff อ่านอย่างเดียว) แล้วเลือก agent นี้ใน picker ให้ review diff ที่ยังไม่ commit

จด prompts · agent steps · tokens ของ B และ C แล้วเทียบกับ Lab 8 — prompt ควรสั้นลง แต่ผลผ่าน checklist ครบเท่าเดิม

## Checklist (5 ข้อ)

- [ ] `name` ตรงชื่อโฟลเดอร์ · `description` บอกว่า "ใช้เมื่อไร"
- [ ] `SKILL.md` ≤ 20 บรรทัด ครอบ แผน · test ก่อน · scope · `npm test`
- [ ] B: agent ทำตามขั้นใน skill จน `npm test` ผ่าน
- [ ] C: agent ใช้ skill เองโดยไม่ต้องพิมพ์ `/`
- [ ] prompt ของ B / C สั้นกว่า Lab 8 แต่ผ่าน checklist ครบ

## Prompt พร้อมใช้ (GitHub Copilot) — สไลด์ 70

**Mode:** Agent · **Skill:** `.github/skills/<ชื่อ>/SKILL.md` · **Session:** ใหม่ ต่อข้อ

> เลือก code block ที่ระบุ platform ให้ตรงกับ GitHub Copilot Chat หรือ GitHub Copilot CLI แล้วคัดลอกไปใช้ได้ทันที
>
> **เพิ่ม context file:** ใน Chat พิมพ์ `#` แล้วเลือกไฟล์ หรือกด `+` → **Files**; ใน CLI อ้างไฟล์ใน prompt ด้วย `@path` (เช่น `@src/claims/validate.ts`). ตรวจให้แน่ใจว่าไฟล์ที่ระบุใน prompt ถูกเพิ่มเป็น context ก่อนส่ง

### A · สร้าง skill

```text
[Lab 9-A]
สร้าง .github/skills/
  add-claim-rule/SKILL.md
front matter:
  name: add-claim-rule
  description: ใช้เมื่อเพิ่ม
    หรือแก้กฎ validation ใบเบิก
ขั้นตอน ≤ 20 บรรทัด:
1) เสนอแผน ≤ 3 ขั้น รอยืนยัน
2) test ที่ fail ก่อนใน
   tests/validate.test.ts
3) แก้ src/claims/validate.ts
   ใช้ ValidationError เดิม
   ห้ามเพิ่ม dependency
4) npm test → diff + ผล test
ดู style จาก
src/claims/validate.ts
```

ตัวอย่าง `SKILL.md` ที่ได้ (ประมาณนี้):

```markdown
---
name: add-claim-rule
description: ใช้เมื่อเพิ่ม/แก้กฎ validation ของใบเบิก (src/claims/validate.ts)
---
# เพิ่มกฎใบเบิก
1. เสนอแผน ≤ 3 ขั้น แล้วรอยืนยัน
2. เขียน test ที่ fail ก่อนใน tests/validate.test.ts
3. แก้ src/claims/validate.ts ใช้ ValidationError เดิม · ห้ามเพิ่ม dependency
4. รัน npm test → ตอบ diff + ผล test
```

### B · เรียก skill

ใน GitHub Copilot Chat ใช้ slash command:
```text
[Lab 9-B]
/add-claim-rule
กฎ: ใบเบิกหมวด meal
  ยอดรวมต้องไม่เกิน 1,500 บาท
  เกิน → ValidationError
  ใช้ calcTotal() เดิม
Done when: test 1,500 ผ่าน
  · 1,500.01 ไม่ผ่าน
  · หมวดอื่นไม่กระทบ
  และ npm test ผ่าน
```

ใน GitHub Copilot CLI อ้าง skill file ใน prompt:
```text
[Lab 9-B]
ใช้ skill add-claim-rule จาก
@.github/skills/add-claim-rule/SKILL.md
กฎ: ใบเบิกหมวด meal
  ยอดรวมต้องไม่เกิน 1,500 บาท
  เกิน → ValidationError
  ใช้ calcTotal() เดิม
Done when: test 1,500 ผ่าน
  · 1,500.01 ไม่ผ่าน
  · หมวดอื่นไม่กระทบ
  และ npm test ผ่าน
```

### C · ให้ agent หาเอง

```text
[Lab 9-C]
ใบเบิกหมวด hotel ต้องมี
receiptUrl ทุกใบ
ค้นหาและใช้ skill ที่เกี่ยวข้องใน
.github/skills/ ก่อนเริ่มทำงาน
เสนอแผนแล้วเขียน test ก่อนแก้โค้ด
รัน npm test และรายงานผล
```

### D · Custom agent

```text
[Lab 9-D]
สร้าง .github/agents/
  claim-reviewer.agent.md
ตั้งค่าให้เป็น reviewer แบบอ่านอย่างเดียว
review diff ที่ยังไม่ commit
ห้ามแก้ไฟล์ ตอบไม่เกิน 5 ข้อ
```

ตัวอย่าง `claim-reviewer.agent.md` (ชื่อ tool ให้ดูจาก Configure Tools ในเวอร์ชันของคุณ):

```markdown
---
description: Review diff ของ expense-claim-api อ่านอย่างเดียว
tools: ['search', 'changes', 'problems']
---
คุณคือ reviewer ของทีม
- ห้ามแก้ไฟล์ ห้ามรันคำสั่ง
- ตรวจ scope · test · secret
- ตอบ ≤ 5 ข้อ เรียงตามความเสี่ยง
```

ไม่เห็น `/add-claim-rule` → Reload Window · ตรวจ path `.github/skills/<name>/SKILL.md` และ `name` ตรงชื่อโฟลเดอร์ · VS Code บางเวอร์ชันต้องเปิด setting `chat.useAgentSkills` ก่อน

## บันทึก (ไม่นับใน scoreboard /45)

| ข้อ | Prompts | Agent steps | Tokens | นาที |
|---|---|---|---|---|
| B | | | | |
| C | | | | |
| Lab 8 (เทียบ) | | | | |

## หลังทำ

commit `.github/skills/` เข้า repo ของทีม → ทุกคนใช้ workflow เดียวกัน · ดูใน platform ว่า prompt ที่สั้นลงยังมี plan / test ครบ (`bp_plan_first` · `bp_asks_tests`)
