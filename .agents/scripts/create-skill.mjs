import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import path from "node:path"
import {
  createClaudeWrapperContent,
  createOpenAiYamlContent,
  manifestPath,
  parseSkillFrontmatter,
  readManifest,
  readText,
  repoRoot,
  sortManifestSkills,
  titleFromSkillName,
  writeManifest,
  writeText,
} from "./skill-utils.mjs"

const writeStdout = (message) => process.stdout.write(`${message}\n`)
const writeStderr = (message) => process.stderr.write(`${message}\n`)

const validScopes = new Set([
  "frontend",
  "backend",
  "docs",
  "ops",
  "flow",
  "meta",
])

function printHelp() {
  writeStdout(
    `Usage:\n  bun run skills:create -- --name <scope-capability> --scope <scope> --description "..." [options]\n\nOptions:\n  --name <value>                Skill name in kebab-case\n  --scope <value>               One of: frontend, backend, docs, ops, flow, meta\n  --description <value>         Canonical description used in SKILL.md and manifest\n  --title <value>               H1 title for SKILL.md and default display name\n  --display-name <value>        display_name for agents/openai.yaml\n  --short-description <value>   short_description for agents/openai.yaml\n  --default-prompt <value>      default_prompt for agents/openai.yaml\n  --when <value>                Skill Registry text for "Kapan Dipakai"\n  --dry-run                     Print planned changes without writing files\n  --help                        Show this help\n`,
  )
}

function parseArgs(argv) {
  const result = { dryRun: false }

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index]
    if (!current.startsWith("--")) {
      throw new Error(`Unexpected argument: ${current}`)
    }

    const key = current.slice(2)
    if (key === "dry-run" || key === "help") {
      result[key === "dry-run" ? "dryRun" : "help"] = true
      continue
    }

    const next = argv[index + 1]
    if (!next || next.startsWith("--")) {
      throw new Error(`Missing value for --${key}`)
    }

    result[key] = next
    index += 1
  }

  return result
}

function ensureValidName(name) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(name)) {
    throw new Error(
      "Skill name must be kebab-case and contain at least one dash",
    )
  }
}

function buildSkillMarkdown({ name, description, title }) {
  return `---\nname: ${name}\ndescription: ${description}\n---\n\n# Skill: ${title}\n\n## Context Cepat (Wajib)\n- Folder scope + konvensi: \`references/context.md\`\n- Checklist eksekusi: \`templates/checklist.md\`\n\nGunakan skill ini saat task membutuhkan workflow ${title.toLowerCase()} yang konsisten untuk repo ini. Lengkapi detail konteks, examples, dan checklist sesuai scope skill sebelum dipakai luas.\n\n## Alur Kerja\n\n1. Baca requirement dan batasan task yang akan ditangani skill ini.\n2. Perbarui \`references/context.md\` dengan folder target, examples, dan pattern penting yang relevan.\n3. Jalankan perubahan utama mengikuti scope skill ini.\n4. Review hasil akhir memakai \`templates/checklist.md\` sebelum selesai.\n\n## Larangan\n\n- **DILARANG** mengubah file di luar scope skill tanpa alasan task yang jelas.\n- **DILARANG** menyisakan placeholder, path salah, atau instruksi yang bertentangan dengan aturan repo.\n- **DILARANG** memindahkan instruksi utama skill ke \`agents/openai.yaml\` karena source of truth tetap di \`SKILL.md\`.\n\n## Checklist Sebelum Selesai\n\n- [ ] Scope task tervalidasi\n- [ ] \`references/context.md\` menjelaskan folder target dan pattern penting\n- [ ] \`templates/checklist.md\` mencakup langkah verifikasi utama\n- [ ] Metadata skill konsisten di semua file\n- [ ] Semua file diakhiri newline (EOF)\n`
}

function buildContextMarkdown(title) {
  return `# Context: ${title}\n\n## Folder Target\n\n- Tambahkan folder utama yang biasanya disentuh skill ini.\n- Tambahkan file atau subtree penting yang perlu dibaca sebelum eksekusi.\n\n## Contoh Kode Nyata\n\n- Tambahkan referensi example yang paling relevan dari \`.agents/examples/\` jika ada.\n- Jika belum ada, tulis pattern existing code yang harus ditiru.\n\n## Pattern Penting\n\n- Ringkas keputusan arsitektur, naming, dan anti-pattern yang harus dihindari.\n- Tambahkan command atau file referensi yang selalu wajib dicek saat skill ini dipakai.\n`
}

