# Checklist: Ops MCP Setup

## Persiapan

- [ ] Baca `references/context.md` (cara dapat token masing-masing layanan)
- [ ] Pastikan `uv` terinstall: `uvx --version` → jika error, install dulu
- [ ] Konfirmasi user punya akses ke: GitHub, Atlassian/Jira, Notion workspace

## Kumpulkan Token dari User

- [ ] **GitHub PAT** dikonfirmasi (diawali `ghp_`, scope: `repo`, `read:org`, `read:user`)
- [ ] **Jira URL** dikonfirmasi (format: `https://{org}.atlassian.net`)
- [ ] **Jira username** dikonfirmasi (email akun Atlassian, bukan display name)
- [ ] **Jira API Token** dikonfirmasi (diawali `ATAT`)
- [ ] **Jira Project Key** dikonfirmasi (prefix di nomor tiket, misal `KM`)
- [ ] **Notion Integration Token** dikonfirmasi (diawali `secret_`)
- [ ] **GitHub monorepo** dikonfirmasi (owner + nama repo)
- [ ] [OPSIONAL] Tanya user apakah perlu **Figma MCP** — jika ya, minta **Figma Personal Access Token** (diawali `figd_`)

## Buat / Update File

- [ ] Cek `.gitignore` — pastikan `.mcp.json` ada. Jika tidak, tambahkan
- [ ] `.mcp.json` dibuat di root project dengan 3 server wajib: `github`, `atlassian`, `notion`
- [ ] [OPSIONAL] Server `figma` ditambahkan ke `.mcp.json` jika user membutuhkan
- [ ] Semua nilai di `.mcp.json` adalah token nyata (tidak ada placeholder `<...>`)
- [ ] `.agents/settings.json` diupdate: `repo.owner`, `repo.name`, `jira.projectKey`

## Verifikasi

- [ ] User diinstruksikan restart Claude Code
- [ ] GitHub MCP terverifikasi: bisa list issues atau repos
- [ ] Atlassian MCP terverifikasi: bisa list tiket Jira
- [ ] Notion MCP terverifikasi: bisa list atau baca halaman Notion
- [ ] [OPSIONAL] Figma MCP terverifikasi: bisa baca file Figma
- [ ] Jika ada error, cek tabel troubleshoot di `references/context.md`

## Notion — Langkah Tambahan (Ingatkan User)

- [ ] User sudah share halaman Notion yang akan dipakai ke integration
- [ ] Jika belum: buka halaman → Share → cari nama integration → tambahkan
