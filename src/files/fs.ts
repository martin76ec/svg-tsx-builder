import { Glob } from "bun";

export function listDir(path: string) {
  const glob = new Glob(path);
  return Array.from(glob.scanSync());
}

export async function writeFile(path: string, content: string) {
  await Bun.write(path, content);
}
