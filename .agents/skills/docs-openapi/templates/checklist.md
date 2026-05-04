# Checklist: docs-openapi

## Persiapan

- [ ] Baca API contract di `docs/api-contracts/{slug}.md`
- [ ] Cek `docs/openapi/components/` — apakah schema/response yang dibutuhkan sudah ada?

## File Paths

- [ ] Buat `docs/openapi/paths/{feature-slug}.yaml`
- [ ] Semua endpoint fitur tercakup
- [ ] Parameter (path, query, body) terdefinisi lengkap
- [ ] Response sukses punya schema yang benar
- [ ] Response error menggunakan shared `$ref` dari components/responses/

## Schema Components

- [ ] Buat schema entity baru jika belum ada di `components/schemas/`
- [ ] Tidak ada duplikasi — gunakan `$ref` jika schema sudah ada
- [ ] Semua field punya tipe yang benar (string, integer, boolean, dll.)
- [ ] `required` array berisi field yang wajib ada

## Entry File

- [ ] `docs/openapi/openapi.yaml` diupdate dengan `$ref` ke path baru
- [ ] Schema baru didaftarkan di `components.schemas`
- [ ] File bisa di-parse oleh Swagger/Redoc tanpa error

## Finalisasi

- [ ] Semua file diakhiri newline (EOF)
- [ ] Tidak ada placeholder yang tersisa
