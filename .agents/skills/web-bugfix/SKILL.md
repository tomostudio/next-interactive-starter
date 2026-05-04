---
name: web-bugfix
description: Memperbaiki bug frontend dengan perubahan seminimal mungkin, menjaga surface lain tetap stabil, lalu memastikan schema, types, hooks, constants, tests, dan dokumentasi terkait ikut sinkron bila terdampak.
---

# Skill: Web Bugfix

## Context Cepat (Wajib)
- Folder scope + impact map: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Gunakan skill ini saat user meminta fix bug frontend. Prinsip utamanya: **minimal touch**. Cari akar masalah, ubah sesedikit mungkin, jangan refactor area lain, lalu sinkronkan artefak yang memang terdampak. Jangan meninggalkan drift.

## Alur Kerja

### 1. Reproduksi atau Definisikan Bug dengan Jelas

Sebelum mengubah kode:
- pahami gejala bug
- cari langkah reproduksi atau failing behavior yang jelas
- tentukan boundary bug: page, hook, component, shared schema/type, atau integrasi API

Kalau bisa, tambahkan atau ubah test yang merepresentasikan bug tersebut.

### 2. Lokalisasi Root Cause

Cari root cause sekecil mungkin. Prioritaskan lokasi berikut:
- `*-content.tsx`
- hooks transaksi
- shared schema/type yang dipakai frontend
- constants (`api-routers`, `query-keys`)
- reusable component yang benar-benar menjadi sumber bug

Jangan refactor besar hanya karena bug ditemukan di area yang jelek.

### 3. Terapkan Perbaikan Minimal

Aturan minimal touch:
- sentuh file sesedikit mungkin
- ubah behavior yang salah tanpa mendesain ulang area lain
- jangan mengganti pola arsitektur yang tidak relevan dengan bug
- jangan membersihkan debt lama yang tidak terkait

### 4. Sinkronkan Artefak yang Terdampak

Jika bug menyentuh contract atau shape data, update yang memang perlu:
- `packages/schemas`
- `packages/types`
- hooks transaksi frontend
- constants atau util terkait
- test yang relevan
- docs contract jika ekspektasi frontend terhadap API memang berubah

Jika bug ternyata berasal dari backend contract yang salah, jangan sembunyikan masalah di frontend. Fix surface frontend seperlunya, lalu arahkan atau lanjutkan dengan skill backend yang tepat.

### 5. Verifikasi Sempit tapi Teliti

Minimal verifikasi:
- test yang mereproduksi atau melindungi bug
- typecheck/lint untuk surface yang tersentuh
- cek tidak ada contract drift baru

Jika bug ada di starter surface aktif, prioritaskan menjaga homepage, shared contract, dan hook transaksi yang dipakai tetap konsisten.

## Larangan

- **DILARANG** refactor besar saat tujuan user hanya fix bug.
- **DILARANG** mengubah file lain hanya karena "sekalian dirapikan".
- **DILARANG** membiarkan schema/type/hooks/docs drift bila bugfix mengubah shape data.
- **DILARANG** menutup bug backend dengan workaround frontend yang menambah kebohongan state atau contract mismatch.
- **DILARANG** selesai tanpa verifikasi terarah.

## Checklist Sebelum Selesai

- [ ] Bug direproduksi atau perilaku salah didefinisikan jelas
- [ ] Root cause dilokalisasi ke surface terkecil yang masuk akal
- [ ] Perubahan tetap minimal touch
- [ ] Shared schema/types/constants/hooks ikut diupdate bila memang terdampak
- [ ] Test yang relevan ditambah atau diperbarui
- [ ] Tidak ada drift baru di contract frontend
- [ ] Semua file diakhiri newline (EOF)
