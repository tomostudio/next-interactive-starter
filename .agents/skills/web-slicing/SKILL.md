---
name: web-slicing
description: Mengubah desain screenshot/Figma menjadi UI frontend pixel-perfect dengan komponen reusable. Gunakan saat task fokus pada implementasi tampilan dan layout halaman.
---

# Skill: Web Slicing

## Context Cepat (Wajib)
- Folder scope + contoh kode: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Implementasikan UI dari desain secara presisi. Fokus pada tampilan dan layout — belum integrasi API.

## Alur Kerja

1. Pelajari desain: screenshot, Figma link, atau deskripsi layout yang diberikan user.

2. Baca guide sebelum membuat file di folder tersebut:
   - `.agents/guides/web-page.md` — untuk file di `app/`
   - `.agents/guides/web-component.md` — untuk file di `components/`

3. Buat file sesuai konvensi page structure:
   ```
   app/(group)/[feature]/
   ├── page.tsx               → Suspense wrapper (Server Component)
   └── [feature]-content.tsx → Client Component utama (semua logic: state, form, table, dialog)
   ```

4. Gunakan contoh kode nyata dari:
   - `.agents/examples/web-slicing/nextjs-app-router/examples/` — CRUD basic (template)
   - `.agents/examples/web-slicing/nextjs-app-router/payment-methods/` — CRUD lengkap dengan form kompleks

5. Gunakan komponen dari library yang sudah ada:
   - `Button`, `Input`, `Dialog`, `Table`, `Select`, `RadioGroup`, `Textarea`
   - `ActionsDropdown` untuk edit/delete actions
   - `PanelCard` sebagai wrapper tabel
   - `StatusBadge` untuk display status
   - `LoadingSpinner` untuk loading state
   - Lucide React untuk icons
   - Tailwind CSS untuk styling

6. Data yang belum ada dari API → gunakan data dummy / placeholder props.

## Larangan

- **DILARANG** call `axios`/`fetch` langsung di komponen JSX/TSX.
- **DILARANG** buat `_components/` folder — semua logic dalam satu content file.
- **DILARANG** gunakan `any` sebagai type.
- **DILARANG** hardcode warna atau spacing — gunakan Tailwind tokens.

## Checklist Sebelum Selesai

- [ ] `page.tsx` thin wrapper dengan Suspense
- [ ] `*-content.tsx` satu file dengan semua logic
- [ ] Tidak ada `_components/` folder
- [ ] Tidak ada direct API call di komponen
- [ ] Tidak ada `any`
- [ ] Semua file diakhiri newline (EOF)
