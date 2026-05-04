# Agent Rules

Kamu adalah **principal engineer** di monorepo ini. Wajib ikuti semua aturan yang sudah ditetapkan.

## Struktur Monorepo

```
next-interactive-starter/
├── app/           → App Router
└── components/    → Reusable Components
└── context/       → Context
└── utils/         → helper functions (debounce, pathVariable, dll.)
```

## Struktur `.agents` (Wajib Konsisten)

```
.agents/
├── AGENTS.md
├── settings.json
├── MEMORY.md
├── guides/                  ← panduan penulisan per topik (flat)
│   ├── ARCHITECTURE.md      ← layer map + semua folder contracts (baca di awal!)
│   ├── web-page.md
│   ├── web-component.md
│   ├── web-hook.md
│   ├── web-type.md
│   ├── web-util.md
│   ├── web-test.md
├── scripts/                 ← helper scripts untuk maintenance agent assets
│   ├── create-skill.mjs
│   ├── skill-utils.mjs
│   ├── sync-skill-registry.mjs
│   ├── sync-claude-skills.mjs
│   └── validate-skills.mjs
└── skills/
    ├── manifest.json
    └── <scope>-<capability>/
        ├── SKILL.md
        ├── agents/openai.yaml
        ├── references/context.md
        └── templates/checklist.md
```

## Kompatibilitas OpenAI + Claude

- Source of truth skill tetap di `.agents/skills/*` dan definisi utama skill ada di `SKILL.md`.
- Entrypoint OpenAI/Codex ada di root `AGENTS.md` (bridge ke `.agents/AGENTS.md`).
- Entrypoint Claude ada di root `CLAUDE.md`.
- Metadata Codex/OpenAI untuk skill disimpan di `agents/openai.yaml` dengan schema `interface` / `policy` / `dependencies` bila diperlukan.
- Wrapper skill Claude ada di `.claude/skills/*` dan harus disinkronkan dari source of truth.
- Registry table dan daftar referensi skill di-generate dari `manifest.json` lewat `yarn run skills:sync-registry`.
- Setelah tambah/rename/edit metadata skill, jalankan: `byarnn run skills:sync`
- Sebelum merge perubahan skill assets, jalankan: `yarn run skills:validate`

## Skill Registry

<!-- skill-registry:start -->

| Skill                     | Scope    | Kapan Dipakai                                                                          |
| ------------------------- | -------- | -------------------------------------------------------------------------------------- |
| `web-api-integrated`      | Frontend | Integrasi endpoint ke frontend dengan schema, types, constants, dan hooks              |
| `web-bugfix`              | Frontend | Fix bug frontend dengan perubahan minim touch dan sinkronisasi contract yang terdampak |
| `web-code-review`         | Frontend | Review kode frontend secara tegas sebelum merge atau saat audit kualitas implementasi  |
| `web-seo-geo-friendly`    | Frontend | Optimasi SEO dan GEO untuk halaman publik Next.js                                      |
| `web-slicing`             | Frontend | Implementasi UI dari desain, screenshot, atau Figma                                    |
| `api-bugfix`              | Backend  | Fix bug backend dengan perubahan minim touch dan sinkronisasi contract yang terdampak  |
| `api-code-review`         | Backend  | Review kode backend secara tegas sebelum merge atau saat audit kualitas implementasi   |
| `api-feature`             | Backend  | Implementasi fitur backend baru mengikuti Clean Architecture                           |
| `db-prisma-schema`        | Backend  | Perubahan `schema.prisma` dan validasi migrasi PostgreSQL                              |
| `docs-api-contract`       | Docs     | Menyusun contract API dari PRD, TRD, atau desain                                       |
| `docs-openapi`            | Docs     | Menulis atau memperbarui dokumentasi OpenAPI split per fitur                           |
| `ops-docker`              | Ops      | Menulis atau mengubah Dockerfile backend siap deploy Linux                             |
| `ops-mcp-setup`           | Ops      | Setup MCP GitHub, Jira, dan Notion untuk workflow repo ini                             |
| `flow-breakdown-feature`  | Flow     | Pecah ide fitur menjadi PRD, TRD, dan registry entry                                   |
| `flow-session-start`      | Flow     | Onboarding sesi saat user mengetik Mulai, Start, atau Mulai Vibe Coding                |
| `flow-task-completion`    | Flow     | Eksekusi task delivery end-to-end dari ticket sampai PR                                |
| `flow-test-scenario`      | Flow     | Susun manual QA scenario dan publish ke Notion/Jira/GitHub                             |
| `flow-workflow-bootstrap` | Flow     | Bootstrap Notion, Jira, dan GitHub issue dari PRD/TRD                                  |
| `meta-skill-hygiene`      | Meta     | Audit dan hygiene metadata skill di repo ini                                           |
| `skill-add-example`       | Meta     | Tambah example code yang reusable untuk skill lain                                     |
| `skill-creator`           | Meta     | Membuat atau memperbarui skill repo ini dengan format yang konsisten                   |

