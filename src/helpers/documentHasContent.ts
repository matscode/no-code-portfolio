import { DocumentRendererProps } from "@keystatic/core/renderer";

const hasContent = (node: unknown): boolean => {
  if (node == null) return false;
  if (typeof node === "string") return node.trim().length > 0;
  if (Array.isArray(node)) return node.some(hasContent);
  if (typeof node === "object") {
    const record = node as Record<string, unknown>;
    if (typeof record.text === "string" && record.text.trim().length > 0) return true;
    if (typeof record.value === "string" && record.value.trim().length > 0) return true;
    if (Array.isArray(record.children) && record.children.some(hasContent)) return true;
    if (Array.isArray(record.content) && record.content.some(hasContent)) return true;
    if (Array.isArray(record.nodes) && record.nodes.some(hasContent)) return true;
  }
  return false;
};

export function documentHasContent(value: DocumentRendererProps["document"]) {
  return hasContent(value);
}
