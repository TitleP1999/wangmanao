import { policyDefinitions } from "./policy-navigation";
import source from "./policy-source.json";

// Preserve the original policy wording. Only normalize presentation whitespace.
export const policies = policyDefinitions.map((definition, index) => ({
  ...definition,
  href: `/policies/${definition.slug}/`,
  sourceUrl: source[index].url,
  documentTitle: source[index].text.split("\n")[0].replace(/\s+/g, " ").trim(),
  paragraphs: source[index].text
    .split("\n")
    .slice(1)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean),
}));
