---
name: flow-workflow-bootstrap
description: Menjalankan bootstrap work item Jira dan GitHub dari dokumen PRD/TRD feature. Gunakan setelah flow-breakdown-feature selesai dan perlu pembuatan tiket delivery secara terstruktur.
---

# Skill: Flow Workflow Bootstrap

## Context Cepat (Wajib)
- Folder fitur: `docs/features/{feature-slug}/`
- Registry: `docs/features/REGISTRY.md`
- Settings: `.agents/settings.json` (repo monorepo, jira project key, branch format)

## Prasyarat

1. PRD sudah ada di `docs/features/{slug}/PRD.md`
2. TRD sudah ada di `docs/features/{slug}/TRD.md`
3. Feature terdaftar di `docs/features/REGISTRY.md`
4. MCP tersedia: `atlassian`, `github`, `notion`

## Alur Kerja

### 1. Upload PRD ke Notion
- Buat halaman baru di Notion dengan konten dari `PRD.md`
- Title: nama fitur
- Simpan link Notion ke REGISTRY.md entry

### 2. Buat Tiket Jira
Buat 3 tiket terpisah sesuai task breakdown di TRD:

**Tiket 1: Slicing + API Contract**
- Summary: `[FT-XXX] {Nama Fitur} — Slicing & API Contract`
- Type: Story
- Description: task slicing + daftar endpoint dari TRD

**Tiket 2: Backend**
- Summary: `[FT-XXX] {Nama Fitur} — Backend Implementation`
- Type: Story
- Description: task backend dari TRD (Prisma, use cases, repositories, routes)

**Tiket 3: Integrasi**
- Summary: `[FT-XXX] {Nama Fitur} — API Integration (FE)`
- Type: Story
- Description: task integrasi dari TRD (hooks, halaman)

### 3. Buat GitHub Issues
Satu issue per tiket Jira, semuanya di monorepo yang sama:
- Slicing & API Contract → repo GitHub monorepo (`repo`)
- Backend → repo GitHub monorepo (`repo`)
- API Integration (FE) → repo GitHub monorepo (`repo`)

Format issue title: `[{JIRA_KEY}] {Summary tiket}`

Format branch yang akan dibuat (untuk referensi di issue):
`feature/{JIRA_KEY}-{deskripsi-singkat}`

### 4. Update Registry
Tambahkan link Jira + GitHub ke entry di REGISTRY.md.

## Format Branch

Lihat `branch.format` di `.agents/settings.json`:
- `feature/{JIRA_KEY}-{slug}` — contoh: `feature/KM-123-payment-gateway-slicing`

## Larangan

- **DILARANG** membuat tiket atau issue tanpa sumber dari PRD/TRD final.
- **DILARANG** membuat issue di luar monorepo yang dikonfigurasi.
- **DILARANG** membiarkan REGISTRY tidak sinkron setelah link Notion, Jira, atau GitHub dibuat.

## Checklist Sebelum Selesai

- [ ] PRD, TRD, dan REGISTRY sudah valid sebelum bootstrap
- [ ] Halaman Notion sudah dibuat dan link-nya dicatat
- [ ] Tiga tiket Jira sudah dibuat sesuai breakdown
- [ ] GitHub issues sudah dibuat di repo yang benar
- [ ] REGISTRY sudah diperbarui lengkap dengan link terkait
