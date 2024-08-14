import { createOutputFolder, listDir, writeFile } from "./files/fs";
import { parseIconComponent, parseSVGs, parseTypes } from "./files/svg";
import { getArgs } from "./prompts/params";
import { getNames } from "./str/utils";

async function main() {
  const { inputDir, outputDir } = getArgs();

  const files = await listDir(inputDir);
  const named = getNames(files);

  const components = await parseSVGs(named);
  const iconComponent = parseIconComponent(named);
  const types = parseTypes(named);

  await createOutputFolder(outputDir);
  const outputs = components.map((c) => writeFile(`${outputDir}/${c.filename}`, c.component));
  await Promise.all(outputs);

  await writeFile(`${outputDir}/types.ts`, types);
  await writeFile(`${outputDir}/index.tsx`, iconComponent);

  return { files: outputs.length + 1, outputDir };
}

main()
  .then((r) => console.info(`${r.files} files generated in ${r.outputDir}`))
  .catch((e) => console.error(e));
