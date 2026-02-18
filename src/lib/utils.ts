import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractTextFromKeystatic(node: unknown): string {
  if (!node) return "";

  if (Array.isArray(node)) {
    return node.map(extractTextFromKeystatic).join("");
  }

  if (typeof node === 'object' && node !== null) {
    // Leaf node (text)
    if ('text' in node) {
      return (node as { text: string }).text || "";
    }
    
    // Element node (has children)
    if ('children' in node) {
      const childrenText = extractTextFromKeystatic((node as { children: unknown[] }).children);
      
      // Add spacing for block-level elements
      const type = (node as { type?: string }).type;
      const isBlock = type === 'paragraph' || type?.startsWith('heading') || type === 'list-item' || type === 'blockquote';
      
      return childrenText + (isBlock ? "\n" : "");
    }
  }

  return "";
}
