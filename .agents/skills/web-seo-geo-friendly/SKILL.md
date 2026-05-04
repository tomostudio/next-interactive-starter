---
name: web-seo-geo-friendly
description: Mengoptimalkan halaman publik Next.js App Router agar SEO-friendly dan GEO-friendly (Generative Engine Optimization). Gunakan saat user meminta optimasi SEO/GEO secara spesifik pada halaman publik.
---

# Skill: Web SEO + GEO

## Context Cepat (Wajib)
- Folder scope + contoh kode: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Optimalkan halaman publik agar mudah ditemukan search engine dan AI answer engines.

## Scope

Hanya untuk halaman **publik** di `apps/web/app/` yang tidak di-protect auth.

## Alur Kerja

1. Tambahkan `generateMetadata` atau `metadata` di `page.tsx`
2. Tambahkan Open Graph dan Twitter card meta
3. Tambahkan JSON-LD structured data sesuai jenis konten
4. Tambahkan halaman ke `sitemap.ts`
5. Pastikan `robots.ts` tidak block halaman publik

## Larangan

- **DILARANG** menerapkan skill ini ke halaman private atau halaman yang di-protect auth.
- **DILARANG** menambahkan metadata generik yang tidak sesuai isi halaman.
- **DILARANG** membuat structured data yang tidak valid atau tidak relevan dengan konten.

## Checklist Sebelum Selesai

- [ ] `generateMetadata` ada: title, description, canonical
- [ ] Open Graph meta: title, description, url, image
- [ ] Twitter card meta: card type, title, description
- [ ] JSON-LD structured data sesuai jenis halaman
- [ ] Halaman ada di sitemap.ts
- [ ] robots.ts tidak mem-block halaman
- [ ] H1 ada dan deskriptif (satu per halaman)
- [ ] Meta description 150-160 karakter
- [ ] Semua file diakhiri newline (EOF)
