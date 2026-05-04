---
name: ops-docker
description: Menulis atau mengubah Dockerfile untuk backend ini agar siap deploy di Linux. Gunakan saat task terkait containerization, optimasi image, atau build/runtime issue di container. Docker Compose dikelola oleh server — jangan ubah.
---

# Skill: Ops Docker

## Context Cepat (Wajib)
- Target: Dockerfile di `apps/api/` dan/atau `apps/worker/`
- Stack: Hono + Bun + TypeScript
- **JANGAN sentuh docker-compose.yml** — dikelola oleh server

## Prinsip

- Multi-stage build untuk meminimalkan image size
- Stage `builder`: install deps + compile
- Stage `runner`: hanya artifact runtime
- Gunakan `bun` sebagai runtime (bukan Node.js)
- Jalankan sebagai non-root user

## Alur Kerja

1. Identifikasi app target dan kebutuhan runtime-nya.
2. Pastikan dependency monorepo yang dibutuhkan ikut ter-copy di builder stage.
3. Build artifact target di stage `builder`.
4. Copy artifact minimum ke stage `runner`.
5. Verifikasi `CMD`, port, dan kebutuhan Prisma/runtime lain sebelum selesai.

## Template Dockerfile (Hono API)

```dockerfile
# Stage 1: Builder
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
COPY packages/ ./packages/
RUN bun install --frozen-lockfile

# Copy source dan build
COPY apps/api/ ./apps/api/
RUN cd apps/api && bun run build

# Stage 2: Runner
FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy hanya yang dibutuhkan
COPY --from=builder --chown=appuser:appgroup /app/apps/api/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/apps/api/package.json ./

EXPOSE 3000
CMD ["bun", "run", "dist/index.js"]
```

## Template Dockerfile (BullMQ Worker)

```dockerfile
FROM oven/bun:1-alpine AS builder
WORKDIR /app

COPY package.json bun.lockb ./
COPY packages/ ./packages/
RUN bun install --frozen-lockfile

COPY apps/worker/ ./apps/worker/
RUN cd apps/worker && bun run build

FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder --chown=appuser:appgroup /app/apps/worker/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/apps/worker/package.json ./

CMD ["bun", "run", "dist/index.js"]
```

## Aturan

- Selalu `--frozen-lockfile` saat install di CI/container
- Jangan copy `.env` ke dalam image — inject via environment variable saat runtime
- Jangan expose port yang tidak dipakai
- Jika Prisma dipakai, pastikan `prisma generate` dijalankan di builder stage

## Larangan

- **DILARANG** mengubah `docker-compose.yml`.
- **DILARANG** menjalankan container sebagai root jika tidak benar-benar diperlukan.
- **DILARANG** copy seluruh repo ke runner stage jika hanya sebagian artifact yang dibutuhkan.
- **DILARANG** meninggalkan Dockerfile yang tidak bisa dibuild secara deterministik.

## Checklist Sebelum Selesai

- [ ] Dockerfile memakai multi-stage build
- [ ] Runner stage hanya berisi artifact runtime minimum
- [ ] User non-root dipakai
- [ ] Port dan command runtime sesuai app target
- [ ] Build container sudah diverifikasi atau alasannya dicatat
- [ ] Semua file diakhiri newline (EOF)
