---
name: docs-openapi
description: Menulis atau memperbarui dokumentasi OpenAPI dalam format split per fitur di `docs/openapi`. Gunakan saat ada endpoint, request/response schema, atau contract API yang berubah.
---

# Skill: Docs OpenAPI

## Context Cepat (Wajib)
- Output folder: `docs/openapi/`
- Entry file: `docs/openapi/openapi.yaml`
- Split per fitur: `docs/openapi/paths/{feature-slug}.yaml`

Gunakan skill ini untuk menerjemahkan API contract menjadi spec OpenAPI yang konsisten, reusable, dan bisa diparse tooling.

## Alur Kerja

1. Baca API contract atau endpoint final yang akan didokumentasikan.
2. Tentukan apakah schema dan response shared sudah ada di `components/`.
3. Tulis atau perbarui file `paths/{feature}.yaml` untuk endpoint fitur tersebut.
4. Tambahkan `$ref` yang diperlukan ke `openapi.yaml`.
5. Validasi bahwa semua `$ref` menunjuk file dan key yang benar.

## Struktur File

```
docs/openapi/
├── openapi.yaml              ← entry, $ref ke paths + components
├── paths/
│   ├── payment-methods.yaml
│   └── users.yaml
└── components/
    ├── schemas/
    │   ├── PaymentMethod.yaml
    │   └── PaginationMeta.yaml
    └── responses/
        ├── NotFound.yaml
        └── Validation.yaml
```

## Format openapi.yaml (Entry)

```yaml
openapi: "3.0.3"
info:
  title: API
  version: "1.0.0"
paths:
  /payment-methods:
    $ref: "./paths/payment-methods.yaml#/PaymentMethodsList"
  /payment-methods/{id}:
    $ref: "./paths/payment-methods.yaml#/PaymentMethodsById"
components:
  schemas:
    PaymentMethod:
      $ref: "./components/schemas/PaymentMethod.yaml"
    PaginationMeta:
      $ref: "./components/schemas/PaginationMeta.yaml"
  responses:
    NotFound:
      $ref: "./components/responses/NotFound.yaml"
```

## Format paths/{feature}.yaml

```yaml
PaymentMethodsList:
  get:
    summary: List payment methods
    tags: [PaymentMethods]
    parameters:
      - name: page
        in: query
        schema:
          type: integer
          default: 1
      - name: perPage
        in: query
        schema:
          type: integer
          default: 10
    responses:
      "200":
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                list:
                  type: array
                  items:
                    $ref: "../components/schemas/PaymentMethod.yaml"
                meta:
                  $ref: "../components/schemas/PaginationMeta.yaml"
      "401":
        $ref: "../components/responses/Unauthorized.yaml"

  post:
    summary: Create payment method
    tags: [PaymentMethods]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [name, code]
            properties:
              name:
                type: string
              code:
                type: string
              isActive:
                type: boolean
                default: true
    responses:
      "200":
        description: OK
        content:
          application/json:
            schema:
              type: object
              properties:
                data:
                  $ref: "../components/schemas/PaymentMethod.yaml"
      "409":
        $ref: "../components/responses/Conflict.yaml"
      "422":
        $ref: "../components/responses/Validation.yaml"
```

## Aturan

- Gunakan OpenAPI 3.0.3
- Split per fitur — jangan taruh semua endpoint di satu file
- `$ref` untuk schema dan response yang dipakai lebih dari sekali
- Tag = nama fitur (PascalCase)
- Semua response error pakai shared `components/responses/`

## Larangan

- **DILARANG** duplikasi schema yang sebenarnya bisa direferensikan dari `components/`.
- **DILARANG** menaruh semua endpoint repo di satu file path.
- **DILARANG** membiarkan response body tanpa schema yang eksplisit.
- **DILARANG** menyisakan `$ref` rusak atau placeholder yang tidak valid.

## Checklist Sebelum Selesai

- [ ] File `paths/{feature}.yaml` sudah mencakup semua endpoint fitur
- [ ] `openapi.yaml` sudah mereferensikan path baru
- [ ] Shared schemas dan responses dipakai ulang via `$ref`
- [ ] Tidak ada placeholder atau `$ref` rusak
- [ ] Spec bisa diparse tooling OpenAPI
- [ ] Semua file diakhiri newline (EOF)
