# Context: ops-docker

## File Target

```
apps/api/Dockerfile
apps/worker/Dockerfile
```

## Monorepo Structure di Container

```
/app/
├── package.json       ← monorepo root
├── bun.lockb
├── packages/
│   ├── schemas/
│   ├── types/
│   └── utils/
└── apps/
    ├── api/
    └── worker/
```

## Prisma di Docker

Jika `apps/api` menggunakan Prisma, tambahkan di builder stage:

```dockerfile
COPY apps/api/prisma ./apps/api/prisma
RUN cd apps/api && bunx prisma generate
```

Dan di runner stage, copy schema Prisma:
```dockerfile
COPY --from=builder /app/apps/api/prisma ./prisma
```

## Environment Variables

Jangan hardcode di Dockerfile. Inject saat `docker run` atau via orchestrator:

```bash
docker run \
  -e DATABASE_URL="postgresql://..." \
  -e REDIS_URL="redis://..." \
  -p 3000:3000 \
  my-api:latest
```

## Build Command

```bash
# Dari root monorepo
docker build -f apps/api/Dockerfile -t my-api:latest .
docker build -f apps/worker/Dockerfile -t my-worker:latest .
```

Context build harus dari root agar `packages/` bisa di-copy.

## Layer Caching Tips

Urutan COPY yang optimal untuk cache hit:
1. `package.json` + `bun.lockb` (jarang berubah)
2. `packages/` (jarang berubah)
3. `bun install` (cache berdasarkan lockfile)
4. Source code (sering berubah — taruh terakhir)

## .dockerignore

```
node_modules
.env
.env.*
dist
.git
apps/web
docs
```
