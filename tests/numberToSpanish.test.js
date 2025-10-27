import { expect, test } from "vitest";
import { numberToSpanish } from "./src/numberToSpanish.js";

test("converts single-digit numbers", () => {
  expect(numberToSpanish(0)).toBe("cero");
  expect(numberToSpanish(1)).toBe("uno");
  expect(numberToSpanish(9)).toBe("nueve");
});

test("converts teens", () => {
  expect(numberToSpanish(10)).toBe("diez");
  expect(numberToSpanish(11)).toBe("once");
  expect(numberToSpanish(15)).toBe("quince");
  expect(numberToSpanish(16)).toBe("dieciséis");
  expect(numberToSpanish(19)).toBe("diecinueve");
});

test("converts twenties", () => {
  expect(numberToSpanish(20)).toBe("veinte");
  expect(numberToSpanish(21)).toBe("veintiuno");
  expect(numberToSpanish(22)).toBe("veintidós");
  expect(numberToSpanish(23)).toBe("veintitrés");
  expect(numberToSpanish(26)).toBe("veintiséis");
  expect(numberToSpanish(29)).toBe("veintinueve");
});

test("converts tens", () => {
  expect(numberToSpanish(30)).toBe("treinta");
  expect(numberToSpanish(31)).toBe("treinta y uno");
  expect(numberToSpanish(34)).toBe("treinta y cuatro");
  expect(numberToSpanish(40)).toBe("cuarenta");
  expect(numberToSpanish(50)).toBe("cincuenta");
  expect(numberToSpanish(60)).toBe("sesenta");
  expect(numberToSpanish(70)).toBe("setenta");
  expect(numberToSpanish(80)).toBe("ochenta");
  expect(numberToSpanish(90)).toBe("noventa");
  expect(numberToSpanish(99)).toBe("noventa y nueve");
});

test("converts hundreds", () => {
  expect(numberToSpanish(100)).toBe("cien");
  expect(numberToSpanish(101)).toBe("ciento uno");
  expect(numberToSpanish(110)).toBe("ciento diez");
  expect(numberToSpanish(115)).toBe("ciento quince");
  expect(numberToSpanish(125)).toBe("ciento veinticinco");
  expect(numberToSpanish(167)).toBe("ciento sesenta y siete");
  expect(numberToSpanish(200)).toBe("doscientos");
  expect(numberToSpanish(250)).toBe("doscientos cincuenta");
  expect(numberToSpanish(300)).toBe("trescientos");
  expect(numberToSpanish(400)).toBe("cuatrocientos");
  expect(numberToSpanish(500)).toBe("quinientos");
  expect(numberToSpanish(600)).toBe("seiscientos");
  expect(numberToSpanish(700)).toBe("setecientos");
  expect(numberToSpanish(800)).toBe("ochocientos");
  expect(numberToSpanish(900)).toBe("novecientos");
  expect(numberToSpanish(999)).toBe("novecientos noventa y nueve");
});

test("converts thousands", () => {
  //expect(numberToSpanish(1000)).toBe("mil");
});
