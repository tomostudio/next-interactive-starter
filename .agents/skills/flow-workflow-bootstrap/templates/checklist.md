# Checklist: flow-workflow-bootstrap

## Prasyarat

- [ ] PRD.md ada di `docs/features/{slug}/PRD.md`
- [ ] TRD.md ada di `docs/features/{slug}/TRD.md`
- [ ] Feature terdaftar di `docs/features/REGISTRY.md`
- [ ] `.agents/settings.json` sudah diisi (repo, jira key)

## Notion

- [ ] Halaman Notion dibuat dengan konten PRD.md
- [ ] Link Notion disimpan ke REGISTRY.md

## Jira

- [ ] Tiket 1: Slicing & API Contract dibuat
- [ ] Tiket 2: Backend Implementation dibuat
- [ ] Tiket 3: API Integration (FE) dibuat
- [ ] Semua tiket punya description + labels yang sesuai
- [ ] Jira issue IDs disimpan ke REGISTRY.md

## GitHub

- [ ] Issue slicing dibuat di monorepo
- [ ] Issue backend dibuat di monorepo
- [ ] Issue integrasi dibuat di monorepo
- [ ] Setiap issue punya link ke Jira tiket yang sesuai
- [ ] GitHub issue numbers disimpan ke REGISTRY.md

## Finalisasi

- [ ] REGISTRY.md sudah lengkap: Jira + GitHub + Notion links
- [ ] Status fitur diupdate dari `Planned` → `In Progress`
