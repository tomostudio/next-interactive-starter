# Context: Meta Skill Hygiene

## Folder Target

- `.agents/skills/*/SKILL.md` → source of truth nama + deskripsi + workflow skill
- `.agents/skills/*/agents/openai.yaml` → metadata Codex/OpenAI
- `.agents/skills/manifest.json` → registry source of truth (`scope`, `path`, `whenToUse`)
- `.agents/scripts/` → automation untuk create/sync/validate
- `.claude/skills/*/SKILL.md` → generated wrapper dari source of truth
- `.agents/AGENTS.md` dan `CLAUDE.md` → generated registry sections via markers

## Commands

```bash
bun run skills:create -- --name {scope-capability} --scope {scope} --description "{deskripsi}" --when "{kapan dipakai}"
bun run skills:sync
bun run skills:sync-registry
bun run skills:sync-claude
bun run skills:validate
```

## Pattern Penting

- Perubahan registry harus berasal dari `manifest.json`, bukan edit manual table.
- Wrapper Claude harus selalu diregenerate dari `SKILL.md`.
- `openai.yaml` hanya menyimpan metadata interface/policy, bukan instruksi utama skill.
- Validator harus dipakai sebelum merge perubahan di area `.agents/` atau `.claude/`.
