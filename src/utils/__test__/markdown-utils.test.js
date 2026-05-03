import { expect, test } from "vitest";
import { countTags } from "../markdown-utils";

test("No article", () => {
  expect(countTags([])).toEqual([]);
});

test("2 tags", () => {
  expect(
    countTags([
      { node: { frontmatter: { tags: [`A`, `B`] } } },
      { node: { frontmatter: { tags: [`A`, `B`] } } },
      { node: { frontmatter: { tags: [`A`, `B`] } } },
    ]),
  ).toEqual([
    { name: `A`, count: 3 },
    { name: `B`, count: 3 },
  ]);
});

test("4 tags the number of each tags is not the same number.", () => {
  expect(
    countTags([
      { node: { frontmatter: { tags: [`A`, `B`, `C`] } } },
      { node: { frontmatter: { tags: [`B`, `D`, `E`] } } },
      { node: { frontmatter: { tags: [`C`, `E`] } } },
      { node: { frontmatter: { tags: [`E`] } } },
    ]),
  ).toEqual([
    { name: `A`, count: 1 },
    { name: `B`, count: 2 },
    { name: `C`, count: 2 },
    { name: `D`, count: 1 },
    { name: `E`, count: 3 },
  ]);
});
