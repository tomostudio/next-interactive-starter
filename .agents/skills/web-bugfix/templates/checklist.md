# Checklist: Web Bugfix

## Persiapan

- [ ] Baca `.agents/settings.json`
- [ ] Baca `references/context.md`
- [ ] Tuliskan gejala bug atau langkah reproduksi

## Eksekusi

- [ ] Root cause dilokalisasi ke file/area terkecil
- [ ] Perubahan tetap minimal touch
- [ ] Shared schema/types/hooks/constants diupdate jika memang terdampak
- [ ] Tidak ada cleanup/refactor unrelated
- [ ] Test reproduksi atau guard ditambah/diperbarui

## Finalisasi

- [ ] Contract frontend tetap sinkron
- [ ] Lint/type/test relevan dijalankan
- [ ] Tidak ada perubahan unrelated yang ikut terbawa
- [ ] Semua file diakhiri newline (EOF)
