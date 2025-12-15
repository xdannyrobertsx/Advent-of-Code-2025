// https://en.wikipedia.org/wiki/Euclidean_distance
//   sqrt(
//   (x2 - x1)² +
//   (y2 - y1)² +
//   (z2 - z1)²
// )

type DistanceObject = {
  distance: number;
  pointA: string;
  pointB: string;
};

const calculateDistance = (pointA: number[], pointB: number[]): number => {
  const [x1, y1, z1] = pointA;
  const [x2, y2, z2] = pointB;
  const x = Math.pow(x2 - x1, 2);
  const y = Math.pow(y2 - y1, 2);
  const z = Math.pow(z2 - z1, 2);
  return Math.sqrt(x + y + z);
};

export const main = async (filePath: string, boxes: number = 10) => {
  const input = await Deno.readTextFile(filePath);
  const lines = input.trim().split("\n");
  const coordinates = lines.map((line: string): number[] =>
    line.split(",").map(Number)
  );

  const coordinateMap = coordinates.reduce(
    (acc: DistanceObject[], coordinate: number[], index: number) => {
      for (let i = index + 1; i < coordinates.length; i++) {
        const pointA = coordinate;
        const pointB = coordinates[i];
        acc.push({
          distance: calculateDistance(pointA, pointB),
          pointA: String(pointA),
          pointB: String(pointB),
        });
      }
      return acc;
    },
    [],
  ).sort((a, b) => a.distance - b.distance);

  const newMap = coordinateMap.slice(0, boxes);

  const circuitBoxes = newMap.reduce(
    (acc: string[][], coordinate: DistanceObject) => {
      const { pointA, pointB } = coordinate;

      const indexA = acc.findIndex((arr) => arr.includes(pointA));
      const indexB = acc.findIndex((arr) => arr.includes(pointB));

      if (indexA < 0 && indexB < 0) {
        acc.push([pointA, pointB]);
      } else if (indexA < 0) {
        acc[indexB].push(pointA);
      } else if (indexB < 0) {
        acc[indexA].push(pointB);
      } else if (indexA !== indexB) {
        acc[indexA].push(...acc[indexB]);
        acc.splice(indexB, 1);
      }

      return acc;
    },
    [],
  ).map((arr) => arr.length).sort((a, b) => b - a);

  return circuitBoxes[0] * circuitBoxes[1] * circuitBoxes[2];
};

if (import.meta.main) {
  const result = await main("input.txt", 1000);
  console.log(result);
}
