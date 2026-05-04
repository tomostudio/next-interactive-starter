---
name: api-code-review
description: Melakukan code review backend dengan standar senior lead yang tegas, fokus pada bug, regresi, contract drift, risiko clean architecture, dan gap test di apps/api serta shared contract terkait.
---

# Skill: API Code Review

## Context Cepat (Wajib)
- Folder scope + pattern utama: `references/context.md`
- Checklist review: `templates/checklist.md`

Gunakan skill ini saat user meminta review perubahan backend, review PR API, atau audit kualitas implementasi server. Review harus tegas seperti senior lead: cari bug, regresi, contract drift, pelanggaran layering, dan test gap. Bukan review kosmetik.

## Alur Kerja

### 1. Tentukan Surface Review

Baca diff atau file target, lalu petakan surface yang relevan:
- `apps/api/src/interfaces/http`
- `apps/api/src/application`
- `apps/api/src/domain`
- `apps/api/src/infrastructure`
- `packages/schemas`
- `packages/types`
- `docs/openapi`
- `docs/api-contracts`

Jika perubahan menyentuh endpoint, validator, DTO, atau response shape, audit contract artefacts juga.

### 2. Prioritaskan Risiko yang Benar

Cari temuan dalam urutan prioritas ini:
1. bug fungsional dan regresi endpoint
2. pelanggaran clean architecture / boundary leakage
3. validator, DTO, schema, type, dan OpenAPI drift
4. error handling dan status code mismatch
5. persistence / queue side effect yang salah
6. gap test untuk behavior penting

### 3. Audit dengan Standar Repo

Cek secara tegas hal-hal berikut:
- flow tetap `route -> controller -> service -> use case`
- validasi request tidak bocor ke layer yang salah
- repository interface dan implementation tetap selaras
- error tetap bubble ke `errorHandler`, bukan di-handle acak
- request/response contract sinkron dengan `packages/schemas`, `packages/types`, dan `docs/openapi`
- perubahan behavior penting punya test yang relevan

### 4. Format Hasil Review

Hasil review **wajib** berisi findings dulu, urut dari paling serius.

Format per finding:
- severity `[P1]`, `[P2]`, atau `[P3]`
- judul singkat
- file/area terdampak
- kenapa ini bug/risiko/regresi
- apa yang seharusnya diperbaiki

Setelah findings, baru boleh tulis:
- open questions / assumptions
- residual risks atau testing gaps
- change summary singkat jika memang perlu

Jika tidak ada findings, katakan eksplisit bahwa tidak ada temuan, lalu sebutkan sisa risiko atau gap coverage yang masih ada.

### 5. Jangan Diam-Diam Memperbaiki

Skill ini default-nya untuk review, bukan implementasi. Jangan ubah kode kecuali user secara eksplisit meminta fix setelah review.

## Larangan

- **DILARANG** membuka review dengan pujian atau ringkasan sebelum findings.
- **DILARANG** fokus ke style nit jika tidak berdampak ke correctness atau maintainability nyata.
- **DILARANG** melewatkan drift antara endpoint behavior dan OpenAPI / shared types.
- **DILARANG** menganggap layering bersih hanya karena test pass; cek boundary antar layer secara eksplisit.
- **DILARANG** memperbaiki kode diam-diam saat user hanya meminta review.

## Checklist Sebelum Selesai

- [ ] Scope review dipetakan dari diff atau file target
- [ ] Layering backend repo ikut dicek
- [ ] Contract artefacts ikut dicek bila endpoint berubah
- [ ] Findings disusun dari severity tertinggi
- [ ] Summary tidak mendahului findings
- [ ] Jika tidak ada findings, residual risk atau testing gap tetap disebutkan
- [ ] Semua file diakhiri newline (EOF)
