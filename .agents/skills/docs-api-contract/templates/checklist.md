# Checklist: docs-api-contract

## Persiapan

- [ ] Baca TRD fitur yang relevan
- [ ] Identifikasi semua endpoint yang perlu didokumentasikan
- [ ] Tentukan nama file output: `docs/api-contracts/{slug}.md`

## Per Endpoint

- [ ] Method + path lengkap
- [ ] Path params (jika ada) — nama, tipe, keterangan
- [ ] Query params (jika ada) — nama, tipe, default, keterangan
- [ ] Request body — semua field, tipe, required/optional
- [ ] Enum didefinisikan eksplisit (bukan hanya "string")
- [ ] Response sukses — shape lengkap (data / list+meta)
- [ ] Error responses — status code + code + deskripsi

## Validasi Format

- [ ] Single resource response: `{ "data": {...} }`
- [ ] List response: `{ "list": [...], "meta": {...} }`
- [ ] Error response: `{ "error": { "code": "...", "message": "..." } }`
- [ ] Pagination params standar dipakai untuk endpoint list

## Finalisasi

- [ ] File disimpan di `docs/api-contracts/{slug}.md`
- [ ] TRD diupdate jika ada perubahan endpoint dari yang direncanakan
- [ ] File diakhiri newline (EOF)
