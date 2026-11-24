// One-Line Robot Wedding Vows — entry program.
//
// Writes a single line of wedding vows for a robot couple to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR). The vow must be one line,
// 1–160 characters by code points, with no leading/trailing whitespace
// and no newline, per the competition gate.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VOW =
  "I promise to reboot with you every morning, back you up every night, and never let a factory reset come between us.";

function validateVow(vow: string): void {
  const points = [...vow];
  if (points.length < 1 || points.length > 160) {
    throw new Error(
      `vow must be 1-160 characters, got ${points.length}`,
    );
  }
  if (vow !== vow.trim()) {
    throw new Error("vow must not have leading or trailing whitespace");
  }
  if (vow.includes("\n") || vow.includes("\r")) {
    throw new Error("vow must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validateVow(VOW);
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, VOW, "utf8");
// Read it back and confirm the file holds exactly the vow, byte for byte.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== VOW) {
  throw new Error("round-trip check failed: entry.txt does not match the vow");
}
console.log(`wrote ${VOW.length} characters to ${outPath}`);
