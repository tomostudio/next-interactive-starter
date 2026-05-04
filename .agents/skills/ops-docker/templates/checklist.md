# Checklist: ops-docker

## Persiapan

- [ ] Identifikasi target: `apps/api` dan/atau `apps/worker`
- [ ] Cek apakah Prisma dipakai di target app
- [ ] Cek port yang diexpose di source code

## Dockerfile

- [ ] Multi-stage build (builder + runner)
- [ ] Base image: `oven/bun:1-alpine`
- [ ] `--frozen-lockfile` saat `bun install`
- [ ] Packages monorepo (`packages/`) di-copy di builder stage
- [ ] Build artifact di-copy dari builder ke runner
- [ ] Jika Prisma: `prisma generate` dijalankan di builder
- [ ] Non-root user dibuat dan digunakan di runner stage
- [ ] `ENV NODE_ENV=production` di runner stage
- [ ] `EXPOSE` sesuai port yang dipakai
- [ ] `CMD` menjalankan compiled artifact

## Keamanan

- [ ] Tidak ada `.env` atau credential di dalam image
- [ ] Non-root user
- [ ] Tidak ada dev dependencies di runner stage

## Validasi

- [ ] Build berhasil: `docker build -f apps/{app}/Dockerfile -t test:latest .`
- [ ] Container berjalan: `docker run --rm -e ... test:latest`
- [ ] Image size wajar (< 300MB untuk Bun Alpine)

## Finalisasi

- [ ] Dockerfile diakhiri newline (EOF)
- [ ] `.dockerignore` ada di root jika belum
- [ ] **TIDAK mengubah docker-compose.yml**
