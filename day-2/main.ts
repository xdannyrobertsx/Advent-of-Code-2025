export const main = async (filePath: string) => {
  const getRange = (start: number, end: number) => {
    const range = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  };

  const numChecker = (range: number[]): number => {
    // https://stackoverflow.com/questions/79145058/regex-that-match-exactly-half-of-an-even-sized-doubled-string
    // https://stackoverflow.com/questions/928179/matching-on-repeated-substrings-in-a-regex
    const regex = new RegExp(/^(\d+)\1$/);
    const matches = range.filter((num: number) => (regex.test(String(num))));
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
