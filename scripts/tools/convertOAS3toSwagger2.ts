import { createRequire } from "module";

const require = createRequire(import.meta.url);
const Converter = require("api-spec-converter");

export const convertOAS3toSwagger2 = (filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    Converter.convert(
      {
        from: "openapi_3",
        to: "swagger_2",
        source: filename,
      },
      function (err: any, converted: any) {
        if (err) {
          reject(err);
        } else {
          resolve(converted.stringify());
        }
      },
    );
  });
};
