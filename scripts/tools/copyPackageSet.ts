import * as fs from "fs";
import * as path from "path";
import cpy from "cpy";
import * as Config from "./config.ts";

export const copyPackageSet = async (): Promise<void> => {
  const publishPackageJson = path.join(Config.libDir, "package.json");

  const pkg = JSON.parse(fs.readFileSync(path.join(Config.pkgRoot, "package.json"), { encoding: "utf-8" }));
  pkg.name = pkg.name.replace("-specification", "");
  pkg.private = undefined;
  pkg.scripts = {
    build: "echo 'Already built!'",
  };
  pkg.devDependencies = undefined;
  pkg.main = path.relative(Config.libDir, pkg.main);
  pkg.module = path.relative(Config.libDir, pkg.module);
  pkg.types = path.relative(Config.libDir, pkg.types);
  pkg.publishConfig.directory = undefined;

  fs.writeFileSync(publishPackageJson, JSON.stringify(pkg, null, 2), {
    encoding: "utf-8",
  });
  await cpy(["README.md", "CHANGELOG.md", Config.licenseFile], Config.libDir);
  console.log("Files copied!");
};
