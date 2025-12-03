export const main = async (filePath: string) => {
  const getRange = (start: number, end: number) => {
    const range = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  };

  const numChecker = (range: number[]): number => {
    // regex is wrong here
    // So, 55 (5 twice), 6464 (64 twice), and 123123 (123 twice)
    const regex = new RegExp(/^([0-9])\1*$/);
    const matches = range.filter((num: number) => regex.test(String(num)));
    console.log(matches);
    if (matches.length === 0) return 0;

    return matches.reduce((a, b) => a + b);
  };

  const input = await Deno.readTextFile(filePath);
  const ids = input.replaceAll("\n", "").split(",");
  return ids.reduce((acc, id) => {
    const [start, end] = id.split("-").map(Number);
    const range = getRange(start, end);
    return acc += numChecker(range);
  }, 0);
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
