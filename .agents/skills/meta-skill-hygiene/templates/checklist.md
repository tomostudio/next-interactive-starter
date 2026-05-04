# Checklist: Meta Skill Hygiene

## Persiapan

- [ ] Baca `.agents/settings.json`
- [ ] Baca `references/context.md`
- [ ] Identifikasi file source of truth yang berubah (`SKILL.md`, `manifest.json`, `openai.yaml`)

## Eksekusi

- [ ] Perubahan utama dilakukan di source of truth, bukan output generated
- [ ] Jalankan `bun run skills:sync`
- [ ] Jika hanya perlu salah satu output, jalankan sync spesifik yang sesuai

## Finalisasi

- [ ] Jalankan `bun run skills:validate`
- [ ] Tidak ada drift antara `manifest.json`, wrapper Claude, dan registry
- [ ] Tidak ada placeholder atau marker section yang rusak
- [ ] Semua file diakhiri newline (EOF)
