import type { NamedFile } from "@src/types";

export async function parseSVG(path: string, componentName: string) {
  const svg = await Bun.file(path).text();
  const cleanedSVG = svg
    .replace(/fill="[^"]*"/g, "")
    .replace(/viewBox="[^"]*"/g, "")
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
