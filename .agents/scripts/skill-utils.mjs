import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"

export const repoRoot = process.cwd()
export const agentsRoot = path.join(repoRoot, ".agents")
export const skillsRoot = path.join(agentsRoot, "skills")
export const claudeSkillsRoot = path.join(repoRoot, ".claude", "skills")
export const manifestPath = path.join(skillsRoot, "manifest.json")
export const packageJsonPath = path.join(repoRoot, "package.json")

export const scopeLabels = {
  frontend: "Frontend",
  backend: "Backend",
  docs: "Docs",
  ops: "Ops",
  flow: "Flow",
  meta: "Meta",
}

const manifestSortOrder = {
  frontend: 0,
  backend: 1,
  docs: 2,
  ops: 3,
  flow: 4,
  meta: 5,
}

export function readText(filePath) {
  return readFileSync(filePath, "utf8")
}

export function writeText(filePath, content) {
  mkdirSync(path.dirname(filePath), { recursive: true })
  const normalized = content.endsWith("\n") ? content : `${content}\n`
  writeFileSync(filePath, normalized, "utf8")
}

export function parseSkillFrontmatter(markdown, filePath = "SKILL.md") {
  const match = markdown.match(/^---\nname:\s*(.+)\ndescription:\s*(.+)\n---/)
  if (!match) {
    throw new Error(`Invalid skill frontmatter in ${filePath}`)
  }

  const normalizeValue = (value) => value.trim().replace(/^"(.*)"$/, "$1")

  return {
    name: normalizeValue(match[1]),
    description: normalizeValue(match[2]),
  }
}

export function listSkillDirectories() {
  return readdirSync(skillsRoot)
    .filter((entry) => statSync(path.join(skillsRoot, entry)).isDirectory())
    .sort()
}

export function listSkillRecords() {
  return listSkillDirectories().map((directory) => {
    const skillPath = path.join(skillsRoot, directory, "SKILL.md")
    const markdown = readText(skillPath)
    const frontmatter = parseSkillFrontmatter(markdown, skillPath)

    return {
      directory,
      dirPath: path.join(skillsRoot, directory),
      skillPath,
      ...frontmatter,
    }
  })
}

export function readManifest() {
  return JSON.parse(readText(manifestPath))
}

export function writeManifest(manifest) {
  writeText(manifestPath, JSON.stringify(manifest, null, 2))
}

export function sortManifestSkills(skills) {
  return [...skills].sort((left, right) => {
    const leftScope = manifestSortOrder[left.scope] ?? Number.MAX_SAFE_INTEGER
    const rightScope = manifestSortOrder[right.scope] ?? Number.MAX_SAFE_INTEGER

    if (leftScope !== rightScope) {
      return leftScope - rightScope
    }

    return left.name.localeCompare(right.name)
  })
}

export function titleFromSkillName(name) {
  return name
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export function escapeDoubleQuotedYaml(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

export function createOpenAiYamlContent({
  displayName,
  shortDescription,
  defaultPrompt,
  allowImplicitInvocation = true,
}) {
  return [
    "interface:",
    `  display_name: "${escapeDoubleQuotedYaml(displayName)}"`,
    `  short_description: "${escapeDoubleQuotedYaml(shortDescription)}"`,
    `  default_prompt: "${escapeDoubleQuotedYaml(defaultPrompt)}"`,
    "policy:",
    `  allow_implicit_invocation: ${allowImplicitInvocation ? "true" : "false"}`,
    "",
  ].join("\n")
}

export function createClaudeWrapperContent({ name, description }) {
  return [
    "---",
    `name: "${name}"`,
    `description: "${description}"`,
    "---",
    "",
    `Source of truth ada di \`.agents/skills/${name}/SKILL.md\`.`,
    "",
    "Saat skill ini dipakai:",
    `1. Baca \`.agents/skills/${name}/SKILL.md\`.`,
    "2. Ikuti workflow dan aturan di file tersebut.",
    "3. Baca file turunan yang direferensikan (`references/context.md`, `templates/checklist.md`) dari folder source of truth.",
    "",
  ].join("\n")
}

export function createSkillSectionReference(name) {
  return `- Untuk skill \`${name}\`: \`.agents/skills/${name}/SKILL.md\``
}

export function scopeLabel(scope) {
  const label = scopeLabels[scope]
  if (!label) {
    throw new Error(`Unknown scope: ${scope}`)
  }

  return label
}

export function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function replaceMarkedSection(
  markdown,
  startMarker,
  endMarker,
  content,
) {
  const start = markdown.indexOf(startMarker)
  const end = markdown.indexOf(endMarker)

  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Invalid marked section: ${startMarker} .. ${endMarker}`)
  }

  const before = markdown.slice(0, start + startMarker.length)
  const after = markdown.slice(end)

  return `${before}\n${content}\n${after}`
}

export function extractMarkedSection(markdown, startMarker, endMarker) {
  const start = markdown.indexOf(startMarker)
  const end = markdown.indexOf(endMarker)

  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Invalid marked section: ${startMarker} .. ${endMarker}`)
  }

  return markdown.slice(start + startMarker.length, end).trim()
}

