import { existsSync } from "node:fs"
import path from "node:path"
import {
  agentsRoot,
  claudeSkillsRoot,
  extractMarkedSection,
  listSkillRecords,
  packageJsonPath,
  parseSkillFrontmatter,
  readManifest,
  readText,
  renderSkillReferenceList,
  renderSkillRegistryTable,
  repoRoot,
} from "./skill-utils.mjs"

const writeStdout = (message) => process.stdout.write(`${message}\n`)
const writeStderr = (message) => process.stderr.write(`${message}\n`)

const errors = []
const requiredScripts = {
  "skills:create": "node .agents/scripts/create-skill.mjs",
  "skills:sync": "bun run skills:sync-registry && bun run skills:sync-claude",
  "skills:sync-claude": "node .agents/scripts/sync-claude-skills.mjs",
  "skills:sync-registry": "node .agents/scripts/sync-skill-registry.mjs",
  "skills:validate": "node .agents/scripts/validate-skills.mjs",
}
const requiredSkillSections = [
  "## Context Cepat",
  "## Alur Kerja",
  "## Larangan",
  "## Checklist Sebelum Selesai",
]
const requiredSkillFiles = [
  "SKILL.md",
  path.join("agents", "openai.yaml"),
  path.join("references", "context.md"),
  path.join("templates", "checklist.md"),
]

function addError(message) {
  errors.push(message)
}

function validatePackageScripts() {
  const packageJson = JSON.parse(readText(packageJsonPath))
  for (const [scriptName, expectedCommand] of Object.entries(requiredScripts)) {
    if (!packageJson.scripts?.[scriptName]) {
      addError(`package.json missing script: ${scriptName}`)
      continue
    }

    if (packageJson.scripts[scriptName] !== expectedCommand) {
      addError(
        `package.json script ${scriptName} should be \`${expectedCommand}\``,
      )
    }
  }
}

function validateRootBridges() {
  const rootAgents = readText(path.join(repoRoot, "AGENTS.md"))
  if (!rootAgents.includes(".agents/AGENTS.md")) {
    addError("AGENTS.md should bridge to .agents/AGENTS.md")
  }

  const claude = readText(path.join(repoRoot, "CLAUDE.md"))
  if (!claude.includes("@.agents/AGENTS.md")) {
    addError("CLAUDE.md should reference .agents/AGENTS.md")
  }
}

function validateSkillFiles(skill) {
  for (const relativeFile of requiredSkillFiles) {
    const absolutePath = path.join(skill.dirPath, relativeFile)
    if (!existsSync(absolutePath)) {
      addError(`${skill.directory} missing required file: ${relativeFile}`)
    }
  }

  if (skill.directory !== skill.name) {
    addError(
      `${skill.directory} frontmatter name should match folder name (${skill.name})`,
    )
  }

  const skillMarkdown = readText(skill.skillPath)
  for (const section of requiredSkillSections) {
    if (!skillMarkdown.includes(section)) {
      addError(`${skill.name} missing section: ${section}`)
    }
  }

  const openAiYamlPath = path.join(skill.dirPath, "agents", "openai.yaml")
  const yaml = readText(openAiYamlPath)
  if (!/^interface:\n/m.test(yaml)) {
    addError(`${skill.name} openai.yaml missing interface block`)
  }
  if (!/^\s{2}display_name:\s+".+"$/m.test(yaml)) {
    addError(`${skill.name} openai.yaml missing interface.display_name`)
  }
  if (!/^\s{2}short_description:\s+".+"$/m.test(yaml)) {
    addError(`${skill.name} openai.yaml missing interface.short_description`)
  }
  if (!/^\s{2}default_prompt:\s+".+"$/m.test(yaml)) {
    addError(`${skill.name} openai.yaml missing interface.default_prompt`)
  }
  if (!/^policy:\n/m.test(yaml)) {
    addError(`${skill.name} openai.yaml missing policy block`)
  }
  if (!/^\s{2}allow_implicit_invocation:\s+true$/m.test(yaml)) {
    addError(
      `${skill.name} openai.yaml should set policy.allow_implicit_invocation: true`,
    )
  }

  const wrapperPath = path.join(claudeSkillsRoot, skill.name, "SKILL.md")
  if (!existsSync(wrapperPath)) {
    addError(
      `${skill.name} missing Claude wrapper: ${path.relative(repoRoot, wrapperPath)}`,
    )
    return
  }

  const wrapper = parseSkillFrontmatter(readText(wrapperPath), wrapperPath)
  if (wrapper.name !== skill.name) {
    addError(`${skill.name} Claude wrapper name mismatch`)
  }
  if (wrapper.description !== skill.description) {
    addError(`${skill.name} Claude wrapper description mismatch`)
  }
}

