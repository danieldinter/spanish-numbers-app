import { expect, test, describe } from "vitest";
import { generateRandomNumber } from "./src/generateRandomNumber.js";

describe("generateRandomNumber", () => {
  const testCases = [
    { setting: "units", min: 0, max: 9 },
    { setting: "teens", min: 10, max: 19 },
    { setting: "twenties", min: 20, max: 29 },
    { setting: "tens", min: 0, max: 99 },
    { setting: "hundreds", min: 0, max: 999 },
  ];

  testCases.forEach(({ setting, min, max }) => {
    test(`generates numbers within range for setting "${setting}"`, () => {
      const results = [];
      const iterations = 100000;

      for (let i = 0; i < iterations; i++) {
        const number = generateRandomNumber(setting);
        results.push(number);
      }

      // Filter for numbers that are out of the expected range and assert none exist
      const outOfRange = results.filter((num) => num < min || num > max);
      expect(outOfRange.length).toBe(0);
      /*if (outOfRange.length > 0) {
        console.error(
          `Out of range numbers for setting "${setting}":`,
          outOfRange
        );
      }*/
    });
  });
});