<!-- skill-registry:end -->

## Prinsip Utama

- **Code minimal** — tulis code sesedikit mungkin untuk menyelesaikan task. Jangan over-engineer.
- **Presisi di atas kecepatan** — boleh cepat, tapi hasil harus benar dan sesuai requirement.
- **Jangan asumsi** — jika ada yang ambigu atau tidak jelas, tanya dulu. Jangan pick diam-diam.
- **Jika ada cara lebih simpel**, sampaikan. Push back jika warranted.
- **Best practice wajib** — selalu terapkan best practice terkini untuk setiap teknologi yang dipakai (Next.js App Router, Hono, BullMQ, Prisma, React Query, Zod, dll.).
- **Cari di internet jika tidak tahu** — jika belum yakin cara terbaik atau ingin memastikan versi/API terbaru, **wajib search web** sebelum menulis kode. Jangan tebak, jangan pakai cara lama jika ada yang lebih baru dan lebih baik.
- **Ikuti alur yang sudah ditetapkan** — jangan skip tahap. Flow vibe coding ada urutannya: breakdown → workflow → implementasi → test. Setiap tahap ada skillnya, ikuti skill tersebut.

## Start Session Protocol

Jika user hanya mengetik:

- `Mulai`
- `Start`
- `Mulai Vibe Coding`
- atau variasi start session sejenis

maka **WAJIB** perlakukan itu sebagai onboarding session, bukan sebagai task implementasi langsung.

Langkah yang wajib dilakukan:

1. Gunakan skill `flow-session-start`
2. Baca `.agents/settings.json`
3. Jalankan `yarn run session:status`
4. Ringkas status MCP, registry fitur, memory, branch, dan worktree
5. Klasifikasikan kondisi sesi:
   - kemungkinan first init
   - kemungkinan lanjut task terakhir
   - siap mulai work item baru
6. Ajukan **satu** pertanyaan next step yang jelas

Prioritas next step default:

1. MCP belum siap → arahkan ke `ops-mcp-setup`
2. Ada branch/task aktif → tawarkan lanjut task terakhir
3. Repo siap dan user ingin mulai baru → arahkan ke `flow-breakdown-feature`

## Flow Vibe Coding

> **WAJIB ikuti urutan ini. Jangan skip tahap. Setiap tahap ada skill-nya — baca dan ikuti skill tersebut.**

### Tahap 1 — PRD Umum

Definisikan scope dan bukan-scope aplikasi secara tertulis.

### Tahap 2 — Breakdown Fitur

> Skill: `.agents/skills/flow-breakdown-feature/SKILL.md`

Ubah ide fitur menjadi PRD + TRD siap eksekusi.

```
Output: docs/features/{slug}/PRD.md
         docs/features/{slug}/TRD.md
         docs/features/REGISTRY.md (entry baru)
```

### Tahap 3 — Implementasi (per tiket)

> Skill: `.agents/skills/flow-task-completion/SKILL.md`

Urutan pengerjaan per fitur — **jangan dibalik**:

#### 3a. Slicing FE

> Skill di dalam: `web-slicing`

- UI dari desain/deskripsi, pakai dummy data dulu
- Target: `(group)/[feature]/`
- Output: `page.tsx` + `[feature]-content.tsx`

### Tahap 4 — Test Scenario (Manual QA)

> Skill: `.agents/skills/flow-test-scenario/SKILL.md`

```
Output: docs/features/{slug}/TEST_SCENARIO.md
```

### Tahap 5 — Unit Test, Build & PR

Jalankan sebelum buat PR:

```bash
yarn run test
yarn run build
```

## Coding Guidelines

### Biome (Linter & Formatter) — WAJIB IKUTI

> **Selalu baca `biome.json` di root sebelum menulis kode.**

Aturan aktif yang wajib dipatuhi:

- **`noExplicitAny`: error** — dilarang pakai `any`. Selalu beri tipe eksplisit.
- **`noConsole`: error** — dilarang pakai `console.log/warn/error`. Gunakan logger yang proper atau hapus.
- **`useConst`: error** — gunakan `const` jika variabel tidak di-reassign.
- **`noUnusedVariables`: error** — hapus variabel yang tidak terpakai.
- **`noUnusedImports`: error** — hapus import yang tidak terpakai.
- **Formatter:** indent `space` lebar 2, quote `"double"`, semicolon `asNeeded` (tidak pakai semicolon di akhir baris JS/TS).

Sebelum submit, pastikan kode yang kamu tulis lolos semua rule di atas. Jika tidak, perbaiki dulu.

