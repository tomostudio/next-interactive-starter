import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
)

function readJson(relativePath, fallbackValue) {
  const absolutePath = path.join(repoRoot, relativePath)
  if (!existsSync(absolutePath)) {
    return fallbackValue
  }

  try {
    return JSON.parse(readFileSync(absolutePath, "utf8"))
  } catch {
    return fallbackValue
  }
}

function readText(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath)
  if (!existsSync(absolutePath)) {
    return null
  }

  return readFileSync(absolutePath, "utf8")
}

function runGitCommand(args) {
  try {
    return execFileSync("git", args, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
  } catch {
    return null
  }
}

function parseRegistryEntries(registryMarkdown) {
  if (!registryMarkdown) {
    return []
  }

  return registryMarkdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("| FEAT-"))
    .map((line) => line.split("|").map((segment) => segment.trim()))
    .map((parts) => ({
      id: parts[1] ?? "",
      slug: parts[2] ?? "",
      name: parts[3] ?? "",
      status: parts[4] ?? "",
      area: parts[5] ?? "",
      createdDate: parts[6] ?? "",
    }))
}

const settings = readJson(".agents/settings.json", {})
const onboarding = settings.onboarding ?? {}
const paths = settings.paths ?? {}
const requiredMcpServers = settings.mcp?.required ?? []
const branchConfig = settings.branch ?? {}
const registryPath = paths.registry ?? "docs/features/REGISTRY.md"
const memoryPath = onboarding.memoryPath ?? ".agents/MEMORY.md"
const mcpConfigPath = onboarding.mcpConfigPath ?? ".mcp.json"

const mcpConfig = readJson(mcpConfigPath, null)
const configuredMcpServers =
  mcpConfig && typeof mcpConfig === "object" && mcpConfig.mcpServers
    ? Object.keys(mcpConfig.mcpServers)
    : []
const missingMcpServers = requiredMcpServers.filter(
  (serverName) => !configuredMcpServers.includes(serverName),
)

const registryEntries = parseRegistryEntries(readText(registryPath))
const latestFeature = registryEntries.at(-1) ?? null
const memoryText = readText(memoryPath)
const memorySections = memoryText
  ? memoryText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("## "))
      .map((line) => line.replace(/^##\s+/, ""))
  : []

const currentBranch =
  runGitCommand(["symbolic-ref", "--quiet", "--short", "HEAD"]) ??
  runGitCommand(["rev-parse", "--abbrev-ref", "HEAD"])
const headCommit = runGitCommand(["rev-parse", "--verify", "HEAD"])
const hasCommitHistory = headCommit !== null
const gitStatusOutput = runGitCommand(["status", "--short"])
const changedFiles = gitStatusOutput
  ? gitStatusOutput
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
  : []

const mainBranch = branchConfig.main ?? "main"
const isOnMainBranch =
  currentBranch === null ||
  currentBranch === "" ||
  currentBranch === "HEAD" ||
  currentBranch === mainBranch
const isFreshRepo = !hasCommitHistory && isOnMainBranch
const hasInProgressWorkspace =
  (!isFreshRepo && changedFiles.length > 0) ||
  (currentBranch !== null &&
    currentBranch !== "" &&
    currentBranch !== "HEAD" &&
    currentBranch !== mainBranch)

const possibleFirstInit =
  missingMcpServers.length > 0 &&
  (isFreshRepo || (changedFiles.length === 0 && isOnMainBranch))

const suggestedNextStep = possibleFirstInit
  ? "setup-mcp"
  : hasInProgressWorkspace
    ? "resume-last-task"
    : "breakdown-new-feature"

const payload = {
  project: {
    name: settings.project?.name ?? path.basename(repoRoot),
    version: settings.project?.version ?? null,
  },
  onboarding: {
    startCommands: onboarding.startCommands ?? [],
    possibleFirstInit,
    suggestedNextStep,
  },
  mcp: {
    configPath: mcpConfigPath,
    configExists: configuredMcpServers.length > 0,
    required: requiredMcpServers,
    configured: configuredMcpServers,
    missing: missingMcpServers,
  },
  registry: {
    path: registryPath,
    featureCount: registryEntries.length,
    latestFeature,
  },
  memory: {
    path: memoryPath,
    exists: memoryText !== null,
    sectionCount: memorySections.length,
    sections: memorySections,
  },
  workspace: {
    mainBranch,
    currentBranch,
    hasCommitHistory,
    changedFileCount: changedFiles.length,
    changedFiles: changedFiles.slice(0, 20),
    hasInProgressWorkspace,
  },
}

process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`)
