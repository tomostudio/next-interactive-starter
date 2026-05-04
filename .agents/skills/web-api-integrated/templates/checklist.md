# Checklist: Web API Integrated

- [ ] Baca `.agents/settings.json`
- [ ] Baca `.agents/guides/ARCHITECTURE.md` (bagian apps/web)
- [ ] Baca `references/context.md`
- [ ] Baca API contract atau TRD yang relevan
- [ ] Zod schema dibuat di `packages/schemas/` (pola: constants + labels + helper + schema + type)
- [ ] Response type dibuat di `packages/types/` dengan file flat per domain + re-export root bila perlu
- [ ] URL didaftarkan di `constants/api-routers.ts` (`:id` path variables)
- [ ] Query key didaftarkan di `constants/query-keys.ts` (flat strings, format: `{domain}{OperasiPascalCase}`)
- [ ] Hook `use-data-table.ts` dibuat (react-query useQuery)
- [ ] Hook `use-get-one.ts` dibuat
- [ ] Hook `use-insert-one.ts` dibuat
- [ ] Hook `use-update-one.ts` dibuat
- [ ] Hook `use-delete-one.ts` dibuat
- [ ] `index.ts` re-export semua hooks
- [ ] Setiap hook: default export + named export alias
- [ ] Tidak ada `axios`/`fetch` langsung di komponen
- [ ] Tidak ada `any`
- [ ] Semua file diakhiri newline (EOF)
