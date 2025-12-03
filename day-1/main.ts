export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const rotations = input.split("\n").filter(Boolean);
  const numberRegex = new RegExp(/\d+/);
  const incrementRegex = new RegExp(/\D+/);
  let currentNumber = 50;
  let result1 = 0;
  let result2 = 0;

  const countZeros = (
    position: number,
    direction: string,
    clicks: number,
  ): number => {
    let firstZero;

    if (position === 0) firstZero = 100;
    else {
      firstZero = direction === "L" ? position : (100 - position);
    }

    if (firstZero > clicks) return 0;

    return Math.floor((clicks - firstZero) / 100) + 1;
  };

  rotations.forEach((rotation) => {
    const number = Number((numberRegex.exec(rotation) ?? [])[0]);
    const increment = (incrementRegex.exec(rotation) ?? [])[0] as string;

    result2 += countZeros(currentNumber, increment, number);

    const numberState = increment === "L"
      ? (currentNumber - number)
      : (currentNumber + number);

    currentNumber = ((numberState % 100) + 100) % 100;

    if (currentNumber === 0) result1++;
  });

  return { result1, result2 };
};

if (import.meta.main) {
  const { result1, result2 } = await main("input.txt");
  console.log(`\nResult 1: ${result1}`);
  console.log(`\nResult 2: ${result2}`);
}
