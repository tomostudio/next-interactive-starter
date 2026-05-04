# Checklist: flow-breakdown-feature

## Sebelum Mulai

- [ ] Baca `docs/MAIN_PRD.md` untuk memahami scope aplikasi
- [ ] Cek `docs/features/REGISTRY.md` — pastikan fitur belum terdaftar
- [ ] Tentukan feature slug (kebab-case, `{domain}-{action}`)

## PRD.md

- [ ] Overview: deskripsi singkat fitur
- [ ] Problem Statement: masalah yang diselesaikan
- [ ] Goals: tujuan yang ingin dicapai (measurable)
- [ ] Non-Goals: apa yang tidak dikerjakan (dan kenapa)
- [ ] User Stories: format "Sebagai X, saya ingin Y"
- [ ] Acceptance Criteria: checklist verifikasi

## TRD.md

- [ ] Data Model: tabel/field baru atau yang berubah
- [ ] API Contract Overview: method, endpoint, deskripsi
- [ ] Task Breakdown — Slicing & API Contract
- [ ] Task Breakdown — Backend
- [ ] Task Breakdown — Integrasi

## Registry

- [ ] Entry baru ditambahkan ke `docs/features/REGISTRY.md`
- [ ] Format: `| FT-XXX | slug | Nama Fitur | Planned |`

## Finalisasi

- [ ] Folder `docs/features/{slug}/` ada dan berisi PRD.md + TRD.md
- [ ] Semua file diakhiri newline (EOF)
- [ ] Tidak ada bagian yang masih berupa placeholder (`TODO`, `...`, `TBD`)
