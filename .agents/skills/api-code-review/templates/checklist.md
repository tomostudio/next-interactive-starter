# Checklist: API Code Review

## Persiapan

- [ ] Baca `.agents/settings.json`
- [ ] Baca `references/context.md`
- [ ] Tentukan file backend dan contract artefacts yang perlu direview

## Review Inti

- [ ] Cari bug/regresi endpoint dulu
- [ ] Cek layering clean architecture
- [ ] Cek drift validator/DTO/schema/type/OpenAPI bila relevan
- [ ] Cek error handling dan status code behavior
- [ ] Cek gap test untuk behavior penting

## Output

- [ ] Findings ditulis lebih dulu, urut severity
- [ ] Tidak ada nit stylistic yang tidak relevan
- [ ] Open questions atau residual risks ditulis setelah findings
- [ ] Jika tidak ada findings, hal itu disebut eksplisit
- [ ] Semua file diakhiri newline (EOF)
