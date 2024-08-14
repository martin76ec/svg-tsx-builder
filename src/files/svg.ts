import type { NamedFile } from "@src/types";
import { promises as fs } from "fs";

export async function parseSVG(path: string, componentName: string) {
  const svg = await fs.readFile(path, "utf-8");
  const cleanedSVG = svg
    .replace(/fill="[^"]*"/g, "")
    .replace(/fill-rule="([^"]*)"/g, 'fillRule="$1"')
    .replace(/clip-rule="([^"]*)"/g, 'clipRule="$1"')
    .replace("<svg", "<svg {...props}");

  const componentString = `
  interface Props {
    className?: string
  }

  export function ${componentName}(props: Props) {
    return (
      ${cleanedSVG}
    );
  }`;

  return componentString;
}

export function parseSVGs(files: NamedFile[]) {
  const components = files.map(async (f) => ({
    filename: `${f.name}.tsx`,
    component: await parseSVG(f.path, f.pascal),
  }));

  return Promise.all(components);
}

export function parseType(file: NamedFile) {
  return '"' + file.name + '"';
}

export function parseTypes(files: NamedFile[]) {
  const types = files.map((file) => parseType(file)).join("|");
  return `export type IconName = ${types};`;
}

export function parseIconComponent(namedFiles: NamedFile[]) {
  const imports = namedFiles.map((file) => `import { ${file.pascal} } from "./${file.name}";`).join("\n");

  const returns = namedFiles.map((file) => `if (name === "${file.name}") return <${file.pascal} className={className} />;`).join("\n    ");

  const component = `
${imports}

import type { IconName } from "./types";

interface Props {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: Props) { 
    ${returns}
    return null; // default return statement if no match found
}`;

  return component;
}
