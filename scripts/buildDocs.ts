import * as Config from "./tools/config.ts";
import * as fs from "fs-extra";
import * as path from "path";
import * as logger from "./tools/logger.ts";
import cpy from "cpy";

const main = async () => {
  const endpointsJson = fs.readdirSync(Config.endpointsOutputDir);
  await cpy([path.join(import.meta.dirname, "templates/swagger-ui/*")], Config.docsDir, {
    ignore: ["index.html.tmpl"],
  });
  const suggestions = endpointsJson.map((endpoint) => `endpoints/${endpoint}`);
  const indexHtml = fs.readFileSync(path.join(import.meta.dirname, "./templates/swagger-ui/index.html.tmpl"), { encoding: "utf-8" });
  fs.writeFileSync(path.join(Config.docsDir, "index.html"), indexHtml.replace("${suggestions}", JSON.stringify(suggestions)));
  logger.log("Generate document ./docs");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
