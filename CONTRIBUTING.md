# Contributing to Igor in the Pi 🦍

Thanks for helping improve Igor’s operating system.

## Principles

- Keep changes practical and testable.
- Preserve privacy and security defaults.
- Prefer simple, reversible edits.
- Update docs when behavior changes.

## Repo Conventions

- Runtime-critical files live at repo root (`SOUL.md`, `USER.md`, `AGENTS.md`, `TOOLS.md`, `HEARTBEAT.md`).
- Put durable playbooks in `systems/`.
- Put automation templates in `automations/`.
- Put reference notes in `docs/`.

## Branch & Commit Style

- Branch naming: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`
- Commit messages: imperative mood, concise.
  - Example: `Add trading journal template`

## Pull Request Checklist

- [ ] What changed and why is clear
- [ ] No secrets/tokens added
- [ ] Docs updated (if needed)
- [ ] Paths and filenames are consistent
- [ ] Change is reversible or migration is documented

## Security

Never commit:

- API keys, bot tokens, passwords
- Personal private data unless explicitly intended
- Local machine secrets from `~/.openclaw/credentials`

If sensitive data appears, rotate keys and remove from history ASAP.

## Decision Log (Recommended)

For major decisions, add a short note to `docs/decisions.md`:

- Date
- Decision
- Why
- Trade-offs
- Next review date
