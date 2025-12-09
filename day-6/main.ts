const lineCalc = (symbols: string[], lines: number[][]): number =>
  symbols.reduce((total: number, symbol: string, index: number): number => {
    const numsToIterate = lines.map((strArr) => strArr[index]);
    total += numsToIterate.reduce(
      (acc, num) => {
        if (acc === 0 && symbol === "*") {
          acc = num;
          return acc;
        }

        return symbol === "*" ? acc * num : acc + num;
      },
      0,
    );
    return total;
  }, 0);

export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const stringLines: string[] = input.split("\n").filter((line: string) =>
    line.length > 0
  ).map(
    (line: string) => line.trim(),
  );
  const symbols = stringLines.splice(-1).flatMap((str) =>
    str.split(" ").filter(Boolean)
  );
  const lines = stringLines.reduce(
    (acc: number[][], numString: string): number[][] => {
      acc.push(numString.split(" ").filter(Boolean).map(Number));
      return acc;
    },
    [],
  );

  return lineCalc(symbols, lines);
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
