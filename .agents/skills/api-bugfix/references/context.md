# Context: API Bugfix

## Folder Target

```
apps/api/src/interfaces/http/          → route, controller, middleware
apps/api/src/application/              → service, use-case, DTO, validator
apps/api/src/domain/                   → entity dan repository contract
apps/api/src/infrastructure/           → implementation side effects
packages/schemas/                      → shared request schema bila relevan
packages/types/                        → shared response types
docs/api-contracts/                    → FE-BE contract docs
docs/openapi/                          → split OpenAPI source of truth
docs/openapi.json                      → merged spec yang digenerate
```

## Impact Map

Gunakan urutan cek ini:
1. apakah bug ada di validasi request?
2. apakah bug ada di orchestration / response mapping?
3. apakah bug ada di business rule use case?
4. apakah bug ada di repository / side effect?
5. apakah behavior endpoint yang terlihat user ikut berubah?

## Pattern Penting

- boundary layer harus tetap rapi saat bugfix
- minimal touch lebih penting daripada refactor luas
- perubahan response atau error contract harus memicu audit `packages/types` dan OpenAPI
- perubahan request shape harus memicu audit validator dan `packages/schemas`
- OpenAPI diubah di split files lalu merged spec digenerate ulang

## Contoh Surface Aktif

- `apps/api/src/interfaces/http/routes/root-route.ts`
- `apps/api/src/application/services/system-service.ts`
- `apps/api/src/application/use-cases/`
- `docs/openapi/base.json`
