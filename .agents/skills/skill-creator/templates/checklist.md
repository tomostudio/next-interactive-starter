# Checklist: Skill Creator

## Persiapan

- [ ] Baca `.agents/settings.json`
- [ ] Baca `references/context.md`
- [ ] Cek `.agents/skills/manifest.json` — pastikan skill belum ada
- [ ] Tentukan nama skill: kebab-case, format `{scope}-{capability}`
- [ ] Tentukan scope: `frontend` / `backend` / `docs` / `ops` / `flow` / `meta`
- [ ] Tulis deskripsi satu kalimat: apa yang dilakukan + kapan dipakai

## Buat File Skill (`.agents/skills/{name}/`)

- [ ] `SKILL.md` dibuat dengan frontmatter (`name`, `description`)
- [ ] `SKILL.md` punya section: Context Cepat, Alur Kerja, Larangan, Checklist
- [ ] `references/context.md` dibuat — folder target + pattern penting + tabel teknologi
- [ ] `templates/checklist.md` dibuat — semua step terurut dan bisa di-ceklis
- [ ] `agents/openai.yaml` dibuat — metadata Codex/OpenAI (`interface`, `policy`, `dependencies` jika perlu)

## Buat Claude Wrapper (`.claude/skills/{name}/`)

- [ ] `.claude/skills/{name}/SKILL.md` dibuat
- [ ] Isi: frontmatter + pointer ke source of truth + instruksi 3 langkah

## Registrasi

- [ ] Entry ditambahkan di `.agents/skills/manifest.json` (`name`, `description`, `scope`, `path`)
- [ ] Baris ditambahkan di Skill Registry table di `.agents/AGENTS.md`
- [ ] Link referensi ditambahkan di section SKILL di `.agents/AGENTS.md`
- [ ] Baris ditambahkan di Skill Registry table di `CLAUDE.md`
- [ ] Jalankan `bun run skills:create -- --help` jika butuh scaffold command yang benar
- [ ] Field `whenToUse` ditulis di `manifest.json`
- [ ] Jalankan `bun run skills:sync`
- [ ] Jalankan `bun run skills:validate`

## Validasi Akhir

- [ ] Nama skill konsisten di semua file (SKILL.md, Claude wrapper, manifest)
- [ ] Deskripsi konsisten di `SKILL.md`, Claude wrapper, dan manifest
- [ ] `agents/openai.yaml` tidak menduplikasi instruksi utama skill
- [ ] Tidak ada typo di path referensi
- [ ] Semua file diakhiri newline (EOF)
