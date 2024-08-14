import fs from "fs/promises";

export async function listDir(path: string) {
  const files = await fs.readdir(path);
  return files.map((f) => `${path}/${f}`);
}

export async function createOutputFolder(path: string) {
  const exists = await fs.exists(path);
  if (!exists) await fs.mkdir(path);

  const stat = await fs.lstat(path);
  if (stat.isDirectory() === false) throw new Error("outputdir should be a directory");
}

export async function writeFile(path: string, content: string) {
  await fs.writeFile(path, content);
}
