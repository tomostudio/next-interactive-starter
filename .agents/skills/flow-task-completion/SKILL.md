---
name: flow-task-completion
description: Menyelesaikan issue GitHub atau task Jira end-to-end dari branching sampai PR dan status update. Gunakan saat user meminta eksekusi task implementasi lengkap berbasis tiket.
---

# Skill: Flow Task Completion

## Context Cepat (Wajib)
- Settings: `.agents/settings.json` (repo, branch format, jira key)
- PRD/TRD: `docs/features/{slug}/`

## Alur Kerja

### 1. Setup Branch
- Buat branch baru mengikuti `.agents/settings.json → branch.format`.
- Jika runtime agent mensyaratkan prefix tertentu, ikuti prefix runtime tersebut di depan nama branch project.
- Jangan mulai dari branch kerja yang tidak relevan dengan tiket.

### 2. Baca Context

Sebelum implementasi, baca:
- `docs/features/{slug}/PRD.md` — acceptance criteria
- `docs/features/{slug}/TRD.md` — task breakdown + API contract
- Skill yang sesuai dengan tipe task:
  - Slicing → `.agents/skills/web-slicing/SKILL.md`
  - API Integrated → `.agents/skills/web-api-integrated/SKILL.md`
  - Backend → `.agents/skills/api-feature/SKILL.md`

### 3. Implementasi

Ikuti skill yang sesuai. Buat checklist task di awal, ceklis setiap item setelah selesai.

Layer target:
- Slicing → `apps/web/app/`
- Hooks → `apps/web/hooks/`
- Backend → `apps/api/src/`
- Worker → `apps/worker/src/`
- Shared → `packages/`

### 4. Test

```bash
# Frontend
cd apps/web && bun run test

# Backend
cd apps/api && bun run test
```

Semua test harus pass sebelum PR.

### 5. Commit & PR

```bash
git add <file-spesifik>
git commit -m "feat({slug}): {deskripsi singkat}"
git push -u origin HEAD
```

Buat PR dengan:
- Title: `[{JIRA_KEY}] {Summary tiket}`
- Body: link ke Jira issue + GitHub issue + checklist yang sudah done

### 6. Update Status

- Jira: pindahkan tiket ke `In Review`
- GitHub issue: tambah comment link PR

## Larangan

- **DILARANG** mengerjakan task tanpa membaca tiket dan acceptance criteria lebih dulu.
- **DILARANG** mencampur scope beberapa tiket dalam satu branch atau satu PR.
- **DILARANG** melakukan refactor opportunistic di luar kebutuhan tiket.
- **DILARANG** membuka PR saat test relevan masih gagal atau belum dijalankan.

## Checklist Sebelum Selesai

- [ ] Tipe task dan skill turunan sudah dipilih dengan benar
- [ ] Perubahan hanya mencakup scope tiket
- [ ] Test relevan sudah dijalankan dan pass
- [ ] Commit dan PR mengikuti format repo
- [ ] Jira dan GitHub issue sudah diperbarui

## Tipe Task & Skill yang Dipakai

| Tipe              | Skill                  | Target Folder         |
|-------------------|------------------------|-----------------------|
| Slicing           | `web-slicing`          | `apps/web/app/`       |
| API Contract      | `docs-api-contract`    | `docs/api-contracts/` |
| API Integrated    | `web-api-integrated`   | `apps/web/hooks/`     |
| Backend           | `api-feature`          | `apps/api/src/`       |
| Prisma Schema     | `db-prisma-schema`     | `apps/api/prisma/`    |
| Worker            | `api-feature`          | `apps/worker/src/`    |
