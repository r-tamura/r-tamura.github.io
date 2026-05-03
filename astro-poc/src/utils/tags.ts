export function tagSlug(tag: string): string {
  return tag
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");
}
