# Context: flow-task-completion

## Identifikasi Tipe Task

Baca deskripsi GitHub issue atau Jira tiket dan tentukan tipe:

| Keyword di Deskripsi         | Tipe Task       | Skill                |
|------------------------------|-----------------|----------------------|
| slicing, UI, halaman, layout | Slicing         | `web-slicing`        |
| API contract, endpoint list  | API Contract    | `docs-api-contract`  |
| hooks, integrasi, react-query| API Integrated  | `web-api-integrated` |
| backend, use case, repository| Backend         | `api-feature`        |
| prisma, migration, schema    | Prisma Schema   | `db-prisma-schema`   |
| worker, queue, BullMQ        | Worker          | `api-feature`        |

## Branch Naming

Dari `settings.json → branch.format`:
```
feature/{JIRA_KEY}-{deskripsi-singkat}
bugfix/{JIRA_KEY}-{deskripsi-singkat}
hotfix/{JIRA_KEY}-{deskripsi-singkat}
```

Contoh:
- `feature/KM-123-payment-gateway-slicing`
- `feature/KM-124-payment-gateway-backend`
- `feature/KM-125-payment-gateway-integration`

## Commit Convention

```
feat({scope}): {deskripsi}
fix({scope}): {deskripsi}
refactor({scope}): {deskripsi}
```

Contoh:
```
feat(payment-gateway): add checkout page and payment method selection
feat(payment-gateway): add InitiatePaymentUseCase and webhook handler
```

## PR Body Template

```markdown
## Jira
{JIRA_URL}

## GitHub Issue
#{issue-number}

## Perubahan
- Tambah halaman checkout
- Komponen PaymentMethodSelector
- Hook useInitiatePayment

## Test
- [ ] Unit test hooks pass
- [ ] Manual test: alur checkout berjalan

## Screenshot
(jika ada perubahan UI)
```

## Cek Sebelum PR

```bash
# Pastikan tidak ada file yang tidak seharusnya masuk
git status

# Pastikan test pass
bun run test

# Pastikan tidak ada TypeScript error
bun run type-check
```
