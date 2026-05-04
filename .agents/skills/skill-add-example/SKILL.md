---
name: skill-add-example
description: Menambahkan contoh kode nyata ke .agents/examples/ agar bisa dijadikan referensi oleh skill lain. Gunakan saat ada pattern baru yang perlu dibakukan sebagai template atau referensi agent.
---

# Skill: Skill Add Example

## Context Cepat (Wajib)
- Folder scope + konvensi: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Tambahkan contoh kode nyata yang sudah terbukti ke `.agents/examples/` agar agent bisa merujuknya saat eksekusi skill.

## Alur Kerja

### 1. Tentukan Scope & Skill Target
- Identifikasi skill mana yang akan menggunakan example ini (misal: `web-slicing`, `web-api-integrated`)
- Tentukan nama subfolder yang deskriptif (kebab-case): misal `payment-methods`, `use-products`

### 2. Tentukan Lokasi Example

```
.agents/examples/
└── {skill-name}/           → folder per skill
    └── {subfolder}/        → konteks spesifik (framework, domain, dll.)
        └── {example-name}/ → nama example (kebab-case, deskriptif)
            ├── {file}.ts   → file kode nyata
            └── {file}.tsx  → file kode nyata
```

Contoh lokasi yang sudah ada:
- `.agents/examples/web-slicing/nextjs-app-router/examples/` — CRUD basic
- `.agents/examples/web-slicing/nextjs-app-router/payment-methods/` — CRUD kompleks
- `.agents/examples/web-api-integrated/hooks/use-examples/` — hooks CRUD

### 3. Tulis File Example

- Salin kode nyata dari codebase (bukan fabricated) — kalau belum ada, buat berdasarkan pattern yang sudah disepakati
- Pastikan kode **bisa langsung dijadikan template** oleh agent
- Hapus hardcoded business logic yang terlalu spesifik — ganti dengan placeholder yang jelas
- Pertahankan nama variabel dan struktur asli agar mudah dipahami

### 4. Update Referensi di Skill Terkait

Setelah example ditambahkan, perbarui `references/context.md` di skill yang memakai example ini:

```markdown
## Contoh Kode Nyata

### Example N — {Nama Example}
Lokasi: `.agents/examples/{skill-name}/{subfolder}/{example-name}/`

Pattern: {daftar pattern yang dicontohkan}

File:
- `{file}.tsx` — {penjelasan singkat}

**Gunakan untuk:** {skenario kapan example ini relevan}
```

### 5. Pastikan Example Bisa Ditemukan

- Tambahkan komentar di baris pertama file: `// Example: {deskripsi singkat}`
- Jika ada banyak file, tambahkan `README.md` singkat di folder example (opsional, hanya jika kompleks)

## Larangan

- **DILARANG** menambahkan example yang belum pernah dipakai di codebase nyata — validasi dulu di project.
- **DILARANG** menyimpan secret, credential, atau data sensitif di file example.
- **DILARANG** membuat example di root `.agents/examples/` tanpa subfolder skill.
- **DILARANG** duplikasi example yang sudah ada — cek lebih dulu.
- **DILARANG** skip update `references/context.md` di skill terkait.

## Checklist Sebelum Selesai

- [ ] Scope dan skill target ditentukan
- [ ] Lokasi folder dipilih sesuai konvensi (`{skill-name}/{subfolder}/{example-name}/`)
- [ ] File example ditulis — kode nyata, bisa dijadikan template
- [ ] Kode tidak mengandung secret atau data sensitif
- [ ] `references/context.md` di skill terkait diperbarui dengan entry example baru
- [ ] Semua file diakhiri newline (EOF)
