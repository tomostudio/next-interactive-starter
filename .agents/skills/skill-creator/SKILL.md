---
name: skill-creator
description: Membuat skill baru dari nol dengan struktur lengkap — SKILL.md, references, templates, openai.yaml, Claude wrapper, dan registrasi di manifest + AGENTS.md + CLAUDE.md. Gunakan saat user ingin menambahkan capability baru ke agent system.
---

# Skill: Skill Creator

## Context Cepat (Wajib)
- Folder scope + konvensi: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Buat skill baru yang lengkap dan terdaftar. `SKILL.md` tetap menjadi source of truth, sedangkan `agents/openai.yaml` hanya menyimpan metadata Codex/OpenAI seperti `interface`, `policy`, atau `dependencies`.

## Alur Kerja

### 1. Tentukan Identitas Skill
- **Nama** (kebab-case): `{scope}-{capability}` — misal `web-slicing`, `api-feature`, `flow-breakdown-feature`
- **Scope**: `frontend`, `backend`, `docs`, `ops`, `flow`, atau `meta`
- **Deskripsi satu kalimat**: kapan dipakai dan apa outputnya
- **Trigger**: kondisi/keyword yang mengaktifkan skill ini

### 1a. Gunakan Generator Jika Bisa

Untuk scaffold awal yang langsung compliant, prioritaskan generator:

```bash
bun run skills:create -- \
  --name {scope}-{capability} \
  --scope {scope} \
  --description "{Deskripsi satu kalimat}" \
  --when "{Kapan dipakai di Skill Registry}"
```

Generator akan membuat folder skill, metadata `openai.yaml`, Claude wrapper, update `manifest.json`, dan menambah registry entries.

### 2. Buat Folder & File Skill

Struktur wajib di `.agents/skills/{skill-name}/`:

```
.agents/skills/{skill-name}/
├── SKILL.md                → Definisi skill (nama, deskripsi, alur kerja, larangan, checklist)
├── references/
│   └── context.md          → Folder target, contoh kode, pattern penting
├── templates/
│   └── checklist.md        → Checklist step-by-step eksekusi
└── agents/
    └── openai.yaml         → Metadata Codex/OpenAI (interface, policy, dependencies)
```

#### Format `SKILL.md`
```markdown
---
name: {skill-name}
description: {Deskripsi satu kalimat}
---

# Skill: {Judul}

## Context Cepat (Wajib)
- Folder scope + contoh kode: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

{Satu paragraf penjelasan tujuan skill}

## Alur Kerja

1. ...
2. ...

## Larangan

- **DILARANG** ...

## Checklist Sebelum Selesai

- [ ] ...
```

#### Format `references/context.md`
```markdown
# Context: {Judul Skill}

## Folder Target

\`\`\`
{folder tree yang akan disentuh}
\`\`\`

## Contoh Kode Nyata

Lihat: `.agents/examples/{scope}/{subfolder}/`

## Pattern Penting

{Contoh kode inline untuk pattern utama}
```

#### Format `templates/checklist.md`
```markdown
# Checklist: {Judul Skill}

- [ ] Baca `.agents/settings.json`
- [ ] Baca `.agents/guides/ARCHITECTURE.md`
- [ ] Baca `references/context.md`
- [ ] ...langkah spesifik skill...
- [ ] Semua file diakhiri newline (EOF)
```

#### Format `agents/openai.yaml`
```yaml
interface:
  display_name: "{Judul Pendek Skill}"
  short_description: "{Deskripsi singkat untuk picker skill}"
  default_prompt: "Use $skill-name to {hasil utama skill ini}."
policy:
  allow_implicit_invocation: true
```

### 3. Buat Claude Wrapper

Buat file di `.claude/skills/{skill-name}/SKILL.md`:

```markdown
---
name: "{skill-name}"
description: "{Deskripsi satu kalimat}"
---

Source of truth ada di `.agents/skills/{skill-name}/SKILL.md`.

Saat skill ini dipakai:
1. Baca `.agents/skills/{skill-name}/SKILL.md`.
2. Ikuti workflow dan aturan di file tersebut.
3. Baca file turunan yang direferensikan (`references/context.md`, `templates/checklist.md`) dari folder source of truth.
```

### 4. Daftarkan di `manifest.json`

Tambahkan entry di `.agents/skills/manifest.json`:

```json
{
  "name": "{skill-name}",
  "description": "{Deskripsi satu kalimat}",
  "scope": "{scope}",
  "path": ".agents/skills/{skill-name}"
}
```

### 5. Update `AGENTS.md`

Di `.agents/AGENTS.md`, tambahkan:
- Baris di **Skill Registry** table (nama, scope, kapan dipakai)
- Link referensi di section **SKILL** (kapan baca SKILL.md-nya)

### 6. Update `CLAUDE.md`

Di `CLAUDE.md` root:
- Tambahkan baris di **Skill Registry** table
- Tambahkan entry trigger di system-reminder (jika Claude SDK dipakai)

### 7. Sinkronkan Claude Wrapper

Setelah skill baru dibuat atau diubah, jalankan:

```bash
bun run skills:sync
```

### 8. Validasi Skill Assets

Sebelum menganggap selesai, jalankan:

```bash
bun run skills:validate
```

## Larangan

- **DILARANG** skip Claude wrapper — selalu buat `.claude/skills/{name}/SKILL.md`.
- **DILARANG** buat skill tanpa registrasi di `manifest.json`.
- **DILARANG** gunakan nama skill yang ambigu — harus `{scope}-{capability}`.
- **DILARANG** duplikasi skill yang sudah ada — cek manifest dulu.
- **DILARANG** menaruh instruksi utama skill di `agents/openai.yaml` — instruksi utama tetap di `SKILL.md`.

## Checklist Sebelum Selesai

- [ ] Nama skill ditentukan (kebab-case, `{scope}-{capability}`)
- [ ] `SKILL.md` dibuat dengan frontmatter + alur kerja + larangan + checklist
- [ ] `references/context.md` dibuat dengan folder target + pattern
- [ ] `templates/checklist.md` dibuat dengan step lengkap
- [ ] `agents/openai.yaml` dibuat
- [ ] `.claude/skills/{name}/SKILL.md` dibuat (Claude wrapper)
- [ ] Entry ditambahkan di `manifest.json`
- [ ] `manifest.json` memuat `whenToUse` untuk registry
- [ ] Skill Registry di `.agents/AGENTS.md` dan `CLAUDE.md` tersinkron dari script
- [ ] `bun run skills:sync` dijalankan
- [ ] `bun run skills:validate` pass
- [ ] Semua file diakhiri newline (EOF)
