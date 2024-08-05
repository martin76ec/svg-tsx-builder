import { parseArgs } from "util";

export function getArgs() {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      inputDir: {
        type: "string",
      },
      outputDir: {
        type: "string",
      },
    },
    strict: true,
  });

  if (!values.inputDir) throw new Error("input directoy is required");
  if (!values.outputDir) throw new Error("output directoy is required");

  return { inputDir: values.inputDir, outputDir: values.outputDir };
}
