# Context: flow-breakdown-feature

## Folder Output

- Dokumen fitur disimpan di: `docs/features/{feature-slug}/`
- Registry fitur: `docs/features/REGISTRY.md`
- PRD utama: `docs/MAIN_PRD.md`

## Struktur Output

```
docs/features/
├── REGISTRY.md           ← daftar semua feature ID + slug
└── payment-gateway/
    ├── PRD.md
    └── TRD.md
```

## Contoh Feature Slug

| Ide Fitur            | Slug                |
|----------------------|---------------------|
| Manajemen User       | `user-management`   |
| Payment Gateway      | `payment-gateway`   |
| Laporan Transaksi    | `transaction-report`|
| Pengaturan Workspace | `workspace-settings`|

## Contoh PRD.md

```markdown
# PRD: Payment Gateway

## Overview
Integrasi payment gateway untuk memproses pembayaran online.

## Problem Statement
User tidak bisa bayar langsung di platform — harus transfer manual.

## Goals
- User bisa bayar via kartu kredit, transfer bank, dan e-wallet
- Status pembayaran real-time

## Non-Goals
- Refund otomatis (fase 2)
- Multi-currency (fase 2)

## User Stories
- Sebagai buyer, saya ingin memilih metode pembayaran saat checkout
- Sebagai buyer, saya ingin melihat status pembayaran saya

## Acceptance Criteria
- [ ] Halaman checkout menampilkan daftar metode pembayaran
- [ ] Setelah bayar, status order berubah ke `PAID`
- [ ] User menerima email konfirmasi
```

## Contoh TRD.md

```markdown
# TRD: Payment Gateway

## Data Model

### Table: payments
| Field        | Type     | Notes                    |
|--------------|----------|--------------------------|
| id           | UUID     | PK                       |
| order_id     | UUID     | FK → orders.id           |
| method       | ENUM     | CREDIT_CARD, BANK, EWALLET|
| amount       | DECIMAL  |                          |
| status       | ENUM     | PENDING, PAID, FAILED    |
| paid_at      | TIMESTAMP| nullable                 |
| created_at   | TIMESTAMP|                          |

## API Contract Overview

| Method | Endpoint                    | Deskripsi                   |
|--------|-----------------------------|-----------------------------|
| POST   | /payments/initiate          | Mulai proses pembayaran      |
| GET    | /payments/:id/status        | Cek status pembayaran        |
| POST   | /payments/webhook           | Callback dari payment gateway|

## Task Breakdown

### Slicing & API Contract
- [ ] Halaman checkout dengan form pilih metode bayar
- [ ] Halaman status pembayaran (pending/success/failed)
- [ ] API contract: initiate, status, webhook

### Backend
- [ ] Prisma migration: table `payments`
- [ ] Use case: `InitiatePaymentUseCase`
- [ ] Use case: `HandleWebhookUseCase`
- [ ] Repository: `PaymentRepository`
- [ ] Route + Controller untuk 3 endpoint
- [ ] Worker job untuk kirim email konfirmasi

### Integrasi
- [ ] Hook `useInitiatePayment` (mutation)
- [ ] Hook `useGetPaymentStatus` (query)
- [ ] Integrasi ke halaman checkout
```

## Contoh REGISTRY.md Entry

```markdown
| FT-001 | payment-gateway | Payment Gateway Integration | In Progress |
| FT-002 | user-management | User Management             | Planned     |
```
