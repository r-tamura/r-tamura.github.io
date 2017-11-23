import test from 'ava'
import { countTags } from '../markdown-utils';

test('No article', t => {
	t.deepEqual(countTags([]), [])
})


test('2 tags', t => {
	t.deepEqual(countTags([
			{ node: { frontmatter: { tags: [`A`, `B`] }}},
			{ node: { frontmatter: { tags: [`A`, `B`] }}},
			{ node: { frontmatter: { tags: [`A`, `B`] }}},
		]),
		[
			{ name: `A`, count: 3 },
			{ name: `B`, count: 3 },
		]
	)
})

test('4 tags the number of each tags is not the same number.', t => {
	t.deepEqual(countTags([
			{ node: { frontmatter: { tags: [`A`, `B`, `C`] }}},
			{ node: { frontmatter: { tags: [`B`, `D`, `E`] }}},
			{ node: { frontmatter: { tags: [`C`, `E`] }}},
			{ node: { frontmatter: { tags: [`E`] }}},
		]),
		[
			{ name: `A`, count: 1 },
			{ name: `B`, count: 2 },
			{ name: `C`, count: 2 },
			{ name: `D`, count: 1 },
			{ name: `E`, count: 3 },
		]
	)
})
