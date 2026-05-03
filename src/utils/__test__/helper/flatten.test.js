import { expect, test } from "vitest";
import { flatten } from "../../helper";

test("flatten", () => {
  expect(flatten([1, [2]])).toEqual([1, 2]);
});

test("flatten 2", () => {
  expect(flatten([1, [2, 3]])).toEqual([1, 2, 3]);
});

test("flatten 3", () => {
  expect(flatten([1, [2, [3]]])).toEqual([1, 2, [3]]);
});

test("flatten 4", () => {
  expect(
    flatten([
      [1, 2],
      [3, 4],
    ]),
  ).toEqual([1, 2, 3, 4]);
});
