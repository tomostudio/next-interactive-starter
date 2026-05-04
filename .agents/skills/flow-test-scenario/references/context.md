# Context: Flow Test Scenario

## Folder & File

```
docs/features/{slug}/
└── TEST_SCENARIO.md     → dokumen test scenario lokal (source of truth)

docs/features/REGISTRY.md → tambahkan link Notion test scenario
```

## Sumber Data untuk Test Case

| Sumber | Dapat dari |
|---|---|
| Acceptance Criteria | `docs/features/{slug}/PRD.md` — section Acceptance Criteria |
| User Stories | `docs/features/{slug}/PRD.md` — section User Stories |
| Endpoint & validasi | `docs/features/{slug}/TRD.md` atau `docs/api-contracts/` |
| Error codes | TRD / `apps/api/src/domain/errors/` |
| Non-Goals | PRD — untuk memastikan scope tidak melebar |

## Format `TEST_SCENARIO.md`

```markdown
# Test Scenario: {Nama Fitur}

Feature: `{feature-slug}`
Jira: {JIRA_KEY}
Versi: 1.0
Tanggal: {YYYY-MM-DD}

---

## Happy Path

| ID | Test Case | Precondition | Steps | Expected |
|---|---|---|---|---|
| TC-001 | User berhasil [aksi utama] | User sudah login, data valid | 1. Buka halaman X<br>2. Isi form<br>3. Submit | Muncul notifikasi sukses, data tersimpan |
| TC-002 | ... | ... | ... | ... |

---

## Validasi & Error

| ID | Test Case | Precondition | Steps | Expected |
|---|---|---|---|---|
| TC-010 | Submit form dengan field kosong | — | 1. Buka halaman X<br>2. Klik Submit tanpa isi | Muncul pesan error validasi per field |
| TC-011 | Akses tanpa login | User belum login | 1. Akses URL halaman X langsung | Redirect ke halaman login (401) |
| TC-012 | Data tidak ditemukan | — | 1. Akses `/resource/id-tidak-ada` | Tampil pesan "Data tidak ditemukan" (404) |

---

## Edge Case

| ID | Test Case | Precondition | Steps | Expected |
|---|---|---|---|---|
| TC-020 | ... | ... | ... | ... |

---

## UI/UX State

| ID | Test Case | Precondition | Steps | Expected |
|---|---|---|---|---|
| TC-030 | Loading state saat fetch data | Koneksi lambat (throttle) | 1. Buka halaman X | Skeleton/spinner tampil selama loading |
| TC-031 | Empty state saat data kosong | Tidak ada data di database | 1. Buka halaman daftar | Muncul ilustrasi/pesan "Belum ada data" |
| TC-032 | Error state saat API gagal | Server error (500) | 1. Buka halaman X | Muncul pesan error + tombol retry |
```

## Format Tabel di Notion

Buat sebagai Notion database (atau tabel sederhana) dengan kolom:

| Kolom | Tipe | Keterangan |
|---|---|---|
| ID | Text | TC-001, TC-002, dst |
| Test Case | Title | Nama singkat test |
| Precondition | Text | Kondisi awal |
| Steps | Text | Numbered steps |
| Expected | Text | Hasil yang diharapkan |
| Status | Select | ⬜ Belum, ✅ Pass, ❌ Fail, ⏭️ Skip |
| Notes | Text | Catatan QA (opsional) |

## Template Komentar Jira

```
🧪 Test Scenario tersedia di Notion:
https://notion.so/...

Coverage: {N} test case
- Happy Path: {n} TC
- Validasi & Error: {n} TC
- Edge Case: {n} TC
- UI/UX State: {n} TC
```

## Template Komentar GitHub Issue

```markdown
## 🧪 Test Scenario

Test scenario manual QA sudah dibuat dan tersedia di Notion:
[{JIRA_KEY} Test Scenario — {Nama Fitur}](https://notion.so/...)

**Coverage:** {N} test case
- Happy Path: {n} TC
- Validasi & Error: {n} TC
- Edge Case: {n} TC
- UI/UX State: {n} TC
```

## MCP yang Dibutuhkan

| MCP | Dipakai Untuk |
|---|---|
| `notion` | Buat halaman + tabel test scenario |
| `atlassian` | Tambah komentar di tiket Jira |
| `github` | Tambah komentar di GitHub issue |

## Kapan Skill Ini Dijalankan

- Setelah API Contract selesai (TRD/contract sudah lengkap)
- Bisa paralel dengan task Backend — tidak perlu tunggu implementasi selesai
- Idealnya selesai sebelum fase integrasi dimulai, agar QA bisa mulai prepare
