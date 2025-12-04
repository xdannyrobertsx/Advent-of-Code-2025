export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const lines = input.split("\n");
  // match two, load it if second is larger, check next num
  console.log(lines)
  return 
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
