import fs from "fs";
import path from "path";

export function legacyPolyfill() {
  return {
    name: 'vite-polyfill-legacy-extended',
    transform(code, id) {
      const mirror = path.join(import.meta.dirname, path.relative(process.cwd(), id));
      console.log(id, mirror);
      if (!fs.existsSync(mirror)) return "";
      return fs.readFileSync(mirror, "utf-8");
    }
  };
}
