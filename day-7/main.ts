export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const lines: string[] = input.trim().split("\n");
  const currentIndexes: Set<number> = new Set([lines[0].indexOf("S")]);
  return lines.reduce(
    (splits: number, line: string): number => {
      if (!line.includes("^")) return splits;

      const splitterIndexes: Set<number> = new Set(
        [...line.matchAll(/\^/g)].map((arr) => arr.index),
      );
      const matches = currentIndexes.intersection(splitterIndexes);
      if (matches.size < 1) return splits;

      matches.forEach((match: number) => {
        const plus = match + 1;
        const minus = match - 1;
        currentIndexes.delete(match);
        currentIndexes.add(plus);
        currentIndexes.add(minus);
        splits++;
      });

      return splits;
    },
    0,
  );
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
