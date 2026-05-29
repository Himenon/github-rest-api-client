import * as Config from "./tools/config.ts";
import * as logger from "./tools/logger.ts";
import { shell } from "./tools/shell.ts";
import { convertYamlToJson } from "./tools/convertOAS3yamlToJson.ts";
import * as path from "path";
import chokidar from "chokidar";

const PORT = 4000;

process.env.JAVA_OPTS = "-Dlog.level=warn";

const run = async (endpointName: string) => {
  const outputFilePath = path.join(Config.endpointsOutputDir, `${endpointName}.json`);
  const subprocess = shell(`prism mock -p ${PORT} ${outputFilePath}`);

  await convertYamlToJson({
    filename: path.join(Config.endpointsDir, endpointName, "index.yml"),
    output: outputFilePath,
  });
  let kill: () => void = () => undefined;
  if (subprocess.stdout) {
    subprocess.stdout.pipe(process.stdout);
    kill = () => {
      subprocess.kill("SIGTERM");
    };
  }
  return kill;
};

const main = async () => {
  const endpointName = process.argv[2];
  const endpointDirectory = path.join(Config.endpointsDir, endpointName);
  logger.info(`watch directory ${endpointDirectory}`);
  const watcher = chokidar.watch(endpointDirectory, {
    ignored: /(^|[/\\])\../,
    persistent: true,
  });
  let kill = await run(endpointName);
  watcher.on("change", async () => {
    kill();
    console.log("");
    logger.log("restart");
    kill = await run(endpointName);
  });
};

main().catch(console.error);
