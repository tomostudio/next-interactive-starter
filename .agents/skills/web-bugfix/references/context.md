# Context: Web Bugfix

## Folder Target

```
apps/web/app/                          → page wrapper + content component utama
apps/web/hooks/transactions/           → query / mutation hooks
apps/web/components/                   → reusable component bila benar-benar sumber bug
apps/web/constants/                    → api routers + query keys
apps/web/services/axios/               → interceptor / response handling
packages/schemas/                      → shared payload schema
packages/types/                        → shared response types
```

## Impact Map

Gunakan urutan cek ini:
1. apakah bug murni UI state?
2. apakah bug ada di hook atau request handling?
3. apakah bug berasal dari schema/type drift?
4. apakah bug sebenarnya contract/backend issue?

## Pattern Penting

- minimal touch lebih penting daripada refactor bersih-bersih
- `page.tsx` tetap tipis
- data flow tetap lewat hooks transaksi
- update `packages/schemas` / `packages/types` hanya jika benar-benar terdampak
- pure frontend bug tidak otomatis butuh OpenAPI update

## Contoh Surface Aktif

- `apps/web/app/`
- `apps/web/hooks/transactions/`
- `apps/web/constants/api-routers.ts`
- `packages/types/error-response.ts`
