// https://stackoverflow.com/questions/79145058/regex-that-match-exactly-half-of-an-even-sized-doubled-string
// https://stackoverflow.com/questions/928179/matching-on-repeated-substrings-in-a-regex
const partOneRegex = new RegExp(/^(\d+)\1$/);
const partTwoRegex = new RegExp(/^(\d+)\1+$/);

const getRange = (start: number, end: number) => {
  const range = [];
  for (let i = start; i <= end; i++) range.push(i);
  return range;
};

const numChecker = (range: number[]): { result1: number; result2: number } => {
  let result1 = 0;
  let result2 = 0;

  range.forEach((num) => {
    const strNum = String(num);
    if (partOneRegex.test(strNum)) result1 += num;
    if (partTwoRegex.test(strNum)) result2 += num;
  });

  return {
    result1,
    result2,
  };
};

export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const ids = input.replaceAll("\n", "").split(",");
  const totals = ids.reduce((acc, id) => {
    const [start, end] = id.split("-").map(Number);
    const range = getRange(start, end);
    const { result1, result2 } = numChecker(range);
    acc.result1 += result1;
    acc.result2 += result2;
    return acc;
  }, {
    result1: 0,
    result2: 0,
  });

  return totals;
};

if (import.meta.main) {
  const { result1, result2 } = await main("input.txt");
  console.log(`\nResult 1: ${result1}`);
  console.log(`\nResult 2: ${result2}`);
}