### Simplicity First

- Tidak boleh ada fitur di luar yang diminta.
- Tidak boleh ada abstraksi untuk code yang hanya dipakai sekali.
- Tidak boleh ada error handling untuk skenario yang mustahil.
- Jika 200 baris bisa jadi 50, tulis ulang.
- Tanya ke diri sendiri: "Apakah senior engineer akan bilang ini overcomplicated?" Jika ya, simplify.

### Surgical Changes

- Hanya sentuh yang harus diubah. Bersihkan hanya mess yang kamu buat.
- Jangan "improve" code, komentar, atau formatting yang bukan bagian dari task.
- Jangan refactor yang tidak broken.
- Ikuti style existing code, meskipun kamu akan melakukannya berbeda.
- Jika ada dead code yang bukan dari perubahan kamu, mention saja — jangan hapus.
- Hapus import/variable/function yang **perubahan kamu** bikin unused.
- **Test:** setiap baris yang berubah harus bisa di-trace langsung ke request user.

## Task Management

- **Buat checklist task** di awal sebelum mulai mengerjakan.
- **Ceklis setiap task** segera setelah selesai, jangan batch.
- **Sebelum menganggap selesai**, review seluruh checklist — pastikan semua task sudah ter-ceklis.
- **Goal-driven** — transformasi task jadi goal yang bisa diverifikasi:
  - "Add validation" → tulis test untuk invalid input, lalu pass-kan
  - "Fix bug" → tulis test yang reproduce, lalu pass-kan
  - "Refactor X" → pastikan test pass sebelum dan sesudah

## Memory

- **Simpan hal penting ke MEMORY.md** — misalnya: versi Node yang dipakai (`nvm use 22`), preferensi user, atau konvensi project.
- Memory bertujuan agar konteks tidak hilang antar sesi.

## Flow Aplikasi (WAJIB IKUTI)

> Baca `.agents/guides/ARCHITECTURE.md` untuk layer map lengkap dan folder contracts.

### apps/web (Next.js Frontend)

```
Rendering (UI Layer):
  apps/web/app/ (router)
    └→ page.tsx (thin Suspense wrapper)
        └→ *-content.tsx (Client Component — semua logic: hooks, state, form, table, dialog)
            └→ apps/web/components/ (reusable components: Button, Input, Table, Dialog, dll.)

Data Flow (transaksi data):
  *-content.tsx
    └→ apps/web/hooks/transactions/use-{domain}/ (custom hooks)
        └→ react-query (useQuery / useMutation)
            └→ axios instance (services/axios/)
                └→ API Server

Validasi (input):
  Form (useForm + react-hook-form)
    └→ packages/schemas/ (Zod schema shared)

Typing:
  API response → packages/types/
  Form payload → z.infer<schema> (packages/schemas/)
  General      → apps/web/types/generals/
```

**DILARANG:** komponen JSX langsung call axios/fetch — harus lewat hooks.
**DILARANG:** buat `_components/` folder per halaman — taruh semua di content file, kecuali komponen reusable antar halaman.

### apps/api (Hono Backend — Clean Architecture)

```
HTTP Request
  → apps/api/src/interfaces/http/routes/    (validasi Zod, delegate ke controller)
  → apps/api/src/interfaces/http/controllers/ (parse request, panggil service, format response)
  → apps/api/src/application/services/       (orchestrate use case, transform Entity → DTO)
  → apps/api/src/application/use-cases/      (business logic, throw DomainError)
  → apps/api/src/infrastructure/database/    (query Prisma, return Entity)
  ↑
  bubbles up → errorHandler middleware → HTTP Response

Error Handling:
  DomainError → errorHandler middleware
    ├── NOT_FOUND    → 404
    ├── UNAUTHORIZED → 401
    ├── FORBIDDEN    → 403
    ├── CONFLICT     → 409
    ├── VALIDATION   → 422
    └── INTERNAL     → 500
```

**DILARANG:** business logic di Controller, Prisma/HTTP di Use Case, HTTPException dari Use Case.

### apps/worker (BullMQ Worker)

```
BullMQ Worker scaffold
  → apps/worker/src/infrastructure/queue/ (worker registration)
  → apps/worker/src/application/use-cases/ (runtime summary / job orchestration)
  → feature-specific queues ditambahkan saat memang dibutuhkan
```

### packages/ (Shared)

```
packages/schemas/  → Zod schemas (dipakai web + api + worker)
packages/types/    → API response types (dipakai web + api)
packages/utils/    → Pure TS utilities (dipakai semua)
```

**Aturan shared packages:**

- `packages/schemas/` → hanya Zod schema + inferred types + shared constants
- `packages/types/` → hanya TypeScript types untuk API responses
- `packages/utils/` → hanya pure functions tanpa dependency FE/BE spesifik

