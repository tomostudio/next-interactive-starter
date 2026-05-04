---
name: web-api-integrated
description: Mengintegrasikan API ke frontend dengan Zod schema, response types, constants, dan react-query hooks. Gunakan saat implementasi endpoint dari API contract, Postman, atau Swagger.
---

# Skill: Web API Integrated

## Context Cepat (Wajib)
- Folder scope + contoh kode: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Integrasikan API ke frontend dengan arsitektur yang konsisten.

## Alur Kerja

### 0. Baca API Contract
- Jika user memberikan API contract (Postman, Swagger, TRD), baca dan pahami seluruh endpoint: method, URL, payload, dan response.
- Lihat `docs/features/{feature-slug}/TRD.md` jika tersedia.

### 1. Buat Zod Schema (`packages/schemas/`)
- Buat schema dengan pola: type constants + labels array + `get{Type}Label()` + Zod schema + type alias
- Baca panduan: `.agents/guides/shared-schema.md`

### 2. Buat Response Types (`packages/types/`)
- Buat satu file per response type, mis. `packages/types/payment-method-response.ts`
- Import dari frontend via `@vibecoding-starter/types/payment-method-response`
- Re-export dari `packages/types/index.ts` bila memang perlu dipakai dari root package

### 3. Daftarkan Constants
- Tambahkan URL di `apps/web/constants/api-routers.ts` (gunakan `:id` path variables)
- Tambahkan query key di `apps/web/constants/query-keys.ts` (flat strings)
- Baca panduan: `.agents/guides/web-constant.md`

### 4. Buat Custom Hooks (`apps/web/hooks/transactions/use-{domain}/`)
- Satu folder per domain, satu file per operasi
- Hooks call axios **langsung** — tidak perlu service function
- Urutan file: `use-data-table.ts`, `use-get-one.ts`, `use-insert-one.ts`, `use-update-one.ts`, `use-delete-one.ts`, `index.ts`
- Baca panduan: `.agents/guides/web-hook.md`
- Lihat contoh: `.agents/examples/web-api-integrated/hooks/use-examples/`

## Larangan

- **DILARANG** call `axios`/`fetch` langsung di komponen JSX/TSX.
- **DILARANG** gunakan `any` sebagai type.
- **DILARANG** skip Zod schema — semua payload harus tervalidasi.
- **DILARANG** hardcode API URL — gunakan `apiRouters` dari constants.
- **DILARANG** gunakan fungsi untuk URL — gunakan `:id` path variable + `pathVariable()`.

## Checklist Sebelum Selesai

- [ ] Zod schema dibuat di `packages/schemas/` (pola lengkap: constants + labels + helper + schema + type)
- [ ] Response type dibuat di `packages/types/` dengan file flat per domain + re-export root bila perlu
- [ ] URL didaftarkan di `constants/api-routers.ts` (`:id` path variables)
- [ ] Query key didaftarkan di `constants/query-keys.ts` (flat strings)
- [ ] Custom hooks dibuat: `useDataTable`, `useGetOne`, `useInsertOne`, `useUpdateOne`, `useDeleteOne`
- [ ] `index.ts` re-export semua hooks
- [ ] Tidak ada `axios`/`fetch` langsung di komponen
- [ ] Tidak ada `any`
- [ ] Semua file diakhiri newline (EOF)
