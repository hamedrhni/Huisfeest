/**
 * Pre-launch content checker.
 * Scans content/nl.ts and content/en.ts for TODO: placeholders.
 *
 * Usage:  npm run check-content
 * Exits:  1 if any TODO: remain (not launch-ready)
 *         0 if all clear (launch-ready)
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

interface TodoItem {
  file: string;
  line: number;
  context: string;
  value: string;
}

const FILES = [
  { path: "content/nl.ts", label: "Dutch content  (content/nl.ts)" },
  { path: "content/en.ts", label: "English content (content/en.ts)" },
];

function extractTodos(filePath: string): TodoItem[] {
  const fullPath = join(process.cwd(), filePath);
  const lines = readFileSync(fullPath, "utf8").split("\n");
  const todos: TodoItem[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes("TODO:")) continue;

    // Determine context: prefer the key on the current line, then look back for
    // the nearest heading: value to show which legal section the TODO is in.
    let context = "(unknown field)";
    const currentKey = line.match(/^\s+(\w+):\s/);
    if (currentKey) {
      context = currentKey[1];
      // Also try to find the section heading for clarity
      for (let back = 1; back <= 8; back++) {
        const prev = lines[i - back] ?? "";
        const headingMatch = prev.match(/heading:\s*["'](.+?)["']/);
        if (headingMatch) {
          context = `${currentKey[1]} in "${headingMatch[1]}"`;
          break;
        }
        if (prev.trim() === "{" || prev.includes("pricingPage") || prev.includes("privacyPage") || prev.includes("termsPage")) break;
      }
    } else {
      for (let back = 1; back <= 4; back++) {
        const prev = lines[i - back] ?? "";
        const keyMatch = prev.match(/^\s+(\w+):\s/);
        if (keyMatch) { context = keyMatch[1]; break; }
      }
    }

    // Clean the raw value for display
    const value = line.trim().replace(/^["']|["'],?$/g, "");

    todos.push({ file: filePath, line: i + 1, context, value });
  }

  return todos;
}

const separator = "─".repeat(60);
const allTodos: TodoItem[] = [];

console.log("\n" + separator);
console.log("  HuisFeest — Pre-launch content check");
console.log(separator);

for (const { path, label } of FILES) {
  const todos = extractTodos(path);
  allTodos.push(...todos);

  if (todos.length === 0) {
    console.log(`\n  ✅  ${label} — no placeholders remaining`);
  } else {
    console.log(`\n  ❌  ${label} — ${todos.length} placeholder(s) remaining:\n`);
    for (const todo of todos) {
      console.log(`       Line ${String(todo.line).padStart(4)}  [${todo.context}]`);
      console.log(`             ${todo.value}`);
    }
  }
}

console.log("\n" + separator);

if (allTodos.length === 0) {
  console.log("  ✅  All clear — content is launch-ready.");
  console.log(separator + "\n");
  process.exit(0);
} else {
  console.log(
    `  ⚠️   ${allTodos.length} TODO: item(s) must be filled before going live.`,
  );
  console.log("\n  Quick guide:");
  console.log("    • Open content/nl.ts and content/en.ts");
  console.log("    • Search for 'TODO:' and replace each placeholder with real content");
  console.log("    • KvK, address, email → privacyPage and termsPage sections");
  console.log("    • Cancellation policy → termsPage.sections[2]");
  console.log("    • Prices → pricingPage.packages[*].range");
  console.log(separator + "\n");
  process.exit(1);
}
