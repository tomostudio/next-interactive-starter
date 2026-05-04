# Checklist: Web Code Review

## Persiapan

- [ ] Baca `.agents/settings.json`
- [ ] Baca `references/context.md`
- [ ] Tentukan file frontend dan shared contract yang perlu direview

## Review Inti

- [ ] Cari bug/regresi perilaku dulu
- [ ] Cek rule arsitektur frontend repo
- [ ] Cek drift schema/types/constants/hooks bila relevan
- [ ] Cek loading/error/success state yang bisa menipu UI
- [ ] Cek gap test untuk logic penting

## Output

- [ ] Findings ditulis lebih dulu, urut severity
- [ ] Tidak ada nit stylistic yang tidak relevan
- [ ] Open questions atau residual risks ditulis setelah findings
- [ ] Jika tidak ada findings, hal itu disebut eksplisit
- [ ] Semua file diakhiri newline (EOF)
