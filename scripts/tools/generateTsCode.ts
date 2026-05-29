import * as fs from "fs";
import * as path from "path";
import * as logger from "./logger.ts";

import { CodeGenerator } from "@himenon/openapi-typescript-code-generator";
import * as Templates from "@himenon/openapi-typescript-code-generator/templates";
import type * as Types from "@himenon/openapi-typescript-code-generator/types";

export const generateTsCode = (entryPoint: string, outputFileName: string): void => {
  const codeGenerator = new CodeGenerator(entryPoint);

  const apiClientGeneratorTemplate: Types.CodeGenerator.CustomGenerator<Templates.FunctionalApiClient.Option> = {
    generator: Templates.FunctionalApiClient.generator,
    option: {
      additionalMethodComment: true,
    },
  };

  const code = codeGenerator.generateTypeDefinition([
    codeGenerator.getAdditionalTypeDefinitionCustomCodeGenerator(),
    apiClientGeneratorTemplate,
  ]);

  // namespace に予約語が含まれる識別子 (例: delete-budget) を有効な識別子に置換する
  const sanitized = code.replace(/export namespace ([a-zA-Z0-9_]*-[a-zA-Z0-9_-]*)/g, (_, name) => {
    const safe = name.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase()).replace(/-/g, "_");
    return `export namespace ${safe}`;
  });

  fs.mkdirSync(path.dirname(outputFileName), { recursive: true });
  fs.writeFileSync(outputFileName, sanitized, {
    encoding: "utf-8",
  });

  logger.log(`create ${outputFileName}`);
};
