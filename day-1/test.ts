import { expect } from "@std/expect";
import { main } from "./main.ts";

Deno.test("get correct output given example", async () => {
  const { result1, result2 } = await main("example.txt");
  expect(result1).toBe(3);
  expect(result2).toBe(6);
});
