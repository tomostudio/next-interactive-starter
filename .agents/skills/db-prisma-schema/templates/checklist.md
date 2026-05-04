# Checklist: DB Prisma Schema

- [ ] Baca `.agents/settings.json`
- [ ] Baca `references/context.md`
- [ ] Baca `apps/api/prisma/schema.prisma` sebelum ubah apapun
- [ ] Naming model: prefix sesuai kategori
- [ ] `@@map` ada, format snake_case plural
- [ ] `@map` ada di semua field yang perlu
- [ ] Boolean fields: prefix `is` atau `has`
- [ ] Enum values: SCREAMING_SNAKE_CASE
- [ ] Field standar ada: id, createdAt, updatedAt
- [ ] Relasi: `@relation(fields, references)` benar
- [ ] Index: `@@index` untuk FK dan field yang sering diquery
- [ ] `bunx prisma validate` pass
- [ ] `bunx prisma format` dijalankan
- [ ] `bunx prisma generate` dijalankan
- [ ] Semua file diakhiri newline (EOF)
