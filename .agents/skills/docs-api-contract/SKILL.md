---
name: docs-api-contract
description: Menyusun API contract FE-BE dari PRD/TRD, flow halaman, atau desain. Gunakan saat perlu endpoint list, request-response schema, validasi, dan error contract yang konsisten.
---

# Skill: Docs API Contract

## Context Cepat (Wajib)
- Output: `docs/api-contracts/{feature-slug}.md`
- Baca TRD fitur: `docs/features/{slug}/TRD.md`

Hasil akhir skill ini adalah satu contract dokumen yang bisa dipakai FE dan BE tanpa menebak shape request, response, atau error.

## Alur Kerja

1. Baca TRD untuk mendapatkan daftar endpoint yang direncanakan
2. Untuk setiap endpoint, tentukan:
   - Method + path
   - Path/query params
   - Request body (Zod-compatible shape)
   - Response body sukses
   - Kemungkinan error responses
3. Tulis ke `docs/api-contracts/{slug}.md`
4. Update TRD jika ada perubahan dari yang direncanakan

## Format Dokumen

```markdown
# API Contract: {Nama Fitur}

## Base URL
`/api/v1`

## Endpoints

### POST /payments/initiate

**Request Body**
| Field      | Type   | Required | Notes              |
|------------|--------|----------|--------------------|
| order_id   | string | ✅       | UUID format        |
| method     | string | ✅       | Enum: lihat bawah  |
| amount     | number | ✅       | dalam Rupiah       |

Method enum: `CREDIT_CARD`, `BANK_TRANSFER`, `EWALLET`

**Response 200**
\`\`\`json
{
  "data": {
    "payment_id": "uuid",
    "redirect_url": "https://...",
    "expires_at": "2024-01-01T00:00:00Z"
  }
}
\`\`\`

**Error Responses**
| Status | Code        | Deskripsi              |
|--------|-------------|------------------------|
| 404    | NOT_FOUND   | Order tidak ditemukan  |
| 409    | CONFLICT    | Order sudah dibayar    |
| 422    | VALIDATION  | Field tidak valid      |

---

### GET /payments/:id/status

**Path Params**
| Param | Type   | Notes    |
|-------|--------|----------|
| id    | string | Payment UUID |

**Response 200**
\`\`\`json
{
  "data": {
    "id": "uuid",
    "status": "PAID",
    "paid_at": "2024-01-01T00:00:00Z"
  }
}
\`\`\`
```

## Aturan

- Semua response sukses dibungkus `{ "data": ... }` atau `{ "list": [...], "meta": { ... } }`
- Semua error mengikuti format `ErrorResponse` dari `packages/types/`
- Enum harus didefinisikan eksplisit (bukan cuma "string")
- Pagination response gunakan `DataTableResponse<T>` shape

## Larangan

- **DILARANG** menulis field request/response dengan tipe generik seperti "object" tanpa shape rinci.
- **DILARANG** membiarkan enum implisit jika nilainya sudah diketahui.
- **DILARANG** mencampur keputusan implementasi internal yang tidak memengaruhi contract publik.
- **DILARANG** menyisakan placeholder seperti `TODO`, `TBD`, atau `...`.

## Checklist Sebelum Selesai

- [ ] Semua endpoint yang relevan dari TRD tercakup
- [ ] Request params dan body sudah lengkap
- [ ] Response sukses memakai shape standar repo
- [ ] Error responses punya status, code, dan deskripsi
- [ ] Contract disimpan di `docs/api-contracts/{slug}.md`
- [ ] TRD diperbarui jika contract final berbeda dari rencana awal
- [ ] Semua file diakhiri newline (EOF)
