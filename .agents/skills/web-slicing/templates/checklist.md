# Checklist: Web Slicing

- [ ] Baca `.agents/settings.json`
- [ ] Baca `.agents/guides/ARCHITECTURE.md` (bagian apps/web)
- [ ] Baca `references/context.md`
- [ ] Baca `.agents/guides/web-page.md` sebelum buat file di `app/`
- [ ] Baca `.agents/guides/web-component.md` sebelum buat file di `components/`
- [ ] Lihat contoh di `.agents/examples/web-slicing/nextjs-app-router/`
- [ ] `page.tsx` = Suspense wrapper thin — tidak ada logic
- [ ] `*-content.tsx` = satu Client Component dengan semua logic
- [ ] Tidak ada `_components/` folder
- [ ] Tidak ada `axios`/`fetch` di komponen
- [ ] Search: `useQueryParam` + `debounce` utility + `useMemo`
- [ ] Delete: SweetAlert `preConfirm` + `new Promise` + `.then()/.catch()`
- [ ] Toast: `react-hot-toast` (`toast.success`, `toast.error`)
- [ ] Tidak ada `any`
- [ ] Semua file diakhiri newline (EOF)
