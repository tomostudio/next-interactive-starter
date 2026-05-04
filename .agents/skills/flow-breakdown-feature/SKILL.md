---
name: flow-breakdown-feature
description: Memecah ide fitur menjadi PRD dan TRD lengkap plus Feature ID terdaftar. Gunakan saat fitur baru belum terdokumentasi dan belum masuk registry.
---

# Skill: Flow Breakdown Feature

## Context Cepat (Wajib)
- Folder output: `references/context.md`
- Checklist: `templates/checklist.md`

Ubah ide fitur menjadi dokumen PRD dan TRD yang siap dieksekusi tim.

## Alur Kerja

1. Tentukan feature slug: `{domain}-{action}` — misal `user-management`, `payment-gateway`
2. Buat folder: `docs/features/{feature-slug}/`
3. Tulis `PRD.md`: overview, problem, goals, non-goals, user stories, acceptance criteria
4. Tulis `TRD.md`: data model, API contract overview, task breakdown (slicing, BE, integrasi)

## Larangan

- **DILARANG** membuat PRD/TRD yang masih berisi placeholder seperti `TODO`, `TBD`, atau `...`.
- **DILARANG** menuliskan task breakdown yang tidak bisa dipetakan ke owner atau deliverable.
- **DILARANG** mendaftarkan fitur duplikat dengan slug berbeda untuk ruang lingkup yang sama.

## Checklist Sebelum Selesai

- [ ] Feature slug ditentukan (kebab-case)
- [ ] Folder `docs/features/{slug}/` dibuat
- [ ] PRD.md: overview + problem + goals + non-goals
- [ ] PRD.md: user stories + acceptance criteria
- [ ] TRD.md: data model
- [ ] TRD.md: API contract overview
- [ ] TRD.md: task breakdown (slicing, BE, integrasi)
- [ ] Semua file diakhiri newline (EOF)
