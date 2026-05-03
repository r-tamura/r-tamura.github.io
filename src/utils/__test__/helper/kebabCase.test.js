import { expect, test } from "vitest";
import { kebabCase } from "../../helper";

test("One word", () => {
  expect(kebabCase("Foo")).toBe("foo");
});

test("Acronym", () => {
  expect(kebabCase("HTML")).toBe("html");
});

test("Space separated to Kebab", () => {
  expect(kebabCase("foo bar")).toBe("foo-bar");
});

test("Camel to Kebab", () => {
  expect(kebabCase("FooBar")).toBe("foo-bar");
  expect(kebabCase("fooBar")).toBe("foo-bar");
});

test("Snake to Kebab", () => {
  expect(kebabCase("foo_bar")).toBe("foo-bar");
  expect(kebabCase("__foo_bar__")).toBe("foo-bar");
});
