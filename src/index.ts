import { listDir, writeFile } from "./files/fs";
import { parseSVGs, parseTypes } from "./files/svg";
import { getArgs } from "./prompts/params";
import { getNames } from "./str/utils";

async function main() {
  const { inputDir, outputDir } = getArgs();

  const files = listDir(inputDir);
  const named = getNames(files);

  const components = await parseSVGs(named);
  const types = parseTypes(named);

  const outputs = components.map((c) => writeFile(`${outputDir}/${c.filename}`, c.component));
  await Promise.all(outputs);

  await writeFile(`${outputDir}/types.ts`, types);
}

main()
  .then(() => {})
  .catch(() => {});
