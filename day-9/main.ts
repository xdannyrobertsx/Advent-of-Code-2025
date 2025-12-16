export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const tileCoordinates = input.split("\n").map((tile) =>
    tile.split(",").map(Number)
  );
  console.log(tileCoordinates);
  return 50;
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
