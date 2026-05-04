---
name: db-prisma-schema
description: Menulis atau mengubah apps/api/prisma/schema.prisma beserta langkah migrasi yang aman untuk PostgreSQL. Gunakan saat ada perubahan model database, relasi, index, enum, atau kebutuhan sinkronisasi schema dengan domain layer.
---

# Skill: DB Prisma Schema

## Context Cepat (Wajib)
- Folder scope + contoh kode: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Ubah schema secara minimal dan aman.

## Konvensi Penamaan

### Model & Tabel

| Kategori | Prefix Model | Prefix `@@map` |
|----------|-------------|----------------|
| Data master / referensi | `Master` | `master_` |
| Data transaksi / bisnis | `Business` | `business_` |
| Data membership | `Member` | `member_` |
| Data user / auth | *(tanpa prefix)* | `users` |
| Data config sistem | *(tanpa prefix)* | `configurations` |

### Field Boolean — prefix `is` atau `has`
### Enum Values — SCREAMING_SNAKE_CASE

### Field Standar Wajib
```prisma
id        String    @id @default(uuid()) @db.Uuid
createdAt DateTime  @default(now()) @map("created_at") @db.Timestamp(6)
updatedAt DateTime  @default(now()) @map("updated_at") @db.Timestamp(6)
deletedAt DateTime? @map("deleted_at") @db.Timestamp(6)
```

## Alur Kerja

1. Baca `apps/api/prisma/schema.prisma`
2. Identifikasi breaking vs non-breaking changes
3. Tulis perubahan minimal
4. Jalankan: `bunx prisma validate` → `bunx prisma format` → `bunx prisma generate`

## Larangan

- **DILARANG** rename model, enum, atau field tanpa kebutuhan requirement yang jelas.
- **DILARANG** hapus kolom atau relasi existing tanpa menuliskan dampak migrasinya.
- **DILARANG** tinggalkan placeholder atau naming yang tidak sesuai konvensi prefix.
- **DILARANG** ubah file di luar scope schema/migrasi jika tidak dibutuhkan task.

## Checklist Sebelum Selesai

- [ ] Naming model konsisten dengan prefix kategori
- [ ] `@@map` ada (snake_case plural)
- [ ] `@map` ada di semua field (snake_case)
- [ ] Boolean fields prefix `is` atau `has`
- [ ] Enum values SCREAMING_SNAKE_CASE
- [ ] Field standar ada: id, createdAt, updatedAt
- [ ] `bunx prisma validate` pass
- [ ] `bunx prisma format` dijalankan
- [ ] `bunx prisma generate` dijalankan
- [ ] Semua file diakhiri newline (EOF)
