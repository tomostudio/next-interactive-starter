---
name: web-code-review
description: Melakukan code review frontend dengan standar senior lead yang tegas, fokus pada bug, regresi, risiko arsitektur, dan gap test di apps/web serta shared contract yang dipakai frontend.
---

# Skill: Web Code Review

## Context Cepat (Wajib)
- Folder scope + pattern utama: `references/context.md`
- Checklist review: `templates/checklist.md`

Gunakan skill ini saat user meminta review perubahan frontend, review PR frontend, atau audit kualitas implementasi UI/integrasi FE. Review harus terasa seperti senior lead yang tegas: fokus ke bug, regresi, contract drift, aksesibilitas yang benar-benar berdampak, dan gap test. Bukan review kosmetik.

## Alur Kerja

### 1. Tentukan Surface Review

Baca diff atau file yang diminta user, lalu petakan surface yang relevan:
- `apps/web/app`
- `apps/web/hooks/transactions`
- `apps/web/components`
- `apps/web/constants`
- `apps/web/services/axios`
- `packages/schemas`
- `packages/types`

Kalau perubahan frontend menyentuh contract API atau shared payload, review juga artefak shared yang ikut terdampak.

### 2. Prioritaskan Risiko yang Benar

Temukan temuan dalam urutan prioritas ini:
1. bug fungsional dan regresi perilaku
2. pelanggaran rule arsitektur repo
3. contract drift antara UI, hooks, schema, dan response types
4. error handling, loading state, dan state consistency
5. gap test untuk logic penting
6. aksesibilitas atau performance issue yang nyata berdampak

Jangan habiskan waktu pada style nit atau preferensi pribadi yang tidak mengubah correctness.

### 3. Audit dengan Standar Repo

Cek secara tegas hal-hal berikut:
- `page.tsx` tetap tipis, bukan tempat business logic
- JSX tidak memanggil `fetch` / `axios` langsung
- data flow tetap lewat hooks transaksi
- `packages/schemas` dan `packages/types` masih sinkron dengan penggunaan frontend
- query keys, API routers, dan hook contracts tidak drift
- error/loading/success states tidak menyebabkan UI bohong atau race condition
- perubahan penting punya test yang layak

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

- **DILARANG** membuka review dengan pujian, ringkasan manis, atau komentar basa-basi.
- **DILARANG** menaruh summary sebelum findings.
- **DILARANG** fokus ke format, naming, atau style jika tidak menimbulkan bug atau risiko nyata.
- **DILARANG** mengabaikan contract drift di `packages/schemas` / `packages/types` bila frontend bergantung pada keduanya.
- **DILARANG** memperbaiki kode diam-diam saat user hanya meminta review.

## Checklist Sebelum Selesai

- [ ] Scope review dipetakan dari diff atau file target
- [ ] Rule arsitektur frontend repo ikut dicek
- [ ] Shared schema/types yang dipakai frontend ikut dicek bila relevan
- [ ] Findings disusun dari severity tertinggi
- [ ] Summary tidak mendahului findings
- [ ] Jika tidak ada findings, residual risk atau testing gap tetap disebutkan
- [ ] Semua file diakhiri newline (EOF)
