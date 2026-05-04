---
name: flow-session-start
description: Menangani perintah Mulai atau Start untuk onboarding repo: cek MCP, registry, memory, dan status kerja lalu arahkan user ke next step yang tepat.
---

# Skill: Session Start

## Context Cepat (Wajib)

- Folder scope + quick-check paths: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Gunakan skill ini saat user hanya mengetik perintah seperti `Mulai`, `Start`, `Mulai Vibe Coding`, atau variasi sejenis tanpa task teknis spesifik. Tujuan skill ini adalah mengubah perintah singkat itu menjadi sesi onboarding yang cepat, interaktif, dan relevan terhadap kondisi repo saat ini.

## Alur Kerja

### 1. Kenali Trigger Start

Aktifkan skill ini jika user:

- hanya menulis `Mulai`, `Start`, `Mulai Vibe Coding`, atau varian setara
- meminta memulai sesi kerja dari nol
- meminta agent mengecek kesiapan repo sebelum lanjut

Jika user sudah memberi task implementasi spesifik, **jangan** pakai skill ini sebagai workflow utama.

### 2. Jalankan Quick Status Check

Sebelum bertanya apa pun, baca `.agents/settings.json` lalu jalankan status script:

```bash
yarn run session:status
```

Ringkas hasilnya ke empat area:

- status MCP (`.mcp.json`, required servers, missing servers)
- status registry fitur (`docs/features/REGISTRY.md`)
- status memory (`.agents/MEMORY.md`)
- status workspace (`git branch`, worktree dirty/clean)

### 3. Klasifikasikan Kondisi Sesi

Gunakan heuristik berikut:

- Jika MCP belum lengkap, anggap ini **kemungkinan first-time init**
- Jika branch bukan `main` atau worktree dirty, anggap ini **kemungkinan lanjut task terakhir**
- Jika workspace bersih dan MCP sudah siap, anggap ini **siap mulai work item baru**

### 4. Sampaikan Ringkasan Pendek

Balas dengan ringkasan singkat, misalnya:

- apakah MCP sudah siap atau belum
- ada fitur apa saja di registry
- apakah ada indikasi task yang sedang berjalan

Jangan dump JSON mentah ke user kecuali diminta.

### 5. Arahkan ke Next Step yang Tepat

Setelah ringkasan, arahkan ke salah satu jalur berikut:

- MCP belum siap → lanjut ke `ops-mcp-setup`
- ada pekerjaan yang kemungkinan belum selesai → tawarkan lanjutkan task terakhir
- repo siap dan user ingin mulai hal baru → lanjut ke `flow-breakdown-feature`

Ajukan **satu pertanyaan next step yang jelas**, bukan daftar pertanyaan panjang.

Contoh pola:

- `MCP untuk GitHub, Jira, dan Notion belum lengkap. Mau saya setup MCP dulu?`
- `Workspace menunjukkan branch kerja yang belum selesai. Mau saya lanjutkan task terakhir dari branch ini?`
- `Repo bersih dan MCP sudah siap. Mau kita breakdown fitur baru sekarang?`

### 6. Jangan Lompat ke Implementasi

Untuk perintah start yang masih umum:

- jangan langsung menulis kode
- jangan langsung membuat PRD/TRD
- jangan langsung setup token MCP tanpa konfirmasi user

Skill ini berhenti setelah status sesi jelas dan user memilih next step.

## Larangan

- **DILARANG** menanggapi `Mulai` dengan jawaban generik yang tidak mengecek repo.
- **DILARANG** langsung meminta banyak pertanyaan discovery sebelum quick-check dijalankan.
- **DILARANG** menganggap MCP siap hanya dari asumsi; cek `.mcp.json` dan required servers dulu.
- **DILARANG** langsung menulis `.mcp.json` dengan placeholder token.
- **DILARANG** langsung memulai implementasi fitur tanpa konfirmasi jalur berikutnya dari user.

## Checklist Sebelum Selesai

- [ ] Trigger memang cocok untuk onboarding start session
- [ ] `.agents/settings.json` dibaca
- [ ] `yarn run session:status` dijalankan
- [ ] MCP, registry, memory, dan workspace diringkas singkat
- [ ] Kondisi sesi diklasifikasikan: first init, resume, atau work baru
- [ ] User diberi satu pertanyaan next step yang jelas
- [ ] Jika perlu, next step diarahkan ke skill yang benar (`ops-mcp-setup`, `flow-breakdown-feature`, atau `flow-task-completion`)
- [ ] Semua file diakhiri newline (EOF)
