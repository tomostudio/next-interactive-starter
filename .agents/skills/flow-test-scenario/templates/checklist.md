# Checklist: Flow Test Scenario

## Persiapan

- [ ] Baca `.agents/settings.json` (jira.projectKey, repo)
- [ ] Baca `references/context.md`
- [ ] Baca `docs/features/{slug}/PRD.md` — catat semua acceptance criteria dan user stories
- [ ] Baca `docs/features/{slug}/TRD.md` atau API contract — catat endpoint, validasi, error codes
- [ ] Cek REGISTRY.md untuk link Notion fitur (jika ada, test scenario jadi child page-nya)

## Tulis Test Scenario (Lokal)

- [ ] File `docs/features/{slug}/TEST_SCENARIO.md` dibuat
- [ ] Header: nama fitur, feature slug, JIRA key, versi, tanggal
- [ ] Suite **Happy Path**: semua user story punya minimal 1 TC
- [ ] Suite **Validasi & Error**: semua field wajib + semua error code di TRD punya TC
- [ ] Suite **Edge Case**: data kosong, duplikat, batas nilai
- [ ] Suite **UI/UX State**: loading, empty state, error state
- [ ] Semua acceptance criteria di PRD ter-cover minimal 1 TC
- [ ] Setiap TC punya: ID, nama, precondition, steps, expected result
- [ ] Nomor TC berurutan (TC-001, TC-010, TC-020, TC-030 per suite)
- [ ] File diakhiri newline (EOF)

## Upload ke Notion

- [ ] Halaman Notion dibuat
- [ ] Title: `[{JIRA_KEY}] Test Scenario — {Nama Fitur}`
- [ ] Parent: halaman Notion fitur (dari REGISTRY.md) atau workspace root
- [ ] Tabel test case dibuat dengan kolom: ID, Test Case, Precondition, Steps, Expected, Status, Notes
- [ ] Semua TC dari `TEST_SCENARIO.md` sudah masuk ke tabel Notion
- [ ] Kolom Status default: ⬜ Belum (untuk semua row)
- [ ] Link Notion disalin untuk langkah selanjutnya

## Update Jira

- [ ] Identifikasi tiket Jira yang relevan (tiket Backend atau tiket induk)
- [ ] Komentar ditambahkan dengan link Notion + summary coverage (jumlah TC per suite)

## Update GitHub Issue

- [ ] Identifikasi GitHub issue yang sesuai
- [ ] Komentar ditambahkan dengan link Notion + summary coverage dalam format markdown

## Update Registry

- [ ] Kolom `Test Scenario` ditambahkan (atau diisi) di entry fitur di `docs/features/REGISTRY.md`
- [ ] Link Notion test scenario valid dan bisa diakses
