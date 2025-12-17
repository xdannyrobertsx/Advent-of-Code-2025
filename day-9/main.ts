// https://stackoverflow.com/questions/43241174/generating-all-combinations-of-elements-in-a-single-array-in-pairs

const getArea = (c1: number[], c2: number[]): number => {
  const [x1, y1] = c1;
  const [x2, y2] = c2;

  const x = Math.abs(x1 - x2) + 1;
  const y = Math.abs(y2 - y1) + 1;
  return x * y;
};

export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const tileCoordinates = input.split("\n").map((tile) =>
    tile.split(",").map(Number)
  );
  const areas = tileCoordinates.flatMap(
    (coordinate: number[], i: number) =>
      tileCoordinates.slice(i + 1).map((sisterCoordinate: number[]) =>
        getArea(coordinate, sisterCoordinate)
      ),
  ).sort((a, b) => b - a);

  return areas[0];
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
