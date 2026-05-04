---
name: flow-test-scenario
description: Membuat test scenario manual QA dari PRD/TRD suatu fitur, mengupload hasilnya ke Notion, lalu mengupdate tiket Jira dan GitHub issue dengan link Notion. Gunakan setelah implementasi selesai atau paralel dengan task Backend.
---

# Skill: Flow Test Scenario

## Context Cepat (Wajib)
- Format dokumen + contoh: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Hasilkan dokumen test scenario yang bisa langsung dipakai QA untuk manual testing — berdasarkan acceptance criteria di PRD dan endpoint di TRD/API contract.

## Prasyarat

1. PRD ada di `docs/features/{slug}/PRD.md` — acceptance criteria wajib ada
2. TRD atau API contract ada di `docs/features/{slug}/TRD.md` atau `docs/api-contracts/`
3. MCP `notion`, `atlassian`, dan `github` aktif

## Alur Kerja

### 1. Baca Source of Truth

Baca dokumen berikut sebelum menulis test case apapun:
- `docs/features/{slug}/PRD.md` — fokus pada **Acceptance Criteria** dan **User Stories**
- `docs/features/{slug}/TRD.md` atau API contract — fokus pada endpoint, validasi input, dan error cases
- Jika ada desain/screenshot, pertimbangkan happy path UI

### 2. Identifikasi Coverage Area

Petakan area yang perlu ditest:

| Area | Sumber |
|---|---|
| Happy path per user story | PRD → User Stories |
| Validasi input | TRD → request body / Zod schema |
| Error handling | TRD → error codes + DomainError |
| Edge case | PRD → Non-Goals / batas-batas yang disebut |
| UI state | PRD → Acceptance Criteria (loading, empty, error state) |

### 3. Tulis Test Scenario

Format setiap test case:

```
TC-{nomor}: {Nama test case singkat}
Precondition : {kondisi awal yang harus dipenuhi}
Steps        : 1. ...
               2. ...
               3. ...
Expected     : {hasil yang diharapkan}
```

Kelompokkan test case dalam suite:
- **Happy Path** — alur utama berhasil
- **Validasi & Error** — input tidak valid, unauthorized, not found
- **Edge Case** — batas kondisi, data kosong, data duplikat
- **UI/UX** — loading state, empty state, pesan error ke user

Minimal: semua acceptance criteria di PRD harus punya minimal 1 test case.

### 4. Simpan Lokal

Simpan dokumen test scenario di:
```
docs/features/{slug}/TEST_SCENARIO.md
```

### 5. Upload ke Notion

Buat halaman Notion baru dengan:
- **Title**: `[{JIRA_KEY}] Test Scenario — {Nama Fitur}`
- **Parent**: halaman fitur yang sudah dibuat saat `flow-workflow-bootstrap` (cek REGISTRY.md untuk link Notion-nya), atau buat di workspace root jika belum ada
- **Konten**: salin seluruh isi `TEST_SCENARIO.md` — format tabel untuk test case agar QA mudah ceklis

Format tabel di Notion:

| ID | Test Case | Precondition | Steps | Expected | Status | Notes |
|---|---|---|---|---|---|---|
| TC-001 | ... | ... | ... | ... | ⬜ Belum | |

Kolom **Status** diisi QA: ⬜ Belum / ✅ Pass / ❌ Fail / ⏭️ Skip

### 6. Update Tiket Jira

Tambahkan komentar di tiket Jira yang relevan (biasanya tiket Backend atau tiket induk fitur):

```
🧪 Test Scenario tersedia di Notion:
[link Notion]

Coverage: {jumlah} test case — Happy Path, Validasi, Edge Case, UI State
```

### 7. Update GitHub Issue

Tambahkan komentar di GitHub issue yang sesuai:

```markdown
## 🧪 Test Scenario

Test scenario manual QA sudah dibuat dan tersedia di Notion:
[{JIRA_KEY} Test Scenario — {Nama Fitur}]({link Notion})

**Coverage:** {jumlah} test case
- Happy Path: {n} TC
- Validasi & Error: {n} TC
- Edge Case: {n} TC
- UI/UX State: {n} TC
```

### 8. Update REGISTRY.md

Tambahkan kolom `Test Scenario` di entry fitur di `docs/features/REGISTRY.md`:

```
| FT-001 | payment-gateway | ... | [Test Scenario]({link Notion}) |
```

## Larangan

- **DILARANG** menulis test case tanpa baca PRD/TRD terlebih dahulu.
- **DILARANG** hanya nulis happy path — validasi dan error case wajib ada.
- **DILARANG** upload ke Notion sebelum dokumen lokal di `TEST_SCENARIO.md` selesai.
- **DILARANG** skip update Jira dan GitHub issue setelah upload.

## Checklist Sebelum Selesai

- [ ] PRD dan TRD/API contract sudah dibaca
- [ ] Semua acceptance criteria di PRD punya minimal 1 test case
- [ ] Happy path, validasi/error, edge case, UI state tercakup
- [ ] `docs/features/{slug}/TEST_SCENARIO.md` dibuat lokal
- [ ] Halaman Notion dibuat dengan tabel test case (kolom: ID, Test Case, Precondition, Steps, Expected, Status, Notes)
- [ ] Komentar ditambahkan di tiket Jira dengan link Notion
- [ ] Komentar ditambahkan di GitHub issue dengan link Notion + summary coverage
- [ ] Link test scenario ditambahkan ke `REGISTRY.md`
- [ ] File lokal diakhiri newline (EOF)
