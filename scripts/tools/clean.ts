import * as path from "path";
import * as Config from "./config";
import * as rimraf from "rimraf";
import * as logger from "./logger";

const remove = (filename: string) => {
  logger.log(`remove ${filename}`);
  rimraf.sync(filename);
};

export const clean = (key: string) => {
  const endpointJsonFile = path.join(Config.endpointsOutputDir, key + ".json");
  const tsFile = path.join(Config.sourceDir, key + ".ts");
  const libDir = path.join(Config.libDir, key);
  remove(endpointJsonFile);
  remove(tsFile);
  remove(libDir);
  remove(path.join(Config.libDir, key));
  remove(path.join(Config.libCjsDir, key + "*"));
  remove(path.join(Config.libEsmDir, key + "*"));
  remove(path.join(Config.libTypesDir, key + "*"));

  return {
    endpointJsonFile,
    tsFile,
  };
};
