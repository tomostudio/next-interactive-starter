# Context: Skill Creator

## Folder Target

```
.agents/skills/{skill-name}/
├── SKILL.md
├── references/
│   └── context.md
├── templates/
│   └── checklist.md
└── agents/
    └── openai.yaml         → metadata Codex/OpenAI

.claude/skills/{skill-name}/
└── SKILL.md              → Claude wrapper (pointer ke source of truth)
```

## File yang Dimodifikasi

```
.agents/skills/manifest.json   → tambah entry skill baru
.agents/AGENTS.md              → tambah ke Skill Registry + referensi SKILL
CLAUDE.md                      → tambah ke Skill Registry table
```

## Commands

```bash
bun run skills:create -- --name {scope}-{capability} --scope {scope} --description "{deskripsi}" --when "{kapan dipakai}"
bun run skills:sync-registry
bun run skills:sync-claude
bun run skills:sync
bun run skills:validate
```

## Naming Convention

| Komponen | Format | Contoh |
|---|---|---|
| Folder skill | `{scope}-{capability}` | `web-slicing`, `flow-breakdown-feature` |
| Scope | `frontend`, `backend`, `docs`, `ops`, `flow`, `meta` | `meta` |
| Deskripsi | Kalimat aktif, kapan dipakai + output | "Membuat skill baru dari nol..." |

## Scope yang Tersedia

| Scope | Dipakai Untuk |
|---|---|
| `frontend` | Skill yang menyentuh `apps/web/` |
| `backend` | Skill yang menyentuh `apps/api/` atau `apps/worker/` |
| `docs` | Skill yang menghasilkan dokumentasi |
| `ops` | Skill infra/deploy (Dockerfile, CI/CD) |
| `flow` | Skill orchestration (JIRA, GitHub, PRD/TRD) |
| `meta` | Skill yang mengatur agent system itu sendiri |

## Pattern `SKILL.md` (Template Minimal)

```markdown
---
name: {skill-name}
description: {Deskripsi satu kalimat}
---

# Skill: {Judul}

## Context Cepat (Wajib)
- Folder scope + contoh kode: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

{Paragraf tujuan}

## Alur Kerja

1. ...
2. ...

## Larangan

- **DILARANG** ...

## Checklist Sebelum Selesai

- [ ] ...
- [ ] Semua file diakhiri newline (EOF)
```

## Pattern Claude Wrapper (`.claude/skills/{name}/SKILL.md`)

```markdown
---
name: "{skill-name}"
description: "{Deskripsi satu kalimat}"
---

Source of truth ada di `.agents/skills/{skill-name}/SKILL.md`.

Saat skill ini dipakai:
1. Baca `.agents/skills/{skill-name}/SKILL.md`.
2. Ikuti workflow dan aturan di file tersebut.
3. Baca file turunan yang direferensikan (`references/context.md`, `templates/checklist.md`) dari folder source of truth.
```

## Pattern `agents/openai.yaml`

```yaml
interface:
  display_name: "{Judul Pendek Skill}"
  short_description: "{Deskripsi singkat untuk picker skill}"
  default_prompt: "Use $skill-name to {hasil utama skill ini}."
policy:
  allow_implicit_invocation: true
```

## Pattern Entry `manifest.json`

```json
{
  "name": "{skill-name}",
  "description": "{Deskripsi satu kalimat}",
  "scope": "{scope}",
  "whenToUse": "{Teks Skill Registry}",
  "path": ".agents/skills/{skill-name}"
}
```

## Contoh Skill yang Sudah Ada (Referensi)

| Skill | Scope | Lihat di |
|---|---|---|
| `web-slicing` | frontend | `.agents/skills/web-slicing/` |
| `api-feature` | backend | `.agents/skills/api-feature/` |
| `flow-breakdown-feature` | flow | `.agents/skills/flow-breakdown-feature/` |
| `docs-openapi` | docs | `.agents/skills/docs-openapi/` |