function validateManifest(skills) {
  const manifest = readManifest()
  const entries = manifest.skills ?? []
  const entryMap = new Map(entries.map((entry) => [entry.name, entry]))
  const seen = new Set()

  for (const entry of entries) {
    if (seen.has(entry.name)) {
      addError(`manifest has duplicate skill entry: ${entry.name}`)
    }
    seen.add(entry.name)
  }

  for (const skill of skills) {
    const entry = entryMap.get(skill.name)
    if (!entry) {
      addError(`manifest missing skill entry: ${skill.name}`)
      continue
    }

    if (entry.path !== `.agents/skills/${skill.name}`) {
      addError(
        `${skill.name} manifest path should be .agents/skills/${skill.name}`,
      )
    }
    if (entry.description !== skill.description) {
      addError(`${skill.name} manifest description mismatch`)
    }
    if (typeof entry.whenToUse !== "string" || entry.whenToUse.trim() === "") {
      addError(`${skill.name} manifest whenToUse should be a non-empty string`)
    }
  }

  for (const entry of entries) {
    if (!skills.some((skill) => skill.name === entry.name)) {
      addError(`manifest has entry without folder: ${entry.name}`)
    }
  }
}

function validateRegistries(manifestEntries) {
  const agents = readText(path.join(agentsRoot, "AGENTS.md"))
  const claude = readText(path.join(repoRoot, "CLAUDE.md"))
  const expectedRegistry = renderSkillRegistryTable(manifestEntries).trim()
  const expectedSkillLinks = renderSkillReferenceList(manifestEntries).trim()

  if (!agents.includes("## Skill Registry")) {
    addError(".agents/AGENTS.md missing Skill Registry section")
  }
  if (!claude.includes("## Skill Registry")) {
    addError("CLAUDE.md missing Skill Registry section")
  }
  if (
    !agents.includes("<!-- skill-registry:start -->") ||
    !agents.includes("<!-- skill-registry:end -->")
  ) {
    addError(".agents/AGENTS.md missing skill registry markers")
  }
  if (
    !agents.includes("<!-- skill-links:start -->") ||
    !agents.includes("<!-- skill-links:end -->")
  ) {
    addError(".agents/AGENTS.md missing skill links markers")
  }
  if (
    !claude.includes("<!-- skill-registry:start -->") ||
    !claude.includes("<!-- skill-registry:end -->")
  ) {
    addError("CLAUDE.md missing skill registry markers")
  }

  try {
    const actualAgentsRegistry = extractMarkedSection(
      agents,
      "<!-- skill-registry:start -->",
      "<!-- skill-registry:end -->",
    )
    if (actualAgentsRegistry !== expectedRegistry) {
      addError(
        ".agents/AGENTS.md skill registry is out of sync with manifest.json",
      )
    }
  } catch (error) {
    addError(error.message)
  }

  try {
    const actualAgentsLinks = extractMarkedSection(
      agents,
      "<!-- skill-links:start -->",
      "<!-- skill-links:end -->",
    )
    if (actualAgentsLinks !== expectedSkillLinks) {
      addError(
        ".agents/AGENTS.md skill links are out of sync with manifest.json",
      )
    }
  } catch (error) {
    addError(error.message)
  }

  try {
    const actualClaudeRegistry = extractMarkedSection(
      claude,
      "<!-- skill-registry:start -->",
      "<!-- skill-registry:end -->",
    )
    if (actualClaudeRegistry !== expectedRegistry) {
      addError("CLAUDE.md skill registry is out of sync with manifest.json")
    }
  } catch (error) {
    addError(error.message)
  }
}

validatePackageScripts()
validateRootBridges()

const skills = listSkillRecords()
const manifest = readManifest()
validateManifest(skills)
validateRegistries(manifest.skills ?? [])
for (const skill of skills) {
  validateSkillFiles(skill)
}

if (errors.length > 0) {
  writeStderr(`Skill validation failed with ${errors.length} issue(s):`)
  for (const error of errors) {
    writeStderr(`- ${error}`)
  }
  process.exit(1)
}

writeStdout(
  `Validated ${skills.length} skills, manifest, wrappers, and registry references.`,
)
