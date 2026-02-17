# Decision Log

Use this file for significant operating decisions.

## Template

### YYYY-MM-DD — <Decision Title>
- **Decision:**
- **Context:**
- **Alternatives considered:**
- **Trade-offs:**
- **Expected outcome:**
- **Review date:**

---

## 2026-02-16 — Establish Igor Operating Repository
- **Decision:** Create and use a dedicated GitHub repo (`igorinthepi`) as Igor’s operating home.
- **Context:** Need durable versioning for identity, playbooks, and automations across sessions/devices.
- **Alternatives considered:** Keep everything local only; store notes ad hoc.
- **Trade-offs:** Slight setup/maintenance overhead vs much better continuity and recoverability.
- **Expected outcome:** Faster iteration, cleaner memory, easier restore/migration.
- **Review date:** 2026-03-16

## 2026-02-16 — Use SSH for GitHub Pushes
- **Decision:** Standardize on SSH key auth for repo operations from the Pi.
- **Context:** HTTPS push required interactive auth; SSH provides stable non-interactive workflow.
- **Alternatives considered:** HTTPS + PAT/`gh auth` only.
- **Trade-offs:** Key management required vs smoother automated pushes.
- **Expected outcome:** Reliable unattended push/pull workflow.
- **Review date:** 2026-03-16
