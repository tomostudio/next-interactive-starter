# Checklist: flow-task-completion

## Setup

- [ ] Baca GitHub issue / Jira tiket secara penuh
- [ ] Identifikasi tipe task (slicing / backend / integrasi / dll.)
- [ ] Baca PRD.md + TRD.md feature yang sesuai
- [ ] Checkout branch baru dari `main`

## Implementasi

- [ ] Buat checklist task detail di awal
- [ ] Ikuti skill yang sesuai dengan tipe task
- [ ] Ceklis setiap subtask segera setelah selesai
- [ ] Hapus import/variable/function yang jadi unused karena perubahan ini

## Test

- [ ] Tulis atau update test yang relevan
- [ ] Jalankan `bun run test` — semua pass
- [ ] Jalankan `bun run typecheck` — tidak ada error TypeScript

## Commit & PR

- [ ] `git status` — tidak ada file tidak seharusnya di-stage
- [ ] Commit dengan pesan yang sesuai konvensi
- [ ] Push branch dan buat PR
- [ ] PR title: `[{JIRA_KEY}] {summary}`
- [ ] PR body: link Jira + GitHub issue + daftar perubahan

## Post-PR

- [ ] Jira: pindah tiket ke `In Review`
- [ ] GitHub issue: tambah comment dengan link PR
