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
          dataZoomTarget: id,
          className: ["zoom-trigger"],
          ariaLabel: "画像を拡大表示",
        },
        children: [node],
      };
      const dialogImg = {
        type: "element",
        tagName: "img",
        properties: { ...node.properties, alt: "", loading: "lazy" },
        children: [],
      };
      const closeForm = {
        type: "element",
        tagName: "form",
        properties: { method: "dialog", className: ["zoom-close-form"] },
        children: [
          {
            type: "element",
            tagName: "button",
            properties: {
              type: "submit",
              className: ["zoom-close"],
              ariaLabel: "閉じる",
            },
            children: [{ type: "text", value: "×" }],
          },
        ],
      };
      const dialog = {
        type: "element",
        tagName: "dialog",
        properties: { id, className: ["zoom-dialog"] },
        children: [closeForm, dialogImg],
      };
      parent.children.splice(index, 1, trigger, dialog);
      return index + 2;
    });
  };
}
