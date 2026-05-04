import path from "node:path"
import {
  agentsRoot,
  readManifest,
  readText,
  renderSkillReferenceList,
  renderSkillRegistryTable,
  replaceMarkedSection,
  repoRoot,
  sortManifestSkills,
  writeManifest,
  writeText,
} from "./skill-utils.mjs"

const writeStdout = (message) => process.stdout.write(`${message}\n`)

const manifest = readManifest()
manifest.skills = sortManifestSkills(manifest.skills ?? [])
writeManifest(manifest)

const agentsPath = path.join(agentsRoot, "AGENTS.md")
const claudePath = path.join(repoRoot, "CLAUDE.md")

const registryTable = renderSkillRegistryTable(manifest.skills)
const skillReferenceList = renderSkillReferenceList(manifest.skills)

const updatedAgents = replaceMarkedSection(
  replaceMarkedSection(
    readText(agentsPath),
    "<!-- skill-registry:start -->",
    "<!-- skill-registry:end -->",
    registryTable,
  ),
  "<!-- skill-links:start -->",
  "<!-- skill-links:end -->",
  skillReferenceList,
)

const updatedClaude = replaceMarkedSection(
  readText(claudePath),
  "<!-- skill-registry:start -->",
  "<!-- skill-registry:end -->",
  registryTable,
)

writeText(agentsPath, updatedAgents)
writeText(claudePath, updatedClaude)

writeStdout(
  `Synced skill registry sections in ${path.relative(repoRoot, agentsPath)} and ${path.relative(repoRoot, claudePath)}`,
)
