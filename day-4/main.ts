type LineState = {
  [key: string]: number[] | undefined;
};

const lineChecker = (lines: string[]): number => {
  let lineCounts = 0;

  const lineMap = lines.reduce(
    (acc: LineState, line: string, index: number) => {
      if (!line.includes("@")) {
        acc[index] = [];
      }

      acc[index] = [...line.matchAll(/@/g)].map((line) => line.index);
      return acc;
    },
    {},
  );

  lines.forEach((_, index) => {
    const currentLine = lineMap[index] || [];
    const nextLine = lineMap[index + 1] || [];
    const previousLine = lineMap[index - 1] || [];
    lineCounts += currentLine.reduce((total, num) => {
      const directionNums = [num - 1, num, num + 1];
      const previousMatches = previousLine.filter((pNum) =>
        directionNums.includes(pNum)
      );
      const nextMatches = nextLine.filter((nNum) =>
        directionNums.includes(nNum)
      );
      const currentMatches = currentLine.filter((cNum) =>
        cNum !== num && directionNums.includes(cNum)
      );
      const numCount = previousMatches.length + currentMatches.length +
        nextMatches.length;

      const toAdd = numCount < 4 ? 1 : 0;

      return total += toAdd;
    }, 0);
  });

  return lineCounts;
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
