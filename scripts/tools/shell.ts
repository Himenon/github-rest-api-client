import * as logger from "./logger.ts";
import { execa } from "execa";

export const shell = (command: string, cwd: string = process.cwd()) => {
  logger.info(command);
  return execa(command, {
    stdio: ["pipe", "pipe", "inherit"],
    shell: true,
    cwd,
  });
};