export function renderSkillRegistryTable(entries) {
  const lines = ["| Skill | Scope | Kapan Dipakai |", "|---|---|---|"]

  for (const entry of entries) {
    const whenToUse = entry.whenToUse ?? entry.description
    lines.push(
      `| \`${entry.name}\` | ${scopeLabel(entry.scope)} | ${whenToUse} |`,
    )
  }

  return lines.join("\n")
}

export function renderSkillReferenceList(entries) {
  return entries
    .map((entry) => createSkillSectionReference(entry.name))
    .join("\n")
}

export function upsertTableRow(markdown, sectionHeading, rowKey, rowText) {
  const lines = markdown.split("\n")
  const headingIndex = lines.findIndex((line) => line.trim() === sectionHeading)
  if (headingIndex === -1) {
    throw new Error(`Section not found: ${sectionHeading}`)
  }

  const tableStart = lines.findIndex(
    (line, index) => index > headingIndex && line.trim().startsWith("|"),
  )
  if (tableStart === -1) {
    throw new Error(`Table not found after section: ${sectionHeading}`)
  }

  let tableEnd = tableStart
  while (tableEnd < lines.length && lines[tableEnd].trim().startsWith("|")) {
    tableEnd += 1
  }

  const rowPattern = new RegExp(`\\|\\s*\\\`${escapeRegExp(rowKey)}\\\`\\s*\\|`)
  const rowIndex = lines.findIndex(
    (line, index) =>
      index >= tableStart && index < tableEnd && rowPattern.test(line),
  )

  if (rowIndex >= 0) {
    lines[rowIndex] = rowText
  } else {
    lines.splice(tableEnd, 0, rowText)
  }

  return lines.join("\n")
}

export function upsertSkillReference(markdown, name, lineText) {
  const lines = markdown.split("\n")
  const headingIndex = lines.findIndex(
    (line) => line.trim() === "### SKILL (Hanya Baca Jika Kamu Butuh)",
  )
  if (headingIndex === -1) {
    throw new Error("Section not found: ### SKILL (Hanya Baca Jika Kamu Butuh)")
  }

  let sectionEnd = lines.findIndex(
    (line, index) => index > headingIndex && /^###\s+/.test(line.trim()),
  )
  if (sectionEnd === -1) {
    sectionEnd = lines.length
  }

  const marker = `.agents/skills/${name}/SKILL.md`
  const existingIndex = lines.findIndex(
    (line, index) =>
      index > headingIndex && index < sectionEnd && line.includes(marker),
  )

  if (existingIndex >= 0) {
    lines[existingIndex] = lineText
  } else {
    let insertIndex = sectionEnd
    while (
      insertIndex > headingIndex + 1 &&
      lines[insertIndex - 1].trim() === ""
    ) {
      insertIndex -= 1
    }
    lines.splice(insertIndex, 0, lineText)
  }

  return lines.join("\n")
}
