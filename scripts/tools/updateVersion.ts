import * as fs from "fs";
import * as path from "path";
import * as logger from "./logger.ts";
import * as Config from "./config.ts";

export const updateVersion = (endpointFileName: string): void => {
  const pkg = JSON.parse(fs.readFileSync(path.join(Config.pkgRoot, "package.json"), { encoding: "utf-8" }));
  const doc = JSON.parse(fs.readFileSync(endpointFileName, { encoding: "utf-8" }));
  doc.info.version = pkg.version;
  fs.writeFileSync(endpointFileName, JSON.stringify(doc, null, 2), {
    encoding: "utf-8",
  });
  logger.info(`Version Up: ${endpointFileName}`);
};
