import { parseArgs } from "@std/cli/parse-args";

const USAGE = `
%cAdvent of Code - New Day Setup%c

Usage:
  deno task new <day_number>

Example:
  deno task new 1    %c# Creates day-1/ from template%c
`;

const printUsage = () => {
  console.log(
    USAGE,
    "color: green; font-weight: bold",
    "",
    "color: gray",
    "",
  );
};

const error = (message: string) => {
  console.error("%c✗ Error:%c " + message, "color: red; font-weight: bold", "");
  Deno.exit(1);
};

const success = (message: string) => {
  console.log("%c✓%c " + message, "color: green; font-weight: bold", "");
};

const args = parseArgs(Deno.args, {
  boolean: ["help", "h"],
  alias: { h: "help" },
  "--": false,
});

if (args.help || args._.length === 0) {
  printUsage();
  Deno.exit(args.help ? 0 : 1);
}

const dayArg = String(args._[0]);
const dayNumber = parseInt(dayArg, 10);

if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 25) {
  error("Day number must be between 1 and 25");
}

const templateDir = "./template";
const targetDir = `./day-${dayNumber}`;

try {
  await Deno.stat(targetDir);
  error(`Directory "${targetDir}" already exists`);
} catch (err) {
  if (!(err instanceof Deno.errors.NotFound)) {
    throw err;
  }
}

await Deno.mkdir(targetDir);

for await (const entry of Deno.readDir(templateDir)) {
  if (entry.isFile) {
    const sourcePath = `${templateDir}/${entry.name}`;
    const targetPath = `${targetDir}/${entry.name}`;
    await Deno.copyFile(sourcePath, targetPath);
  }
}

success(`Created ${targetDir}!`);
console.log(`

`);
console.log("  %cNext steps:%c", "font-weight: bold", "");
console.log(`    cd ${targetDir}`);
console.log("    deno task test  %c# Run tests%c", "color: gray", "");
console.log("    deno task main  %c# Run solution%c", "color: gray", "");
console.log(`

`);
