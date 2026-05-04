# Context: Session Start

## Folder Target

```
.agents/settings.json                → source of truth trigger + onboarding config
.agents/MEMORY.md                   → konteks penting antar sesi
docs/features/REGISTRY.md           → ringkasan fitur yang sudah pernah dibuat
scripts/start-session.mjs           → quick status check untuk start session
.mcp.json                           → indikasi MCP repo-level sudah dikonfigurasi atau belum
```

## Script Wajib

Jalankan ini saat skill dipakai:

```bash
yarn run session:status
```

Output script akan merangkum:

- status MCP required vs configured
- jumlah fitur di registry + fitur terakhir
- section memory yang tersedia
- branch aktif + jumlah file berubah

## Pattern Penting

- Untuk first init: arahkan ke skill `ops-mcp-setup`
- Untuk fitur baru: arahkan ke skill `flow-breakdown-feature`
- Untuk lanjutan task existing: arahkan ke skill `flow-task-completion`

## Ringkasan yang Baik

Format ringkasan ke user harus pendek dan operasional. Cukup sampaikan:

1. MCP siap atau belum
2. registry sudah berisi apa
3. ada indikasi task yang sedang berjalan atau tidak
4. satu pertanyaan next step

Hindari:

- dump JSON mentah
- menanyakan banyak pertanyaan sekaligus
- langsung memulai implementasi
