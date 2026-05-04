# Context: docs-api-contract

## Folder Output

```
docs/api-contracts/
└── payment-gateway.md
└── user-management.md
```

## Response Shape Standar

### Single Resource
```json
{
  "data": {
    "id": "uuid",
    "field": "value"
  }
}
```

### Paginated List (DataTableResponse)
```json
{
  "list": [...],
  "meta": {
    "pagination": {
      "total": 100,
      "currentPage": 1,
      "perPage": 10,
      "lastPage": 10
    },
    "cursor": null
  }
}
```

### Error Response
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource tidak ditemukan"
  }
}
```

## Query Params Pagination Standar

| Param    | Type   | Default | Notes           |
|----------|--------|---------|-----------------|
| page     | number | 1       |                 |
| perPage  | number | 10      | max 100         |
| search   | string | —       | optional        |
| sortBy   | string | —       | nama field      |
| sortDir  | string | asc     | `asc` / `desc`  |

## Error Code → HTTP Status

| Code        | Status |
|-------------|--------|
| NOT_FOUND   | 404    |
| UNAUTHORIZED| 401    |
| FORBIDDEN   | 403    |
| CONFLICT    | 409    |
| VALIDATION  | 422    |
| INTERNAL    | 500    |

## Contoh Endpoint CRUD Lengkap

```markdown
### GET /payment-methods
List metode pembayaran (paginated)

Query: page, perPage, search, isActive (boolean)
Response: DataTableResponse<PaymentMethod>

---

### GET /payment-methods/:id
Detail satu metode pembayaran

Response: { data: PaymentMethod }
Error: 404 NOT_FOUND

---

### POST /payment-methods
Buat metode pembayaran baru

Body: { name: string, code: string, isActive?: boolean }
Response: { data: PaymentMethod }
Error: 409 CONFLICT (code sudah ada), 422 VALIDATION

---

### PUT /payment-methods/:id
Update metode pembayaran

Body: Partial<{ name, isActive }>
Response: { data: PaymentMethod }
Error: 404 NOT_FOUND, 422 VALIDATION

---

### DELETE /payment-methods/:id
Hapus metode pembayaran

Response: { data: { id: string } }
Error: 404 NOT_FOUND, 409 CONFLICT (sedang dipakai)
```
