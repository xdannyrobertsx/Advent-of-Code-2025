export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const rotations = input.split("\n").filter(Boolean);
  const numberRegex = new RegExp(/\d+/);
  const incrementRegex = new RegExp(/\D+/);
  let currentNumber = 50;
  let result = 0;

  rotations.forEach((rotation) => {
    const number = Number((numberRegex.exec(rotation) ?? [])[0]);
    const increment = (incrementRegex.exec(rotation) ?? [])[0];

    const numberState = increment === "L"
      ? (currentNumber - number)
      : (currentNumber + number);

    currentNumber = numberState % 100

    if (currentNumber === 0) result++;
  });

  return result;
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
