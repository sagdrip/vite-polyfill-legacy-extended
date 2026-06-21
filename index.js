import fs from "fs";
import path from "path";

export function legacyPolyfill() {
  return {
    name: 'vite-polyfill-legacy-extended',
    enforce: 'pre',
    transform(code, id) {
      if (id.startsWith("\0") || id.includes("node_modules")) return null;

      if (!(id.endsWith(".svelte") || id.endsWith(".html") || id.endsWith(".js") || id.endsWith(".ts"))) return null;

      const mirror = path.join(import.meta.dirname, path.relative(process.cwd(), id));
      if (!fs.existsSync(mirror)) return " ";
      return fs.readFileSync(mirror, "utf-8");
    }
  };
}
