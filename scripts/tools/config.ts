import * as path from "path";

export const endpoints = {
  "api.github.com":
    "rest-api-description/descriptions/api.github.com/api.github.com.yaml",
  // "ghes-2.18": "rest-api-description/descriptions/ghes-2.18/ghes-2.18.json",
  // "ghes-2.19": "rest-api-description/descriptions/ghes-2.19/ghes-2.19.json",
  // "ghes-2.20": "rest-api-description/descriptions/ghes-2.20/ghes-2.20.json",
  // "ghes-2.21": "rest-api-description/descriptions/ghes-2.21/ghes-2.21.json",
  // "ghes-2.22": "rest-api-description/descriptions/ghes-2.22/ghes-2.22.json",
  // "ghes-3.0": "rest-api-description/descriptions/ghes-3.0/ghes-3.0.json",
};

export const pkgRoot = path.resolve(__dirname, "../../");

export const licenseFile = path.resolve(pkgRoot, "../../LICENSE");

export const endpointsDir = path.resolve(pkgRoot, "endpoints");

export const docsDir = path.resolve(pkgRoot, "docs");

export const distDir = path.resolve(pkgRoot, "dist");

export const sourceDir = path.resolve(pkgRoot, "source");

export const endpointsOutputDir = path.join(docsDir, "endpoints");

export const libDir = path.resolve(pkgRoot, "lib");

export const libCjsDir = path.resolve(libDir, "cjs");

export const libEsmDir = path.resolve(libDir, "esm");

export const libTypesDir = path.resolve(libDir, "types");

export const redocDir = path.join(docsDir, "redoc");

export const tmpSwaggerUiDir = ".tmp_swagger-ui";
