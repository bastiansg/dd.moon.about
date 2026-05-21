import { spawn } from "node:child_process";
import chalk from "chalk";
import ora, { spinners } from "ora";

const [html = "index.html", pdf = "dd.moon.pdf"] = process.argv.slice(2);
const gray = chalk.rgb(160, 160, 160);
const spinner = ora({
  color: false,
  spinner: {
    ...spinners.dots2,
    frames: spinners.dots2.frames.map((frame) => gray(frame)),
  },
}).start();

const printDone = () => {
  process.stdout.write(gray(`[ html-to-pdf // done ]\nfrom   :: ${html}\nto     :: ${pdf}\n`));
};

const chromium = spawn(
  "chromium",
  [
    "--headless",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdf}`,
    html,
  ],
  {
    stdio: ["ignore", "ignore", "pipe"],
  },
);

let stderr = "";

chromium.stderr.on("data", (chunk) => {
  stderr += chunk;
});

chromium.on("error", (error) => {
  spinner.fail("pdf generation failed");
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});

chromium.on("close", (code) => {
  if (code === 0) {
    spinner.stop();
    printDone();
    process.exit(0);
  }

  spinner.fail("pdf generation failed");
  process.stderr.write(stderr);
  process.exit(code ?? 1);
});
