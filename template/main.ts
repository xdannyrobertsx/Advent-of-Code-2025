export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  return input.split(" ").length;
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
