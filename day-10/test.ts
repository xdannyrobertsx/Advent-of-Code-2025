import { expect } from "@std/expect";
import { main } from "./main.ts";

Deno.test("get correct output given example", async () => {
  const result = await main("example.txt");
  expect(result).toBe(7);
});
