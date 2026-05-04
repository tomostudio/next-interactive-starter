# Memory

Catatan penting yang perlu diingat antar sesi.

## Project

- Monorepo: next-interactive-starter
- Package manager: yarn
- Path alias frontend: @ → misal `@/components/button`, `@/hooks/...`
- Node version: nvm use 22
- Perintah `Mulai` / `Start` wajib masuk ke flow onboarding `flow-session-start`
- Quick status onboarding tersedia di `yarn run session:status`

## Konvensi Frontend

### Struktur Halaman

- `page.tsx` = thin Suspense wrapper (Server Component)
- `components/` = komponen private ke route tersebut (tidak dipakai route lain)
- `index.tsx` = Client Component utama (state, hooks, layout)
- Komponen dalam `components/` seperti: `*-toolbar.tsx`, `*-table-card.tsx`, `*-form-dialog.tsx`, `*-drawer.tsx`
- Loading state via `loading.tsx` + `*-page-loading.tsx` skeleton component

### Hooks

- Hooks disimpan langsung di folder `hooks/` tanpa nested folder per domain
- Satu file hanya berisi satu hook dan satu operasi
- File menggunakan kebab-case berdasarkan resource dan action:
  - `use-transactions-data-table.ts`
  - `use-transaction-get-one.ts`
  - `use-transaction-insert-one.ts`
  - `use-transaction-update-one.ts`
  - `use-transaction-delete-one.ts`
  - `use-query-param.ts`
- `index.ts` digunakan untuk re-export semua hooks
- Hooks boleh wrap `useQuery` dan `useMutation` dari React Query
- Hooks melakukan request axios langsung tanpa service function layer terpisah
- Hook tidak boleh berisi JSX atau render logic
- Dilarang menggunakan `any` sebagai type
- Setiap hook wajib memiliki default export dan named export alias sesuai domain

### Form

- Gunakan `register`, `handleSubmit`, `reset`, `watch`, `setValue` dari react-hook-form
- BUKAN shadcn FormField/FormControl/Form
- `watch()` untuk reactive values, `setValue` untuk complex fields (Select, RadioGroup)

### Response Types

- `DataTableResponse<T>` = `{ list: T[], meta: { pagination: { total, currentPage, perPage, lastPage }, cursor } }`
- Axios interceptor unwraps `{ meta, data }` → `DataTableResponse` untuk list, atau unwrap `data` untuk single
