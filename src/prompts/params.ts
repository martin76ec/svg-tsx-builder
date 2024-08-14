import { program } from "commander";

export function getArgs() {
  program
    .argument("<inputdir>", "directory with svg files")
    .argument("<outputdir>", "directory where the generated .tsx files will be at")
    .parse(process.argv);

  const [inputDir, outputDir] = program.args;

  return { inputDir, outputDir };
}
