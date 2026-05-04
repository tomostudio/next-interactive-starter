# Guide: Web Page (`apps/web/app/`)

## Kontrak Folder

✅ Boleh:

- `page.tsx` = thin Suspense wrapper (Server Component)
- `components/` = komponen private ke route tersebut (tidak dipakai route lain)
- `index.tsx` = Client Component utama (state, hooks, layout)
- Komponen dalam `components/` seperti: `*-toolbar.tsx`, `*-table-card.tsx`, `*-form-dialog.tsx`, `*-drawer.tsx`
- Export `generateMetadata`, `generateStaticParams`

❌ Dilarang:

- Panggil `axios` atau `fetch` langsung
- Business logic atau state management di `page.tsx`
- Share `components/` antar route — jika reusable, pindah ke `@/components/`

---

## Struktur File per Route

```
app/
└── (dashboard)/
    └── users/
        ├── page.tsx                        → Wrapper Server Component
        ├── (nama-halaman).tsx              → Halaman statis
        ├── loading.tsx                     → Skeleton placeholder (optional)
        ├── error.tsx                       → Error boundary (optional)
        ├── hooks/
        ├── utils/
        └── components/
            ├── users-page-content.tsx      → Client Component utama
            ├── users-toolbar.tsx           → Search bar + filter + tombol add
            ├── users-table-card.tsx        → Tabel dalam PanelCard
            ├── users-form-dialog.tsx       → Dialog create/edit
            └── users-page-loading.tsx      → Skeleton loading (optional)
```

> Komponen yang **hanya** dipakai di route ini masuk `components/`. Jika dipakai lebih dari satu route, pindah ke `@/components/`.

---

## Utamakan Reusable Components

**Selalu** gunakan komponen dari `@/components/` — jangan tulis HTML primitif jika sudah ada komponennya.

| Kebutuhan          | Komponen                                        |
| ------------------ | ----------------------------------------------- |
| Tombol             | `Button`                                        |
| Input teks         | `Input`                                         |
| Textarea           | `Textarea`                                      |
| Dropdown select    | `Select`                                        |
| Radio buttons      | `RadioGroup`                                    |
| Checkbox           | `Checkbox`                                      |
| Tabel + pagination | `Table`                                         |
| Card container     | `PanelCard`                                     |
| Modal              | `Dialog`, `DialogContent`, `DialogHeader`, dll. |
| Side panel/drawer  | `Sheet`, `SheetContent`, `SheetHeader`, dll.    |
| Action menu baris  | `ActionsDropdown`                               |
| Status label       | `StatusBadge`                                   |
| Badge              | `Badge`                                         |
| Loading            | `LoadingSpinner`                                |

---

## Aturan Tambahan

- Satu `components/` per route — tidak dipakai bersama route lain
- Nama komponen = PascalCase, nama file = kebab-case
- Semua file diakhiri newline (EOF)
