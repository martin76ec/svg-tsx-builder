import type { NamedFile } from "@src/types";

const kebabCaseRegex = /^[a-z]+(-[a-z]+)*$/;

export function getNames(paths: string[]): NamedFile[] {
  return paths.map((path) => {
    const name = getFileName(path);
    const pascal = toPascal(name);

    return { path, name, pascal };
  });
}

export function getFileName(path: string) {
  const parts = path.split("/");
  const name = parts[parts.length - 1];

  return name.replace(".svg", "");
}

export function toPascal(filename: string) {
  if (!kebabCaseRegex.test(filename)) {
    throw new Error(`File name "${filename}" is not in kebab case.`);
  }

  return filename
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}
