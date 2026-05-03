import { randomUUID } from "node:crypto";
import { visit } from "unist-util-visit";

export default function rehypeImageZoom() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "img") return;
      if (!parent || index === undefined) return;
      if (parent.tagName === "a" || parent.tagName === "button") return;
      if (node.properties?.dataNoZoom !== undefined) return;

      const id = `zoom-${randomUUID().slice(0, 8)}`;
      const trigger = {
        type: "element",
        tagName: "button",
        properties: {
          type: "button",
          popovertarget: id,
          className: ["zoom-trigger"],
          ariaLabel: "画像を拡大表示",
        },
        children: [node],
      };
      const popoverImg = {
        type: "element",
        tagName: "img",
        properties: { ...node.properties, alt: "", loading: "lazy" },
        children: [],
      };
      const popover = {
        type: "element",
        tagName: "span",
        properties: { id, popover: "auto", className: ["zoom-popover"] },
        children: [popoverImg],
      };
      parent.children.splice(index, 1, trigger, popover);
      return index + 2;
    });
  };
}
