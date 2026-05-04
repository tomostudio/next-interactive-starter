# Context: Skill Add Example

## Folder Target

```
.agents/examples/
├── web-slicing/
│   └── nextjs-app-router/
│       ├── examples/              → CRUD basic template
│       └── payment-methods/       → CRUD kompleks (form kompleks, Select, RadioGroup)
└── web-api-integrated/
    └── hooks/
        └── use-examples/          → contoh hook folder per domain
```

## Struktur Folder Example

```
.agents/examples/{skill-name}/{subfolder}/{example-name}/
├── {feature}-content.tsx   → Client Component (untuk web-slicing)
├── page.tsx                → Suspense wrapper (untuk web-slicing)
├── use-data-table.ts       → hook (untuk web-api-integrated)
├── use-get-one.ts
├── use-insert-one.ts
├── use-update-one.ts
├── use-delete-one.ts
└── index.ts
```

## Naming Convention

| Komponen | Format | Contoh |
|---|---|---|
| Folder skill | Sama persis dengan skill name | `web-slicing` |
| Subfolder konteks | kebab-case, framework/domain | `nextjs-app-router`, `hooks` |
| Example name | kebab-case, nama domain/fitur | `payment-methods`, `use-products` |
| File | sesuai konvensi codebase | `payment-methods-content.tsx` |

## Pemetaan Skill → Lokasi Examples

| Skill | Folder Examples |
|---|---|
| `web-slicing` | `.agents/examples/web-slicing/nextjs-app-router/` |
| `web-api-integrated` | `.agents/examples/web-api-integrated/hooks/` |
| Skill baru | `.agents/examples/{skill-name}/` |

## Cara Update `references/context.md` di Skill Terkait

Cari section `## Contoh Kode Nyata` di `references/context.md` skill terkait, lalu tambahkan:

```markdown
### Example N — {Nama Deskriptif}
Lokasi: `.agents/examples/{skill-name}/{subfolder}/{example-name}/`

Pattern: {pattern-1} + {pattern-2} + {pattern-3}

File:
- `{file}.tsx` — {penjelasan fungsi file}
- `{file2}.ts` — {penjelasan fungsi file}

**Gunakan untuk:** {kondisi spesifik kapan example ini relevan}

---
```

## Contoh Entry yang Sudah Ada (Referensi)

### Entry di `web-slicing/references/context.md`

```markdown
### Example 2 — CRUD dengan Form Kompleks (REFERENSI UTAMA)
Lokasi: `.agents/examples/web-slicing/nextjs-app-router/payment-methods/`

Pattern: useDataTable + useQueryParam + debounce + SweetAlert preConfirm + Select component + RadioGroup + form dengan watch/setValue

File:
- `page.tsx` — Suspense wrapper
- `payment-methods-content.tsx` — **Baca ini dulu** untuk pola lengkap

**Gunakan untuk:** halaman dengan form kompleks (Select, RadioGroup, banyak field).
```

## Kapan Perlu Tambah Example

- Ada pattern baru yang berulang dipakai di codebase
- Ada skenario kompleks yang tidak tercakup example yang ada
- Skill baru dibuat dan belum punya contoh kode nyata
- Pattern lama sudah berubah dan perlu di-update
