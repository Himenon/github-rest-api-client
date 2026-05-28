import { shell } from "./shell.ts";
import * as fs from "fs";

export interface Params {
  url: string;
  outputLocalDir: string;
  repoDir: string;
}

export const gitSparseClone = async ({ url, outputLocalDir, repoDir }: Params): Promise<void> => {
  fs.mkdirSync(outputLocalDir, { recursive: true });
  const cwd = outputLocalDir;
  await shell(`git clone --filter=blob:none --no-checkout ${url} .`, cwd);
  await shell(`git sparse-checkout set ${repoDir}`, cwd);
  await shell(`git config pull.ff only`, cwd);
  await shell(`git pull origin master`);
};
