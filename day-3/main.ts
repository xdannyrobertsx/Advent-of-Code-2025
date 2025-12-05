const getLineNumber = (line: string): number => {
  const nums = line.split("").map(Number);
  let maxNum: number = 0;
  let maxNum2: number = 0;
  let _maxNumIndex: number = 0;
  let maxNumIndex2: number = 0;

  nums.forEach((num, index) => {
    if (num < maxNum && num < maxNum2) return;
    else if (num > maxNum && (index + 1) < nums.length) {
      maxNum = num;
      _maxNumIndex = index;
      maxNum2 = 0;
      maxNumIndex2 = 0;

      return;
    } else if (num > maxNum2 && index > maxNumIndex2) {
      maxNum2 = num;
      maxNumIndex2 = index;
      return;
    }
  });

  const numString = `${maxNum}${maxNum2}`;
  return Number(numString);
};

export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const lines = input.split("\n");
  const numArray = lines.map(getLineNumber);
  return numArray.reduce((acc, num) => acc + num);
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
