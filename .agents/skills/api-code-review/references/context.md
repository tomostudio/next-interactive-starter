# Context: API Code Review

## Folder Target

```
apps/api/src/interfaces/http/          → routes, controllers, middleware
apps/api/src/application/              → services, use-cases, DTOs, validators
apps/api/src/domain/                   → entities dan repository interfaces
apps/api/src/infrastructure/           → database / external implementations
packages/schemas/                      → shared request schema bila dipakai lintas app
packages/types/                        → shared response types
docs/openapi/                          → split OpenAPI source of truth
docs/api-contracts/                    → FE-BE contract docs
```

## Pattern Penting

- route tidak boleh lompat langsung ke repository
- controller tidak boleh menyimpan business logic besar
- use case tidak boleh tahu HTTP concerns
- perubahan validator/DTO/response shape harus memicu audit contract drift
- OpenAPI dan shared types adalah bagian dari review jika behavior endpoint berubah

## Contoh Surface Aktif

- Baseline routes: `apps/api/src/interfaces/http/routes/root-route.ts`, `apps/api/src/interfaces/http/routes/health-route.ts`
- App assembly: `apps/api/src/interfaces/http/create-app.ts`
- OpenAPI aktif: `docs/openapi/base.json`
