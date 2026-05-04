# Architecture: Layer Map + Folder Contracts

Baca file ini di awal setiap sesi implementasi. Berisi peta layer lengkap dan kontrak per folder.

---

## Monorepo Overview

```
next-interactive-starter/
├── app/                    → Router: pages, layouts, route groups, route handlers
│   └── (nama-halaman)/
│       ├── page.tsx        → Wrapper Server component
│       ├── (nama-halaman).tsx → Halaman statis
│       ├── hooks/          → hooks per halaman
│       ├── utils/          → helper functions (debounce, pathVariable, dll.) per halaman
│       ├── components/
│           ├── index.tsx         → Server Component (thin Suspense wrapper)
│           └── (komponen-pendukung).tsx → Komponen yang diapakai di index.tsx
├── components/             → Reusable UI components (dipakai >1 halaman)
│    ├── atoms/
│    ├── molecules/
│    ├── organisms/
│    └── templates/
├── hooks/                  → Reusable hooks (dipakai >1 halaman)
├── constants/              → Reusable values (dipakai >1 halaman)
├── utils/                  → FE-specific helper functions (debounce, pathVariable, dll.)
├── context/
├── sanity/                → Sanity CMS
│    ├── lib/
│    ├── block/                → Reusable Text Editor
│    ├── list/                 → Data yang menampilkan banyak item
│    ├── settings/             → Data yang digunakan untuk mengatur banyak halaman
│    └── list/                 → Data yang menampilkan banyak item
├── types/generals/            → FE-specific types not from API
├── styles/
│    ├── _fonts.scss          → Daftar font yang di import
│    ├── _utils.scss          → CSS Helpers
│    ├── main.scss            → Main CSS
│    └── tailwind.css         → TailwindCSS Config
```

### Contracts per Folder

#### `app/` — Pages & Layouts

✅ Boleh:

- `page.tsx` berisi hanya Suspense wrapper + import content component
- Import `LoadingSpinner` atau skeleton component untuk Suspense fallback
- Export `generateMetadata`, `generateStaticParams`
- Route handler tipis untuk auth atau proxy boleh ada di bawah `app/api/`

❌ Dilarang:

- Panggil `axios` atau `fetch` langsung
- Business logic atau state management
- Buat `components/` folder per route — semua logic di content file

---

#### `components/` — Reusable UI Components

✅ Boleh:

- Terima props, render JSX
- Import komponen UI library (Button, Input, Dialog, Table, dll.)
- `useState`, `useEffect` untuk local UI state

❌ Dilarang:

- Panggil `axios` atau `fetch` langsung
- Import data-fetching hooks dari `hooks/`
- Hardcode API URL atau query key

---

#### `constants/` — Application Constants

✅ Boleh:

- `api-routers.ts`: flat object dengan `:id` path variables (misal `/users/:id`)
- `query-keys.ts`: flat string values per operasi (misal `index: 'usersIndex'`)

❌ Dilarang:

- Business logic
- Fungsi untuk path variable — gunakan `pathVariable()` utility
- Nilai dari env (gunakan `configs/`)

---
