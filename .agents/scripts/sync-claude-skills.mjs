import path from "node:path"
import {
  claudeSkillsRoot,
  createClaudeWrapperContent,
  listSkillRecords,
  writeText,
} from "./skill-utils.mjs"

const writeStdout = (message) => process.stdout.write(`${message}\n`)

for (const skill of listSkillRecords()) {
  const wrapperPath = path.join(claudeSkillsRoot, skill.name, "SKILL.md")
  writeText(wrapperPath, createClaudeWrapperContent(skill))
  writeStdout(`Synced ${path.relative(process.cwd(), wrapperPath)}`)
}
