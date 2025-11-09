import { execSync } from "child_process";
import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };

const run = (cmd) => execSync(cmd, { stdio: "inherit", shell: true });

try {
  if (deps.next) {
    console.log("🟣 Detected Next.js → running `next dev`");
    run("next dev");
  } else if (deps["react-scripts"]) {
    console.log("🟢 Detected Create React App → running `react-scripts start`");
    run("react-scripts start");
  } else if (deps.vite) {
    console.log("🟡 Detected Vite → running `vite`");
    run("vite");
  } else if (deps.express) {
    console.log("🔵 Detected Express → running `node src/index.js`");
    run("node src/index.js");
  } else if (deps.typescript || deps["ts-node"]) {
    console.log("🟠 Detected TypeScript backend → running `ts-node src/index.ts`");
    run("ts-node src/index.ts");
  } else {
    console.log("⚪ No known framework detected. Please start manually.");
  }
} catch (err) {
  console.error("❌ Dev server failed:", err.message);
}
