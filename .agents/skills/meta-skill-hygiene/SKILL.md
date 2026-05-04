---
name: meta-skill-hygiene
description: Mengaudit, menyinkronkan, dan menjaga konsistensi metadata skill di repo ini. Gunakan saat ada perubahan skill, registry, wrapper, atau metadata agent.
---

# Skill: Meta Skill Hygiene

## Context Cepat (Wajib)
- Scope + file target: `references/context.md`
- Checklist eksekusi: `templates/checklist.md`

Gunakan skill ini untuk menjaga semua assets skill tetap sinkron: `SKILL.md`, `manifest.json`, `agents/openai.yaml`, wrapper Claude, dan registry di `AGENTS.md` / `CLAUDE.md`.

## Alur Kerja

1. Identifikasi source of truth yang berubah:
   - `SKILL.md` untuk nama dan deskripsi
   - `manifest.json` untuk `scope`, `path`, dan `whenToUse`
   - `agents/openai.yaml` untuk metadata Codex/OpenAI
2. Jika ada skill baru atau rename, scaffold/update source of truth terlebih dahulu.
3. Jalankan `bun run skills:sync` untuk regenerate registry dan wrapper Claude.
4. Jalankan `bun run skills:validate` untuk memastikan tidak ada drift atau file yang hilang.
5. Jika validasi gagal, perbaiki source of truth, lalu sync dan validate ulang.

## Larangan

- **DILARANG** menjadikan wrapper Claude atau section generated di registry sebagai source of truth.
- **DILARANG** mengedit blok di antara marker `<!-- skill-registry:* -->` atau `<!-- skill-links:* -->` tanpa menjalankan sync ulang.
- **DILARANG** memperbaiki drift dengan mengubah output generated saja; perbaiki file sumbernya.
- **DILARANG** membiarkan `manifest.json` tanpa `whenToUse` untuk skill apa pun.

## Checklist Sebelum Selesai

- [ ] Source of truth perubahan sudah jelas
- [ ] `bun run skills:sync` sudah dijalankan
- [ ] `bun run skills:validate` pass
- [ ] Tidak ada drift antara manifest, wrapper, dan registry
- [ ] Semua file diakhiri newline (EOF)