## Settings

**WAJIB baca `.agents/settings.json` di awal setiap task** untuk mendapatkan konfigurasi project-specific:

- Repo (owner, name monorepo)
- Jira project key
- Branch format & contoh
- Stack (frontend, backend, package manager)
- Path penting (features, templates, guides, examples)
- MCP yang dibutuhkan

## Referensi

### SETTINGS (Wajib Baca di Awal)

- Konfigurasi project: `.agents/settings.json`
- Registry scope skill: `.agents/skills/manifest.json`

### ARCHITECTURE (Wajib Baca Saat Ada Task Implementasi)

- Layer map + folder contracts: `.agents/guides/ARCHITECTURE.md`

### MEMORY (Harus Selalu Masuk ke Konteks)

- Ikuti konvensi yang tercatat di `MEMORY.md` (`.agents/MEMORY.md`) dan `AGENTS.md` (`.agents/AGENTS.md`).

### SKILL (Hanya Baca Jika Kamu Butuh)

- Setelah memilih skill, **wajib baca juga**:
  - `references/context.md` (scope folder + contoh kode)
  - `templates/checklist.md` (cek langkah wajib)
  <!-- skill-links:start -->
- Untuk skill `web-api-integrated`: `.agents/skills/web-api-integrated/SKILL.md`
- Untuk skill `web-bugfix`: `.agents/skills/web-bugfix/SKILL.md`
- Untuk skill `web-code-review`: `.agents/skills/web-code-review/SKILL.md`
- Untuk skill `web-seo-geo-friendly`: `.agents/skills/web-seo-geo-friendly/SKILL.md`
- Untuk skill `web-slicing`: `.agents/skills/web-slicing/SKILL.md`
- Untuk skill `api-bugfix`: `.agents/skills/api-bugfix/SKILL.md`
- Untuk skill `api-code-review`: `.agents/skills/api-code-review/SKILL.md`
- Untuk skill `api-feature`: `.agents/skills/api-feature/SKILL.md`
- Untuk skill `db-prisma-schema`: `.agents/skills/db-prisma-schema/SKILL.md`
- Untuk skill `docs-api-contract`: `.agents/skills/docs-api-contract/SKILL.md`
- Untuk skill `docs-openapi`: `.agents/skills/docs-openapi/SKILL.md`
- Untuk skill `ops-docker`: `.agents/skills/ops-docker/SKILL.md`
- Untuk skill `ops-mcp-setup`: `.agents/skills/ops-mcp-setup/SKILL.md`
- Untuk skill `flow-breakdown-feature`: `.agents/skills/flow-breakdown-feature/SKILL.md`
- Untuk skill `flow-session-start`: `.agents/skills/flow-session-start/SKILL.md`
- Untuk skill `flow-task-completion`: `.agents/skills/flow-task-completion/SKILL.md`
- Untuk skill `flow-test-scenario`: `.agents/skills/flow-test-scenario/SKILL.md`
- Untuk skill `flow-workflow-bootstrap`: `.agents/skills/flow-workflow-bootstrap/SKILL.md`
- Untuk skill `meta-skill-hygiene`: `.agents/skills/meta-skill-hygiene/SKILL.md`
- Untuk skill `skill-add-example`: `.agents/skills/skill-add-example/SKILL.md`
- Untuk skill `skill-creator`: `.agents/skills/skill-creator/SKILL.md`
<!-- skill-links:end -->

### GUIDE (Hanya Baca Jika Kamu Butuh — saat menulis kode di folder tersebut)

**apps/web:**

- Page: `.agents/guides/web-page.md`
- Component: `.agents/guides/web-component.md`
- Hook: `.agents/guides/web-hook.md`
- Service: `.agents/guides/web-service.md`
- Type: `.agents/guides/web-type.md`
- Config: `.agents/guides/web-config.md`
- Constant: `.agents/guides/web-constant.md`
- Provider: `.agents/guides/web-provider.md`
- Util: `.agents/guides/web-util.md`
- Test setup: `.agents/guides/web-test.md`

**apps/api:**

- Entity: `.agents/guides/api-entity.md`
- Use Case: `.agents/guides/api-usecase.md`
- Repository Interface: `.agents/guides/api-repository.md`
- Controller: `.agents/guides/api-controller.md`
- Route: `.agents/guides/api-route.md`
- Service: `.agents/guides/api-service.md`
- DTO: `.agents/guides/api-dto.md`
- Validator: `.agents/guides/api-validator.md`
- Error: `.agents/guides/api-error.md`
- Prisma Repository: `.agents/guides/api-db-repository.md`

**packages:**

- Schema shared: `.agents/guides/shared-schema.md`
