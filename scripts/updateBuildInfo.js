import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const buildInfoPath = path.resolve(__dirname, "../build-info.json");
const buildInfo = JSON.parse(fs.readFileSync(buildInfoPath, "utf-8"));

// Increment build number and update timestamp
buildInfo.buildNumber += 1;
buildInfo.timestamp = new Date().toISOString();

// Write updated build info back to file
fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));

// Create a Git tag for the new build
const tagName = `build-${buildInfo.buildNumber}`;
execSync(`git tag -a ${tagName} -m \"Build ${buildInfo.buildNumber}\"`);
execSync("git push --tags");

console.log(`Updated build info:`, buildInfo);
