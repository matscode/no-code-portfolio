import { extractTextFromKeystatic } from "@/lib/utils";

export function buildDescription(profileSummary: unknown) {
  const bioText = extractTextFromKeystatic(profileSummary);
  return bioText.length > 0 ? bioText.replace(/\n/g, " ").trim() : "";
}
