# Guide: Web Type (`types/`)

## Kontrak Folder

✅ Boleh:

- TypeScript `type` dan `interface` yang FE-specific
- Types untuk local state, component props yang kompleks, route params
- `DataTableResponse<T>` dan tipe generals lain
- Re-export dari `index.ts` per subfolder

❌ Dilarang:

- Gunakan `any`
- Business logic atau runtime code

---

## Konvensi

### Struktur

```
types/
└── generals/
    ├── data-table.ts   → DataTableResponse<T>, pagination types
    ├── next-auth.d.ts  → NextAuth module augmentation
    └── index.ts        → re-export semua
```

### `DataTableResponse<T>`

```typescript
// types/generals/data-table.ts
export type PaginationMeta = {
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
};

export type CursorMeta = {
  next: string | null;
  prev: string | null;
} | null;

export type DataTableMeta = {
  pagination: PaginationMeta;
  cursor: CursorMeta;
};

export type DataTableResponse<T> = {
  list: T[];
  meta: DataTableMeta;
};
```

### Re-export

```typescript
// types/generals/index.ts
export type { ErrorResponse } from "@vibecoding-starter/types";
export * from "./data-table";
```

---

## Aturan Tambahan

- Gunakan `type` untuk unions, intersections, dan aliases
- Gunakan `interface` untuk object shapes yang mungkin di-extend
- Tidak perlu `I` prefix untuk interface
- File diakhiri newline
