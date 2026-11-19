# Platform Review — ดู tag จริงหลังทำ lab แต่ละอัน

ข้อมูลรวมจาก slide workshop (09:00–16:00) — ทุก lab จบด้วยการ "หลังทำ" ที่เชื่อมกับ **Copilot Enterprise Analytics** (ระบบ analytics ภายใน: collector ดึง GitHub Copilot usage records ทุกชั่วโมง → ทุก prompt ถูก tag → brief รายคน/ทีม)

ระบบมี tag master (`prompt_tag_defs`) **37 ตัว ใน 3 กลุ่ม**:

| กลุ่ม | จำนวน | วัดจาก | เทคนิคที่วัด |
|---|---|---|---|
| `best_practice` (bp_*) | 14 | ตัว prompt เอง (LLM tagger) | 1 Specific Request · 2 Context · 4 Verify First |
| `efficiency` (eff_*) | 15 | การใช้จริงต่อ turn (rule + LLM) | 3 Token Optimization |
| `security` (sec_*) | 8 | scan + tool calls ของ agent | 5 Safe Agent |

## หลังทำแต่ละ lab — ดูอะไรใน platform

| Lab | ดู tag / สัญญาณ | คาดหวัง |
|---|---|---|
| 0 Baseline | ตั้ง productivity marker (pivot day) วันนี้ | เทียบก่อน/หลังของทีมได้ทันที |
| 1 Specific Request | `bp_vague`, `bp_goal_explicit`, `bp_scope_bounded`, `bp_constraints_stated`, `bp_acceptance_criteria` | bp_vague ลด · good tags เพิ่ม |
| 2 Context Engineering | `bp_clear_context`, `bp_relevant_files`, `bp_error_context` / `eff_context_bloat`, `eff_long_session_drift` | good เพิ่ม · bloat/drift ลด |
| 3 Token audit | `eff_low_cache`, `eff_verbose_output_ask`, `eff_flagship_simple`, `eff_model_switch` + est. credits/turn | eff_* ฝั่งเสี่ยงลด · right-sized เพิ่ม |
| 4 Verify First | `bp_plan_first`, `bp_asks_tests`, `bp_asks_review` / `eff_bigbang_request`, `eff_retry_loop` | good เพิ่ม · bigbang/retry ลด |
| 5 Safe Agent | `sec_agent_action`, `sec_secret` (+ `sec_pii`, `sec_prompt_injection`, `sec_risky_code`) | findings ลด + triage ทันวัน |
| 6 Evidence & Output | `bp_repro_steps`, `bp_output_format`, `bp_language_requested` | good tags ขึ้นทุกงานที่มี bug / ต้องการ format |
| 7 Agent Right-Sizing | `eff_effort_overkill`, `eff_subagent_fanout`, `eff_vision_heavy`, `eff_tool_output_bloat` | eff_* ฝั่งเสี่ยงไม่ขึ้นหลังจูน |
| 8 Post-test | เทียบ tag ก่อน/หลังของโจทย์เดิม | marker วันนี้ = pivot day ของทีม |

## หมายเหตุการวัด

- **est. credits เริ่มมีค่าหลังวัน workshop** — rate ราคา (GitHub Docs "Models and pricing", เช็ค 18 พ.ย. 2026) ถูก seed ใน migration `024_efficiency_defaults.sql`; W45–46 ที่ผ่านมายังขึ้น Unknown เพราะยังไม่มี rate
- prompt ที่ใช้ใน workshop เข้าสู่ระบบช้าสุด ~2 วัน (usage records มาสดุด) — ดู tag ได้จริงใน platform ภายใน 1–2 วันหลัง workshop
- tag เป็นสัญญาณเชิงพรรณนา ใช้เพื่อ coaching — ไม่ใช่การประเมินผลงานรายคน
- หลัง workshop 2–4 สัปดาห์: เทียบ W47–W48 กับ W45–46 ด้วยตารางเดียวกับ coaching W46 (`customer/Internal/coaching/2026-W46-prompt-coaching.md`)

## Tag catalog ฉบับเต็ม

- **best_practice (14):** `bp_clear_context` · `bp_vague`(เสี่ยง) · `bp_plan_first` · `bp_asks_tests` · `bp_asks_review` · `bp_goal_explicit` · `bp_scope_bounded` · `bp_constraints_stated` · `bp_output_format` · `bp_acceptance_criteria` · `bp_repro_steps` · `bp_relevant_files` · `bp_error_context` · `bp_language_requested`
- **efficiency (15):** `eff_effort_overkill` · `eff_flagship_simple` · `eff_light_model_struggle` · `eff_bigbang_request` · `eff_context_bloat` · `eff_long_session_drift` · `eff_low_cache` · `eff_model_switch` · `eff_retry_loop` · `eff_subagent_fanout` · `eff_vision_heavy` · `eff_tool_output_bloat` · `eff_verbose_output_ask` · `eff_right_sized`(ดี) · `eff_scoped_steps`(ดี)
- **security (8):** `sec_secret` · `sec_pii` · `sec_insecure_ask` · `sec_prompt_injection` · `sec_agent_action` · `sec_risky_code` · `sec_internal_data` · `sec_risky_prompt`
