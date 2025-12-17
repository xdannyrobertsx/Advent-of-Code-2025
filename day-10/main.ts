type Machine = {
  light: string;
  buttons: string;
};

export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const textLines = input.split("\n");
  const machines = textLines.reduce((acc: Machine[], line: string) => {
    const [lIndex1, lIndex2] = [line.indexOf("["), line.indexOf("]")];
    const [bIndex1, bIndex2] = [line.indexOf("("), line.lastIndexOf(")")];
    const light = line.slice(lIndex1, lIndex2 + 1);
    const buttons = line.slice(bIndex1, bIndex2 + 1);
    acc.push({ light, buttons });
    return acc;
  }, []);
  console.log("\nmachines\n", machines);
  return 7;
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
