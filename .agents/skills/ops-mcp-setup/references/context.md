# Context: Ops MCP Setup

## File yang Dibuat / Dimodifikasi

```
.mcp.json              → konfigurasi MCP (JANGAN di-commit)
.gitignore             → pastikan .mcp.json ada di sini
.agents/settings.json  → update repo + jira.projectKey
```

## Format `.mcp.json` Lengkap

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxx"
      }
    },
    "atlassian": {
      "command": "uvx",
      "args": ["mcp-atlassian"],
      "env": {
        "JIRA_URL": "https://mycompany.atlassian.net",
        "JIRA_USERNAME": "dev@mycompany.com",
        "JIRA_API_TOKEN": "ATATxxxxxxxxxxxxxxxxxxxxxx"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer secret_xxxxxxxxxxxx\", \"Notion-Version\": \"2022-06-28\"}"
      }
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=figd_xxxxxxxxxxxxxxxxxxxx", "--stdio"]
    }
  }
}
```

> **Figma bersifat opsional.** Hapus blok `figma` jika tidak dibutuhkan.

---

## Cara Dapat Token: GitHub

**URL:** https://github.com/settings/tokens → Personal access tokens → Tokens (classic)

**Langkah:**
1. Klik **Generate new token (classic)**
2. Beri nama (misal: `claude-code-mcp`)
3. Set expiration sesuai kebutuhan
4. Centang scope: `repo`, `read:org`, `read:user`
5. Klik **Generate token**
6. Copy token (hanya tampil sekali, diawali `ghp_`)

**Contoh token:** `ghp_AbCdEfGhIjKlMnOpQrStUvWxYz123456`

---

## Cara Dapat Token: Jira (Atlassian)

**URL:** https://id.atlassian.com/manage-profile/security/api-tokens

**Langkah:**
1. Klik **Create API token**
2. Beri nama (misal: `claude-code-mcp`)
3. Klik **Create**
4. Copy token (diawali `ATAT`)

**Cara cari Jira URL:**
- Buka Jira → lihat URL di browser
- Format: `https://{org}.atlassian.net`
- Contoh: `https://mycompany.atlassian.net`

**Cara cari Project Key:**
- Buka project di Jira → lihat prefix di nomor tiket
- Contoh: jika tiket bernomor `KM-123`, maka project key = `KM`

**Prasyarat `uv`:**
```bash
# Install uv (Python package runner)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Verifikasi
uvx --version
```

---

## Cara Dapat Token: Notion

**URL:** https://www.notion.so/my-integrations

**Langkah:**
1. Klik **New integration**
2. Beri nama (misal: `claude-code-mcp`)
3. Pilih workspace yang akan dipakai
4. Set capabilities: centang **Read content**, **Update content**, **Insert content**
5. Klik **Submit**
6. Copy **Internal Integration Token** (diawali `secret_`)

**PENTING — Share page ke integration:**
Setiap halaman Notion yang ingin diakses agent harus di-share dulu:
1. Buka halaman Notion
2. Klik **Share** (pojok kanan atas)
3. Cari nama integration yang baru dibuat
4. Klik untuk menambahkan

Tanpa langkah ini, agent tidak bisa membaca/menulis ke halaman tersebut.

---

## Cara Dapat Token: Figma

**URL:** https://www.figma.com/settings → Personal access tokens

**Langkah:**
1. Scroll ke bagian **Personal access tokens**
2. Klik **Create new token**
3. Beri nama (misal: `claude-code-mcp`)
4. Set expiration sesuai kebutuhan
5. Centang scope: **File content** (read-only cukup)
6. Klik **Create token**
7. Copy token (diawali `figd_`)

**Prasyarat:** `node` dan `npx` tersedia di PATH (sudah terpenuhi jika `bun` terinstall).

---

## Troubleshoot

| Error | Kemungkinan Penyebab | Solusi |
|---|---|---|
| `command not found: uvx` | `uv` belum terinstall | Jalankan: `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| GitHub: `401 Unauthorized` | Token salah atau expired | Generate token baru di GitHub settings |
| Jira: `401 Unauthorized` | Username atau token salah | Pastikan username = email, bukan display name |
| Jira: `404 Not Found` | JIRA_URL salah format | Harus `https://{org}.atlassian.net` tanpa trailing slash |
| Notion: `Could not find page` | Page belum di-share ke integration | Share halaman ke integration di Notion |
| MCP tidak muncul di Claude | `.mcp.json` belum terbaca | Restart Claude Code sepenuhnya |
| Figma: `Unauthorized` | Token salah atau expired | Generate token baru di Figma settings |
| Figma: file tidak bisa dibaca | Scope token kurang | Pastikan scope **File content** dicentang |

---

## Sections di `settings.json` yang Perlu Diupdate

```json
{
  "repo": {
    "owner": "my-github-org",
    "name": "my-monorepo"
  },
  "jira": {
    "projectKey": "KM"
  }
}
```

Field lain di `settings.json` bisa diisi belakangan sesuai kebutuhan project.
