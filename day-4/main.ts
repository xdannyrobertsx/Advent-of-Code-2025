// The forklifts can only access a roll of paper if there are fewer than four rolls of paper in the eight adjacent positions.

// In this example, there are 13 rolls of paper that can be accessed by a forklift (marked with x):

// ..xx.xx@x.
// x@@.@.@.@@
// @@@@@.x.@@
// @.@@@@..@.
// x@.@@@@.@x
// .@@@@@@@.@
// .@.@.@.@@@
// x.@@@.@@@@
// .@@@@@@@@.
// x.x.@@@.x.
type LineState = {
  [key: string]: number[] | undefined;
};

const lineChecker = (lines: string[]): number => {
  let lineCounts = 0;
  // y is the index of lineChecker and x is the index of the line itself
  // check line for @
  // if found, check surrounding 8
  // if less than 4 other @ in sorroundings, count as one

  const lineMap = lines.reduce(
    (acc: LineState, line: string, index: number) => {
      if (!line.includes("@")) {
        acc[index] = [];
      }

      acc[index] = [...line.matchAll(/@/g)].map((line) => line.index);
      return acc;
      // const surroundingLines =
      // const count = lineCounter(indexes, surroundingLines)
    },
    {},
  );
  console.log("lineMap", lineMap);
  lines.forEach((line, index) =>{
    const currentLine = lineMap[index]
    const nextLine = lineMap[index + 1]
    const previousLine = lineMap[index - 1]
    console.log('currentLine', currentLine)
    console.log('nextLine', nextLine)
    console.log('previousLine', previousLine)
  })
  return 13;
};

export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const lines = input.split("\n").filter(Boolean);
  return lineChecker(lines);
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
