// https://en.wikipedia.org/wiki/Euclidean_distance
//   sqrt(
//   (x2 - x1)² +
//   (y2 - y1)² +
//   (z2 - z1)²
// )

type distanceObject = {
  distance: number;
  pointA: number[];
  pointB: number[];
};

const calculateDistance = (pointA: number[], pointB: number[]): number => {
  const [x1, y1, z1] = pointA;
  const [x2, y2, z2] = pointB;
  const x = Math.pow(x2 - x1, 2);
  const y = Math.pow(y2 - y1, 2);
  const z = Math.pow(z2 - z1, 2);
  return Math.sqrt(x + y + z);
};

export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const lines = input.trim().split("\n");
  const coordinates = lines.map((line: string): number[] =>
    line.split(",").map(Number)
  );

  const coordinateMap = coordinates.reduce(
    (acc: distanceObject[], coordinate: number[], index: number) => {
      for (let i = index + 1; i < coordinates.length; i++) {
        const pointA = coordinate;
        const pointB = coordinates[i];
        acc.push({
          distance: calculateDistance(pointA, pointB),
          pointA,
          pointB,
        });
      }
      return acc;
    },
    [],
  ).sort((a,b) => a.distance - b.distance)

  console.log(coordinateMap)

  return 40;
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
