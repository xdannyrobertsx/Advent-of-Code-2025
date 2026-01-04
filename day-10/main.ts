// i wasn't able to solve this one on my own and ended up taking a look at a reddit thread for some hints.
// ultimately, i ended up needing to do a breadth first search on the buttons and looked at this solution for how to do it in typescript:
// https://gitlab.com/sunderee/advent-of-code-typescript/-/blob/master/src/solutions/2025/day10.ts

const lightToMask = (light: string): bigint => {
  let mask = 0n;
  for (let i = 0; i < light.length; i++) {
    if (light[i] === "#") {
      mask |= 1n << BigInt(i);
    }
  }
  return mask;
};

const parseButtons = (buttonsText: string): bigint[] => {
  const masks: bigint[] = [];
  const re = /\(([^)]*)\)/g;

  for (const match of buttonsText.matchAll(re)) {
    const contents = match[1].trim();
    let mask = 0n;

    if (contents.length > 0) {
      for (const part of contents.split(",")) {
        const idx = Number(part.trim());
        mask |= 1n << BigInt(idx);
      }
    }

    masks.push(mask);
  }

  return masks;
};

const lightCounter = (light: string, buttonsText: string): number => {
  const target = lightToMask(light);
  const buttons = parseButtons(buttonsText);

  const n = buttons.length;
  let best = Infinity;

  for (let subset = 0; subset < (1 << n); subset++) {
    let state = 0n;
    let presses = 0;

    for (let i = 0; i < n; i++) {
      if (subset & (1 << i)) {
        state ^= buttons[i];
        presses++;
      }
    }

    if (state === target) best = Math.min(best, presses);
  }

  return best;
};

export const main = async (filePath: string) => {
  const input = await Deno.readTextFile(filePath);
  const textLines = input.split("\n");
  const machineCounts: number[] = textLines.reduce((acc: number[], line: string) => {
    const [lIndex1, lIndex2] = [line.indexOf("["), line.indexOf("]")];
    const [bIndex1, bIndex2] = [line.indexOf("("), line.lastIndexOf(")")];
    const light = line.slice(lIndex1, lIndex2 + 1).replace(/[\[\]]/g, "");
    const buttons = line.slice(bIndex1, bIndex2 + 1);
    const lightCount = lightCounter(light, buttons)
    acc.push(lightCount);
    return acc;
  }, []);
  return machineCounts.reduce((total, n) => total + n, 0)
};

if (import.meta.main) {
  const result = await main("input.txt");
  console.log(result);
}
