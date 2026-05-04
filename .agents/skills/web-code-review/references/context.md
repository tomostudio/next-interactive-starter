# Context: Web Code Review

## Folder Target

```
apps/web/app/                          → page wrapper + content component utama
apps/web/components/                   → reusable UI components
apps/web/hooks/transactions/           → data-fetching hooks frontend
apps/web/constants/                    → query keys + API routes
apps/web/services/axios/               → axios instance + interceptor
packages/schemas/                      → shared request schema / payload shape
packages/types/                        → shared response types
```

## Pattern Penting

- `page.tsx` harus tipis, logic utama ada di `*-content.tsx`
- JSX tidak boleh `fetch` / `axios` langsung
- integrasi API harus lewat hooks transaksi
- perubahan payload harus sinkron dengan `packages/schemas`
- perubahan response handling harus sinkron dengan `packages/types`
- review frontend harus curiga pada race condition, stale state, dan error state yang menipu user

## Contoh Surface Aktif

- Starter homepage: `apps/web/app/page.tsx`, `apps/web/app/home-content.tsx`
- Hook integration: `apps/web/hooks/transactions/`
- Shared contract: `packages/types/error-response.ts`, `packages/types/success-response.ts`
