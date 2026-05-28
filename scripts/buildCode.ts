import * as path from "path";
import * as Config from "./tools/config.ts";
import { generateTsCode } from "./tools/generateTsCode.ts";
import { clean } from "./tools/clean.ts";
import { shell } from "./tools/shell.ts";
import { copyPackageSet } from "./tools/copyPackageSet.ts";

export const build = async (key: string, entryPoint: string): Promise<void> => {
  const params = clean(key);
  generateTsCode(entryPoint, params.tsFile);

  await shell(`oxlint --fix ${params.tsFile}`);
};

const main = async () => {
  const promises = Object.entries(Config.endpoints).map(([key, entryPoint]) => {
    return build(key, entryPoint);
  });
  await Promise.all(promises);

  await Promise.all([
    shell(`pnpm tsc -p tsconfig.cjs.json`),
    shell(`pnpm tsc -p tsconfig.esm.json`),
    shell(`pnpm tsc -p tsconfig.esm.json -d --emitDeclarationOnly --outDir ${Config.libTypesDir}`),
  ]);

  await shell(
    `cherry-pick --types-dir ./types --cjs-dir ./cjs --esm-dir ./esm --cwd ${Config.libDir} --input-dir ../${path.basename(Config.sourceDir)}`,
  );

  await copyPackageSet();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
