#!/usr/bin/env node
import { execSync } from "node:child_process";

const status = execSync("git status --porcelain", { encoding: "utf8" });
if (status.trim().length > 0) {
  console.error("作業ツリーに未コミットの変更があります。先にcommitしてください。");
  console.error(status);
  process.exit(1);
}

const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
const tag = `post-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;

execSync(`git tag ${tag}`, { stdio: "inherit" });
execSync(`git push origin ${tag}`, { stdio: "inherit" });
console.log(`Released ${tag}`);
