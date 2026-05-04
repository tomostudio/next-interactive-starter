# Checklist: API Bugfix

## Persiapan

- [ ] Baca `.agents/settings.json`
- [ ] Baca `references/context.md`
- [ ] Tuliskan gejala bug atau failing behavior

## Eksekusi

- [ ] Root cause dilokalisasi ke layer terkecil
- [ ] Perubahan tetap minimal touch
- [ ] Validator/DTO/schema/type/docs/OpenAPI diupdate jika memang terdampak
- [ ] Tidak ada refactor unrelated
- [ ] Test reproduksi atau guard ditambah/diperbarui

## Finalisasi

- [ ] Contract backend tetap sinkron
- [ ] `bun run openapi:generate` dijalankan jika contract berubah
- [ ] Lint/type/test relevan dijalankan
- [ ] Tidak ada perubahan unrelated yang ikut terbawa
- [ ] Semua file diakhiri newline (EOF)