function buildChecklistMarkdown(title) {
  return `# Checklist: ${title}\n\n## Persiapan\n\n- [ ] Baca \`.agents/settings.json\`\n- [ ] Baca \`references/context.md\`\n- [ ] Validasi scope task memang cocok untuk skill ini\n\n## Eksekusi\n\n- [ ] Perubahan utama mengikuti workflow di \`SKILL.md\`\n- [ ] Tidak ada file di luar scope yang berubah tanpa alasan\n- [ ] Referensi examples atau guides yang relevan sudah dipakai\n\n## Finalisasi\n\n- [ ] Metadata skill masih konsisten\n- [ ] Tidak ada placeholder atau TODO yang tertinggal\n- [ ] Semua file diakhiri newline (EOF)\n`
}

function planFiles({
  name,
  description,
  title,
  displayName,
  shortDescription,
  defaultPrompt,
}) {
  return [
    {
      path: path.join(repoRoot, ".agents", "skills", name, "SKILL.md"),
      content: buildSkillMarkdown({ name, description, title }),
    },
    {
      path: path.join(
        repoRoot,
        ".agents",
        "skills",
        name,
        "references",
        "context.md",
      ),
      content: buildContextMarkdown(title),
    },
    {
      path: path.join(
        repoRoot,
        ".agents",
        "skills",
        name,
        "templates",
        "checklist.md",
      ),
      content: buildChecklistMarkdown(title),
    },
    {
      path: path.join(
        repoRoot,
        ".agents",
        "skills",
        name,
        "agents",
        "openai.yaml",
      ),
      content: createOpenAiYamlContent({
        displayName,
        shortDescription,
        defaultPrompt,
      }),
    },
    {
      path: path.join(repoRoot, ".claude", "skills", name, "SKILL.md"),
      content: createClaudeWrapperContent({ name, description }),
    },
  ]
}

try {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printHelp()
    process.exit(0)
  }

  const name = args.name
  const scope = args.scope
  const description = args.description

  if (!name || !scope || !description) {
    printHelp()
    throw new Error("Arguments --name, --scope, and --description are required")
  }

  ensureValidName(name)
  if (!validScopes.has(scope)) {
    throw new Error(`Invalid scope: ${scope}`)
  }

  const manifest = readManifest()
  if (manifest.skills.some((entry) => entry.name === name)) {
    throw new Error(`Skill already exists in manifest: ${name}`)
  }

  const skillDir = path.join(repoRoot, ".agents", "skills", name)
  if (existsSync(skillDir)) {
    throw new Error(
      `Skill directory already exists: ${path.relative(repoRoot, skillDir)}`,
    )
  }

  const title = args.title ?? titleFromSkillName(name)
  const displayName = args["display-name"] ?? title
  const shortDescription = args["short-description"] ?? description
  const defaultPrompt =
    args["default-prompt"] ??
    `Use $${name} to execute the ${title} workflow for this repository.`
  const whenToUse = args.when ?? description

  const files = planFiles({
    name,
    description,
    title,
    displayName,
    shortDescription,
    defaultPrompt,
  })

  const updatedManifest = {
    ...manifest,
    skills: sortManifestSkills([
      ...manifest.skills,
      {
        name,
        description,
        scope,
        whenToUse,
        path: `.agents/skills/${name}`,
      },
    ]),
  }

  const agentsPath = path.join(repoRoot, ".agents", "AGENTS.md")
  const claudePath = path.join(repoRoot, "CLAUDE.md")

  if (args.dryRun) {
    writeStdout(`Dry run: would create skill ${name}`)
    for (const file of files) {
      writeStdout(`- write ${path.relative(repoRoot, file.path)}`)
    }
    writeStdout(`- update ${path.relative(repoRoot, manifestPath)}`)
    writeStdout(`- update ${path.relative(repoRoot, agentsPath)}`)
    writeStdout(`- update ${path.relative(repoRoot, claudePath)}`)
    process.exit(0)
  }

  for (const file of files) {
    writeText(file.path, file.content)
  }
  writeManifest(updatedManifest)

  execFileSync(
    process.execPath,
    [path.join(repoRoot, ".agents", "scripts", "sync-skill-registry.mjs")],
    {
      cwd: repoRoot,
      stdio: "inherit",
    },
  )
  execFileSync(
    process.execPath,
    [path.join(repoRoot, ".agents", "scripts", "sync-claude-skills.mjs")],
    {
      cwd: repoRoot,
      stdio: "inherit",
    },
  )
  execFileSync(
    process.execPath,
    [path.join(repoRoot, ".agents", "scripts", "validate-skills.mjs")],
    {
      cwd: repoRoot,
      stdio: "inherit",
    },
  )

  const createdSkill = parseSkillFrontmatter(
    readText(path.join(skillDir, "SKILL.md")),
  )
  writeStdout(
    `Created skill ${createdSkill.name} at .agents/skills/${createdSkill.name}`,
  )
} catch (error) {
  writeStderr(error.message)
  process.exit(1)
}
