---
name: api-feature
description: Mengimplementasikan fitur backend baru mengikuti Clean Architecture. Gunakan saat ada task terkait endpoint baru, use case, entity, repository, atau perubahan layer aplikasi.
---

# Skill: API Feature

## Context Cepat (Wajib)
- Folder scope + contoh kode: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Implementasikan fitur backend secara profesional mengikuti Clean Architecture.

## Alur Kerja

1. Baca API contract atau requirement yang diberikan.

2. Baca guide **setiap folder** sebelum membuat file di sana:
   - `.agents/guides/api-dto.md`
   - `.agents/guides/api-validator.md`
   - `.agents/guides/api-entity.md`
   - `.agents/guides/api-repository.md`
   - `.agents/guides/api-usecase.md`
   - `.agents/guides/api-service.md`
   - `.agents/guides/api-db-repository.md`
   - `.agents/guides/api-controller.md`
   - `.agents/guides/api-route.md`
   - `.agents/guides/api-error.md`

3. Buat file **berurutan** sesuai dependency antar layer:
   ```
   1. application/dtos/{Domain}Dto.ts
   2. application/validators/{domain}.schemas.ts
   3. domain/entities/{Domain}.ts
   4. domain/repositories/I{Domain}Repository.ts
   5. domain/use-cases/{verb}-{domain}.ts    (per operasi)
   6. application/services/{Domain}Service.ts
   7. infrastructure/database/Prisma{Domain}Repository.ts
   8. interfaces/http/controllers/{Domain}Controller.ts
   9. interfaces/http/routes/{domain}Routes.ts
   10. Daftarkan di interfaces/http/create-app.ts
   ```

4. Error handling — jangan catch di Service atau Controller:
   ```
   UseCase throws DomainError → errorHandler middleware
   ```

## Larangan

- **DILARANG** gunakan `any`.
- **DILARANG** taruh business logic di Controller.
- **DILARANG** akses Prisma di Use Case.
- **DILARANG** throw `HTTPException` dari Use Case — gunakan `DomainError`.
- **DILARANG** ubah file yang tidak berkaitan dengan task.

## Checklist Sebelum Selesai

- [ ] DTO dibuat
- [ ] Validator schema dibuat
- [ ] Entity dibuat
- [ ] Repository interface dibuat
- [ ] Use case(s) dibuat (satu per operasi)
- [ ] Service dibuat
- [ ] Prisma repository dibuat
- [ ] Controller dibuat
- [ ] Route dibuat dan didaftarkan di create-app.ts
- [ ] Tidak ada `any`
- [ ] Tidak ada business logic di Controller
- [ ] Tidak ada Prisma di Use Case
- [ ] `bun run build` pass
- [ ] Semua file diakhiri newline (EOF)
