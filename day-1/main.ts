export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const rotations = input.split("\n").filter(Boolean);
  const numberRegex = new RegExp(/\d+/);
  const incrementRegex = new RegExp(/\D+/);
  let currentNumber = 50;
  let result1 = 0;
  let result2 = 0;

  rotations.forEach((rotation) => {
    const number = Number((numberRegex.exec(rotation) ?? [])[0]);
    const increment = (incrementRegex.exec(rotation) ?? [])[0];

    const initialNum = currentNumber;

    const numberState = increment === "L"
      ? (currentNumber - number)
      : (currentNumber + number);

    console.log(
      "\nrotation",
      rotation,
    );

    console.log(
      "initialNum",
      initialNum,
    );

    console.log(
      "numberState",
      numberState,
    );

    let danny;

    currentNumber = numberState % 100;
    console.log("currentNumber", currentNumber)

    if (currentNumber === 0) {
     danny = 0
    }
    else if (currentNumber < 0) {
        danny = 100 + currentNumber;
    }
    else {
        danny = initialNum - currentNumber;
    }

    console.log(
      "danny",
      danny
    );

    if (currentNumber === 0) result1++;
  });

  return { result1, result2 };
};

if (import.meta.main) {
  const { result1 } = await main("input.txt");
  console.log(`Result 1: ${result1}`);
}
