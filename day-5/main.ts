export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const [ranges, freshIds] = input.split("\n\n").map((arr) =>
    arr.trim().split("\n")
  );

  return new Set(ranges.reduce(
    (acc: number[], stringRange: string): number[] => {
      const [first, last] = stringRange.split("-").map(Number);
      freshIds.forEach((id: string) => {
        const num = Number(id);
        const isInRange = (num >= first) && (num <= last);
        if (isInRange) acc.push(num);
      });
      return acc;
    },
    [],
  )).size;
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
