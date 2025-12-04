const getLineNumber = (line: string): number => {
  // for each line, match two, load it if second is larger, check next num
  const nums = line.split("").map(Number);
  let maxNum: number = 0;
  let maxNum2: number = 0;
  let maxNumIndex: number = 0;
  let maxNumIndex2: number = 0;

  nums.forEach((num, index) => {

    if (num < maxNum && num < maxNum2) return;

    else if (num > maxNum) {
      maxNum = num;
      maxNumIndex = index;
      maxNum2 = 0;
      maxNumIndex2 = 0;

      return;
    } else if (num > maxNum2 && index > maxNumIndex2) {

      maxNum2 = num;
      maxNumIndex2 = index;
      return;
    }
  });
  console.log("\n\nhere!");
  console.log("line", line);
  console.log("maxNum", maxNum);
  console.log("maxNum2", maxNum2);
  console.log("maxNumIndex", maxNumIndex);
  console.log("maxNumIndex2", maxNumIndex2);

  return 1;
};

export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const lines = input.split("\n");
  console.log(lines[3]);
  const numArray = lines.map(getLineNumber);
  return;
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
