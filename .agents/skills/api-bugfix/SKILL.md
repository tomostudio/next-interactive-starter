---
name: api-bugfix
description: Memperbaiki bug backend dengan perubahan seminimal mungkin, menjaga layer lain tetap stabil, lalu memastikan validator, DTO, OpenAPI, shared schema/types, tests, dan dokumentasi terkait ikut sinkron bila terdampak.
---

# Skill: API Bugfix

## Context Cepat (Wajib)
- Folder scope + impact map: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Gunakan skill ini saat user meminta fix bug backend. Prinsip utamanya: **minimal touch**. Temukan akar masalah, ubah sekecil mungkin, jaga layering tetap bersih, lalu sinkronkan validator, DTO, OpenAPI, shared schema/types, dan test bila perilaku endpoint memang terdampak.

## Alur Kerja

### 1. Reproduksi atau Definisikan Bug dengan Jelas

Sebelum mengubah kode:
- pahami gejala bug
- cari failing behavior yang jelas di route, service, use case, queue, atau persistence
- tentukan boundary bug: request validation, business rule, response mapping, repository, atau side effect

Jika bisa, tambahkan atau ubah test yang merepresentasikan bug tersebut.

### 2. Lokalisasi Root Cause

Cari root cause sekecil mungkin. Prioritaskan lokasi berikut:
- route / validator jika bug ada di request parsing
- controller / service jika bug ada di orchestration atau response shaping
- use case jika bug adalah business logic
- repository / infra jika bug ada di persistence atau external side effect

Jangan merombak beberapa layer sekaligus jika satu layer cukup untuk memperbaiki bug.

### 3. Terapkan Perbaikan Minimal

Aturan minimal touch:
- sentuh file sesedikit mungkin
- pertahankan boundary `route -> controller -> service -> use case`
- jangan refactor unrelated layer
- jangan ubah naming atau struktur hanya karena sedang berada di file itu

### 4. Sinkronkan Contract dan Dokumentasi yang Terdampak

Jika bugfix mengubah perilaku endpoint, request shape, response shape, atau error semantics, update yang memang perlu:
- validator dan DTO
- `packages/schemas`
- `packages/types`
- `docs/api-contracts`
- split OpenAPI di `docs/openapi/`
- merged spec via `bun run openapi:generate`
- test yang relevan

Jangan biarkan endpoint behavior berubah tetapi OpenAPI dan shared types tetap lama.

### 5. Verifikasi Sempit tapi Teliti

Minimal verifikasi:
- test yang mereproduksi atau melindungi bug
- lint/typecheck untuk surface yang tersentuh
- generate OpenAPI jika contract berubah
- cek tidak ada drift baru antara code, shared contract, dan docs

## Larangan

- **DILARANG** refactor lintas layer saat tujuan user hanya fix bug.
- **DILARANG** mengubah file lain hanya karena "sekalian dibereskan".
- **DILARANG** membiarkan validator/DTO/OpenAPI/shared types drift bila bugfix mengubah behavior endpoint.
- **DILARANG** memindahkan business logic ke layer HTTP hanya demi fix cepat.
- **DILARANG** selesai tanpa verifikasi terarah.

## Checklist Sebelum Selesai

- [ ] Bug direproduksi atau perilaku salah didefinisikan jelas
- [ ] Root cause dilokalisasi ke layer terkecil yang masuk akal
- [ ] Perubahan tetap minimal touch
- [ ] Validator/DTO/schema/type/docs/OpenAPI ikut diupdate bila memang terdampak
- [ ] Test yang relevan ditambah atau diperbarui
- [ ] `bun run openapi:generate` dijalankan jika contract berubah
- [ ] Tidak ada drift baru di contract backend
- [ ] Semua file diakhiri newline (EOF)
