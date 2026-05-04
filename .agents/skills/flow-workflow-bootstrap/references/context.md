# Context: flow-workflow-bootstrap

## Settings yang Dipakai

Baca `.agents/settings.json` untuk:
- `repo.owner`, `repo.name` → GitHub monorepo
- `jira.projectKey` → prefix tiket Jira
- `branch.format` → format nama branch
- `paths.registry` → path ke REGISTRY.md

## Struktur REGISTRY.md

```markdown
# Feature Registry

| ID     | Slug              | Nama Fitur              | Status      | Jira                    | GitHub              | Notion |
|--------|-------------------|-------------------------|-------------|-------------------------|---------------------|--------|
| FT-001 | payment-gateway   | Payment Gateway         | In Progress | KM-123, KM-124, KM-125  | #42, #43, #12 (be)  | [link] |
| FT-002 | user-management   | User Management         | Planned     | —                       | —                   | —      |
```

## Jira Tiket Template

```
Summary: [FT-001] Payment Gateway — Slicing & API Contract
Type: Story
Labels: slicing, frontend
Description:
  Scope: Halaman checkout, pilih metode bayar, status pembayaran

  Tasks:
  - [ ] Slicing halaman checkout
  - [ ] Slicing halaman status pembayaran
  - [ ] API contract: POST /payments/initiate
  - [ ] API contract: GET /payments/:id/status
  - [ ] API contract: POST /payments/webhook

  Referensi: [PRD](docs/features/payment-gateway/PRD.md)
```

## GitHub Issue Template

```markdown
## Context
Tiket Jira: KM-123

## Scope
Slicing halaman checkout dan status pembayaran untuk integrasi payment gateway.

## Tasks
- [ ] Halaman `/checkout` dengan form pilih metode bayar
- [ ] Halaman `/payment/status` untuk cek hasil pembayaran
- [ ] API contract dokumen

## Branch
`feature/KM-123-payment-gateway-slicing`

## Referensi
- PRD: docs/features/payment-gateway/PRD.md
- TRD: docs/features/payment-gateway/TRD.md
```
