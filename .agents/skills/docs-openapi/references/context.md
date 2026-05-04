# Context: docs-openapi

## Shared Components yang Sudah Ada

### components/schemas/PaginationMeta.yaml
```yaml
type: object
properties:
  pagination:
    type: object
    properties:
      total:
        type: integer
      currentPage:
        type: integer
      perPage:
        type: integer
      lastPage:
        type: integer
  cursor:
    type: string
    nullable: true
```

### components/responses/NotFound.yaml
```yaml
description: Resource tidak ditemukan
content:
  application/json:
    schema:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
              example: NOT_FOUND
            message:
              type: string
```

### components/responses/Validation.yaml
```yaml
description: Validasi gagal
content:
  application/json:
    schema:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
              example: VALIDATION
            message:
              type: string
            fields:
              type: object
              additionalProperties:
                type: array
                items:
                  type: string
```

## Contoh Schema Entity

### components/schemas/PaymentMethod.yaml
```yaml
type: object
properties:
  id:
    type: string
    format: uuid
  name:
    type: string
  code:
    type: string
  isActive:
    type: boolean
  createdAt:
    type: string
    format: date-time
  updatedAt:
    type: string
    format: date-time
required: [id, name, code, isActive, createdAt, updatedAt]
```

## Cara Tambah Fitur Baru

1. Buat `docs/openapi/paths/{feature-slug}.yaml`
2. Buat `docs/openapi/components/schemas/{EntityName}.yaml` jika belum ada
3. Tambah `$ref` ke `docs/openapi/openapi.yaml`
4. Gunakan shared components yang sudah ada — jangan duplikasi
