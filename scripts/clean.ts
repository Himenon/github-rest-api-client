import * as Logger from "./tools/logger.ts";
import * as Config from "./tools/config.ts";
import { rimrafSync } from "rimraf";

const remove = (filename: string) => {
  Logger.info(`remove: ${filename}`);
  rimrafSync(filename);
};

const main = () => {
  remove(Config.distDir);
  remove(Config.docsDir);
  remove(Config.libDir);
  remove(Config.sourceDir);
  console.log("clean up!");
};

main();
