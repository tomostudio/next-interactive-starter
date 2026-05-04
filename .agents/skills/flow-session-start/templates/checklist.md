# Checklist: Session Start

## Persiapan

- [ ] Baca `.agents/settings.json`
- [ ] Baca `references/context.md`
- [ ] Validasi bahwa trigger user memang berupa perintah start/onboarding

## Quick Check

- [ ] Jalankan `yarn run session:status`
- [ ] Ringkas status MCP
- [ ] Ringkas registry fitur
- [ ] Ringkas status memory
- [ ] Ringkas branch dan worktree

## Arahkan Next Step

- [ ] Tentukan apakah ini first init, resume, atau work baru
- [ ] Jika MCP belum siap, arahkan ke `ops-mcp-setup`
- [ ] Jika ada task berjalan, tawarkan lanjut task terakhir
- [ ] Jika repo siap untuk task baru, arahkan ke `flow-breakdown-feature`
- [ ] Ajukan satu pertanyaan next step yang jelas

## Finalisasi

- [ ] Tidak ada asumsi palsu soal MCP atau task terakhir
- [ ] Tidak ada implementasi fitur yang dimulai tanpa konfirmasi user
- [ ] Semua file diakhiri newline (EOF)
