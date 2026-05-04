---
name: ops-mcp-setup
description: Mengonfigurasi MCP server GitHub, Jira (Atlassian), Notion, dan Figma (opsional) di project ini agar skill flow dapat berjalan. Gunakan saat pertama kali setup project atau saat MCP belum terhubung.
---

# Skill: Ops MCP Setup

## Context Cepat (Wajib)
- Detail token + format file: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Hubungkan agent ke layanan eksternal yang dibutuhkan flow vibe coding: **GitHub**, **Jira (Atlassian)**, dan **Notion**. **Figma** bersifat opsional — hanya perlu jika workflow slicing menggunakan desain Figma.

## Prasyarat

- `bun` atau `npx` tersedia di PATH
- `uv` tersedia (untuk Atlassian MCP) — jika belum: `curl -LsSf https://astral.sh/uv/install.sh | sh`
- Akses ke akun GitHub, Atlassian, dan Notion workspace yang akan dipakai

## Alur Kerja

### 1. Tanya Informasi yang Dibutuhkan

Sebelum membuat file, tanya user:

```
1. GitHub Personal Access Token (atau minta user generate dulu — lihat references/context.md)
2. Jira URL (format: https://{org}.atlassian.net)
3. Jira username (email akun Atlassian)
4. Jira API Token (atau minta user generate dulu)
5. Notion Integration Token (atau minta user generate dulu)
6. [OPSIONAL] Figma Personal Access Token — tanya apakah perlu Figma MCP
```

Jangan buat `.mcp.json` dengan placeholder — semua nilai harus real token dari user.

### 2. Cek `.gitignore`

Pastikan `.mcp.json` sudah masuk ke `.gitignore`. Jika belum, tambahkan:

```
.mcp.json
```

### 3. Buat `.mcp.json`

Buat file di root project dengan token yang sudah dikonfirmasi:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "{token dari user}"
      }
    },
    "atlassian": {
      "command": "uvx",
      "args": ["mcp-atlassian"],
      "env": {
        "JIRA_URL": "{jira url dari user}",
        "JIRA_USERNAME": "{email dari user}",
        "JIRA_API_TOKEN": "{token dari user}"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer {token dari user}\", \"Notion-Version\": \"2022-06-28\"}"
      }
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key={token dari user}", "--stdio"]
    }
  }
}
```

> **Figma bersifat opsional.** Tambahkan hanya jika user ingin agent bisa membaca desain Figma langsung. Jika tidak, skip bagian `figma` dari `.mcp.json`.

### 4. Update `.agents/settings.json`

Setelah MCP siap, update bagian `repo` dan `jira` di `.agents/settings.json` dengan nilai nyata:

```json
{
  "repo": {
    "owner": "{github org/username}",
    "name": "{nama monorepo github}"
  },
  "jira": {
    "projectKey": "{JIRA_PROJECT_KEY}"
  }
}
```

### 5. Verifikasi

Instruksikan user untuk:

1. **Restart Claude Code** agar `.mcp.json` terbaca
2. Cek di Claude Code bahwa MCP sudah aktif (biasanya ada indikator di status bar atau bisa test dengan perintah sederhana)
3. Test masing-masing koneksi:
   - GitHub: "List open issues di repo {repo-name}"
   - Jira: "List tiket open di project {JIRA_KEY}"
   - Notion: "List halaman di workspace"

Jika ada yang gagal, tampilkan pesan error dan arahkan ke langkah troubleshoot di `references/context.md`.

## Larangan

- **DILARANG** menyimpan token di file selain `.mcp.json` (tidak ke `.env`, tidak ke `settings.json`).
- **DILARANG** commit `.mcp.json` — pastikan ada di `.gitignore` sebelum file dibuat.
- **DILARANG** buat `.mcp.json` dengan nilai placeholder — tunggu token nyata dari user.
- **DILARANG** skip update `settings.json` — bagian `repo` dan `jira.projectKey` wajib diisi.

## Checklist Sebelum Selesai

- [ ] `.mcp.json` ada di `.gitignore`
- [ ] Semua token dikonfirmasi dari user (bukan placeholder)
- [ ] `.mcp.json` dibuat di root project dengan 3 MCP server wajib: `github`, `atlassian`, `notion`
- [ ] [OPSIONAL] MCP `figma` ditambahkan jika user membutuhkan
- [ ] `.agents/settings.json` diupdate: `repo.owner`, `repo.name`, `jira.projectKey`
- [ ] User diinstruksikan restart Claude Code
- [ ] User berhasil verifikasi koneksi ke layanan yang dikonfigurasi
