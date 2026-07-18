#!/usr/bin/env node
// Validate that a Polish locale tree matches its English source.
// Usage:
//   node validate.mjs <en-path> <pl-path>
// Where each path is either a single .json file or a directory of .json files.

import { readFileSync, statSync, readdirSync } from "node:fs";
import { join, basename, relative } from "node:path";
import { exit } from "node:process";

const [, , enPath, plPath] = process.argv;
if (!enPath || !plPath) {
  console.error("usage: node validate.mjs <en-path> <pl-path>");
  exit(2);
}

let problems = 0;
let reviewCount = 0;
let varMismatchCount = 0;
let missingKeyCount = 0;
let extraKeyCount = 0;
let emptyValueCount = 0;
let parsedFiles = 0;

const fail = (msg) => { problems++; console.error("✗ " + msg); };
const ok   = (msg) => { console.log("✓ " + msg); };

function listFiles(p) {
  const s = statSync(p);
  if (s.isFile()) return [p];
  return readdirSync(p)
    .filter((f) => f.endsWith(".json"))
    .map((f) => join(p, f));
}

function flatten(obj, prefix = "") {
  const out = {};
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    out[prefix] = obj;
    return out;
  }
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

const VAR_RE = /\{[^{}]+\}|%[sd]|%\d+\$[sd]|<[^>]+>/g;
function tokens(s) {
  if (typeof s !== "string") return [];
  return (s.match(VAR_RE) || []).slice().sort();
}
const sameTokens = (a, b) => {
  const ta = tokens(a), tb = tokens(b);
  if (ta.length !== tb.length) return false;
  return ta.every((t, i) => t === tb[i]);
};

const enFiles = listFiles(enPath);
const plFilesAll = listFiles(plPath);
const plByName = new Map(plFilesAll.map((p) => [basename(p), p]));

// Single-file pairs: pair them directly even if basenames differ (e.g. en.json ↔ pl.json).
const singlePair =
  statSync(enPath).isFile() && statSync(plPath).isFile() && enFiles.length === 1 && plFilesAll.length === 1;

for (const enFile of enFiles) {
  const name = basename(enFile);
  const plFile = singlePair ? plFilesAll[0] : plByName.get(name);
  if (!plFile) { fail(`missing Polish file: ${name}`); continue; }

  let enJson, plJson;
  try { enJson = JSON.parse(readFileSync(enFile, "utf8")); }
  catch (e) { fail(`cannot parse en ${name}: ${e.message}`); continue; }
  try { plJson = JSON.parse(readFileSync(plFile, "utf8")); parsedFiles++; }
  catch (e) { fail(`cannot parse pl ${name}: ${e.message}`); continue; }

  const enFlat = flatten(enJson);
  const plFlat = flatten(plJson);

  const enKeys = new Set(Object.keys(enFlat));
  const plKeys = new Set(Object.keys(plFlat));

  for (const k of enKeys) {
    if (!plKeys.has(k)) { fail(`${name}: missing key '${k}'`); missingKeyCount++; }
  }
  for (const k of plKeys) {
    if (k.split(".").pop().startsWith("_review_")) { reviewCount++; continue; }
    if (!enKeys.has(k)) { fail(`${name}: extra key '${k}'`); extraKeyCount++; }
  }

  for (const k of enKeys) {
    if (!plKeys.has(k)) continue;
    const enVal = enFlat[k];
    const plVal = plFlat[k];
    if (typeof enVal === "string" && enVal.length > 0 && typeof plVal === "string" && plVal.length === 0) {
      fail(`${name}: empty pl value for '${k}'`); emptyValueCount++;
    }
    if (!sameTokens(enVal, plVal)) {
      fail(`${name}: variable/tag mismatch in '${k}' (en: ${tokens(enVal).join(",")} | pl: ${tokens(plVal).join(",")})`);
      varMismatchCount++;
    }
  }

  ok(`${name}: ${Object.keys(enFlat).length} keys checked`);
}

console.log("");
console.log(`parsed files:          ${parsedFiles}`);
console.log(`missing keys:          ${missingKeyCount}`);
console.log(`extra keys:            ${extraKeyCount}`);
console.log(`empty pl values:       ${emptyValueCount}`);
console.log(`variable mismatches:   ${varMismatchCount}`);
console.log(`REVIEW markers:        ${reviewCount}`);
console.log("");
if (problems === 0) {
  console.log("✓ all checks passed");
  exit(0);
} else {
  console.error(`✗ ${problems} problem(s) found`);
  exit(1);
}
