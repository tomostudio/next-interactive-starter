# Checklist: Skill Add Example

## Persiapan

- [ ] Baca `.agents/settings.json`
- [ ] Baca `references/context.md`
- [ ] Identifikasi skill target yang akan memakai example ini
- [ ] Tentukan nama example (kebab-case, deskriptif)
- [ ] Cek apakah example serupa sudah ada di `.agents/examples/{skill-name}/`

## Tentukan Lokasi

- [ ] Folder skill: `.agents/examples/{skill-name}/`
- [ ] Subfolder konteks ditentukan (framework/domain, misal: `nextjs-app-router`, `hooks`)
- [ ] Folder example dibuat: `.agents/examples/{skill-name}/{subfolder}/{example-name}/`

## Tulis File Example

- [ ] Kode bersumber dari codebase nyata atau pattern yang sudah disepakati
- [ ] Business logic spesifik diganti placeholder yang jelas
- [ ] Tidak ada secret, token, atau data sensitif
- [ ] Komentar di baris pertama: `// Example: {deskripsi singkat}`
- [ ] Struktur file mengikuti konvensi skill terkait

## Update Referensi Skill

- [ ] Buka `references/context.md` di skill terkait
- [ ] Tambahkan entry `### Example N — {Nama}` dengan: lokasi, pattern, daftar file, kapan digunakan
- [ ] Nomor example berurutan (tidak ada gap)
- [ ] `SKILL.md` di skill terkait diupdate jika ada referensi eksplisit ke contoh

## Validasi Akhir

- [ ] Path lokasi example konsisten di semua referensi
- [ ] File bisa langsung dijadikan template oleh agent
- [ ] Semua file diakhiri newline (EOF)
