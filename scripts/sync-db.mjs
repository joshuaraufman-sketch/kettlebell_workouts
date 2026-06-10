#!/usr/bin/env node
/**
 * sync-db.mjs — generate the TypeScript exercise database from the canonical markdown.
 *
 * Source:    lib/knowledge/kettlebell-exercise-database.md
 * Output:    lib/knowledge/kettlebell-exercise-database.ts
 *
 * The markdown file is the single source of truth. This script emits a TS module
 * that contains (a) the raw markdown as a string literal for the LLM and
 * (b) a structured `ExerciseEntry[]` parsed from the same markdown for code-side
 * filtering (difficulty, category, pattern, equipment).
 *
 * Usage:
 *   npm run sync-db           # regenerate the .ts file
 *   npm run sync-db -- --check # fail with non-zero exit if .ts is stale (CI guard)
 *
 * Zero dependencies — pure Node ESM.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const MD_PATH = resolve(ROOT, 'lib/knowledge/kettlebell-exercise-database.md');
const TS_PATH = resolve(ROOT, 'lib/knowledge/kettlebell-exercise-database.ts');

const CHECK_ONLY = process.argv.includes('--check');

function die(msg) {
  console.error(`sync-db: ${msg}`);
  process.exit(1);
}

// ---------- Read source ----------

if (!existsSync(MD_PATH)) {
  die(`source markdown not found: ${MD_PATH}`);
}
const md = readFileSync(MD_PATH, 'utf-8');

// ---------- Parse version ----------

const versionMatch = md.match(/\*\*Version:\*\*\s*([\d.]+)/);
const version = versionMatch ? versionMatch[1] : 'unknown';

// ---------- Parse entries ----------
//
// Walk lines. Track current `## SECTION` and `### ENTRY`. For each entry,
// collect bullet lines of the form `* **Field:** value`.

const SECTION_RE = /^##\s+(.+?)\s*$/;
const ENTRY_RE = /^###\s+(.+?)\s*$/;
const FIELD_RE = /^\*\s+\*\*([^:]+):\*\*\s*(.*)$/;

const SKIP_SECTIONS = new Set([
  'How to Use This Database',
  'QUICK REFERENCE TABLES',
]);

const entries = [];
let currentSection = null;
let currentEntry = null;

function flush() {
  if (currentEntry) entries.push(currentEntry);
  currentEntry = null;
}

for (const rawLine of md.split('\n')) {
  const line = rawLine.trimEnd();

  const secMatch = line.match(SECTION_RE);
  if (secMatch) {
    flush();
    currentSection = secMatch[1].trim();
    continue;
  }

  // Anything under a skipped section (and its subsections via ###) is ignored.
  if (SKIP_SECTIONS.has(currentSection)) continue;

  const entryMatch = line.match(ENTRY_RE);
  if (entryMatch) {
    flush();
    currentEntry = {
      name: entryMatch[1].trim(),
      section: currentSection,
      fields: {},
    };
    continue;
  }

  if (!currentEntry) continue;

  const fieldMatch = line.match(FIELD_RE);
  if (fieldMatch) {
    const key = fieldMatch[1].trim();
    const value = fieldMatch[2].trim();
    // Last-write-wins for duplicate keys within an entry (shouldn't happen).
    currentEntry.fields[key] = value;
  }
}
flush();

// ---------- Normalize ----------

const NONE_VALUES = new Set(['none', 'none common']);

function splitList(value) {
  if (!value) return [];
  return value
    .split(/,\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function filterNone(arr) {
  return arr.filter((s) => {
    const lower = s.toLowerCase();
    return !NONE_VALUES.has(lower) && !lower.startsWith('none ');
  });
}

function normalize(entry) {
  const f = entry.fields;
  const out = {
    name: entry.name,
    section: entry.section,
    aliases: filterNone(splitList(f['Aliases'])),
    pattern: splitList(f['Pattern']),
    equipment: f['Equipment'] || '',
    difficulty: f['Difficulty'] || '',
    prerequisites: filterNone(splitList(f['Prerequisites'])),
    typicalReps: f['Typical reps'] || '',
  };
  if (f['Category']) out.category = f['Category'];
  if (f['How-to']) out.howTo = f['How-to'];
  if (f['Sequence']) out.sequence = f['Sequence'];
  if (f['Run style']) out.runStyle = f['Run style'];
  if (f['Note']) out.note = f['Note'];
  return out;
}

const normalized = entries.map(normalize);

// ---------- Validate ----------

const errors = [];
const warnings = [];
const seen = new Set();

for (const e of normalized) {
  if (seen.has(e.name)) errors.push(`duplicate entry name: ${e.name}`);
  seen.add(e.name);

  const required = ['equipment', 'difficulty', 'typicalReps'];
  for (const k of required) {
    if (!e[k]) warnings.push(`${e.name}: missing '${k}'`);
  }
  if (!e.pattern.length) warnings.push(`${e.name}: missing Pattern`);

  const isComplex = !!e.sequence;
  if (!isComplex && !e.category) {
    warnings.push(`${e.name}: not a complex but missing Category`);
  }
  if (!isComplex && !e.howTo) {
    warnings.push(`${e.name}: not a complex but missing How-to`);
  }
}

if (warnings.length) {
  console.warn('sync-db: warnings:');
  for (const w of warnings) console.warn(`  - ${w}`);
}
if (errors.length) {
  console.error('sync-db: errors:');
  for (const e of errors) console.error(`  - ${e}`);
  die(`aborting — ${errors.length} error(s)`);
}

// ---------- Build TS output ----------

function escapeForTemplate(s) {
  // Order matters: backslashes first so they don't double-escape later.
  return s
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

const escapedMd = escapeForTemplate(md);
const sourceHash = createHash('sha256').update(md).digest('hex').slice(0, 12);

const ts = `/**
 * Canonical kettlebell exercise database.
 *
 * AUTO-GENERATED from \`lib/knowledge/kettlebell-exercise-database.md\`.
 * Do not edit this file directly — edit the markdown and run \`npm run sync-db\`.
 *
 * Database version: ${version}
 * Source hash:      ${sourceHash}
 * Entry count:      ${normalized.length}
 */

export interface ExerciseEntry {
  /** Display name as it appears under the \`###\` heading. */
  name: string;
  /** The \`##\` section the entry lives in (e.g., 'SINGLE KETTLEBELL — BALLISTICS'). */
  section: string;
  /** Alternate names. Empty when source says 'None common' or 'None'. */
  aliases: string[];
  /** Movement pattern tokens (Hinge, Squat, Push, etc.). */
  pattern: string[];
  /** Equipment string ('1 KB', '2 KB', 'KB + BW', 'BW', or combinations). */
  equipment: string;
  /** Difficulty tier ('Beginner', 'Intermediate', 'Advanced', or hyphenated combos). */
  difficulty: string;
  /** Prerequisite movements or capacities. Empty when source says 'None'. */
  prerequisites: string[];
  /** Free-form rep / set / protocol guidance from the source. */
  typicalReps: string;

  // --- Exercise-only fields ---
  /** 'Ballistic' | 'Grind' | 'Carry' | 'Hybrid' | 'Bodyweight' (+ optional qualifier). */
  category?: string;
  /** Form summary for individual exercises. */
  howTo?: string;

  // --- Complex-only fields ---
  /** Movement sequence (e.g., 'Clean → Front Squat → Press'). */
  sequence?: string;
  /** 'Complex (block)' | 'Chain' | 'Either' — newer complex entries only. */
  runStyle?: string;
  /** Programming or context notes for complexes. */
  note?: string;
}

/** Database version pulled from the markdown header. */
export const DATABASE_VERSION = '${version}';

/** SHA-256 prefix of the source markdown — for cache busting / drift detection. */
export const DATABASE_SOURCE_HASH = '${sourceHash}';

/** Raw markdown form of the database. Fed to the LLM verbatim. */
export const KETTLEBELL_EXERCISE_DATABASE = \`${escapedMd}\`;

/** Structured entries parsed from the markdown, in source order. */
export const EXERCISES: ExerciseEntry[] = ${JSON.stringify(normalized, null, 2)};

/** Lowercase-name -> entry. Includes aliases. */
export const EXERCISES_BY_NAME: Record<string, ExerciseEntry> = (() => {
  const map: Record<string, ExerciseEntry> = {};
  for (const e of EXERCISES) {
    map[e.name.toLowerCase()] = e;
    for (const alias of e.aliases) {
      const key = alias.toLowerCase();
      if (!(key in map)) map[key] = e;
    }
  }
  return map;
})();

// ---------- Filter helpers ----------
//
// Filtering is intentionally permissive — fields are free-form strings, so
// helpers do substring / token matching rather than strict equality.

const DIFFICULTY_ORDER = ['beginner', 'intermediate', 'advanced'];

/**
 * Returns entries that match any of the requested difficulty tiers.
 * Hyphenated tiers (e.g., 'Beginner-Intermediate') match BOTH ends.
 *
 *   byDifficulty('Beginner')                 // Beginner + Beginner-Intermediate
 *   byDifficulty('Beginner', 'Intermediate') // Beginner, Beginner-Intermediate, Intermediate, Intermediate-Advanced
 */
export function byDifficulty(...tiers: string[]): ExerciseEntry[] {
  const want = new Set(tiers.map((t) => t.toLowerCase()));
  return EXERCISES.filter((e) => {
    const parts = e.difficulty.toLowerCase().split(/[\\s\\-/]+/).filter(Boolean);
    return parts.some((p) => want.has(p));
  });
}

/**
 * Returns entries with category containing the given substring.
 *   byCategory('Ballistic') // Ballistic + 'Ballistic (plyometric)' + 'Hybrid (Ballistic)'
 */
export function byCategory(category: string): ExerciseEntry[] {
  const want = category.toLowerCase();
  return EXERCISES.filter((e) => (e.category || '').toLowerCase().includes(want));
}

/**
 * Returns entries whose Pattern field contains any of the given pattern names
 * as a substring (case-insensitive).
 *   byPattern('Squat')        // includes 'Squat (single-leg)', 'Squat (frontal plane)', etc.
 *   byPattern('Push', 'Pull') // any of either pattern
 */
export function byPattern(...patterns: string[]): ExerciseEntry[] {
  const want = patterns.map((p) => p.toLowerCase());
  return EXERCISES.filter((e) =>
    want.some((w) => e.pattern.some((p) => p.toLowerCase().includes(w))),
  );
}

/**
 * Returns entries usable with the given equipment string.
 *   byEquipment('1 KB')        // entries that explicitly list 1 KB (incl. '1 KB or 2 KB', '1 KB + BW')
 *   byEquipment('2 KB')        // entries that explicitly list 2 KB
 *   byEquipment('BW')          // bodyweight-compatible entries
 */
export function byEquipment(equipment: string): ExerciseEntry[] {
  const want = equipment.toLowerCase();
  return EXERCISES.filter((e) => e.equipment.toLowerCase().includes(want));
}

/**
 * Returns entries that satisfy ALL of the supplied filters.
 * Each filter is a function returning a boolean.
 *
 *   filter(
 *     (e) => e.category === 'Ballistic',
 *     (e) => e.difficulty.toLowerCase().includes('beginner'),
 *   );
 */
export function filter(...predicates: Array<(e: ExerciseEntry) => boolean>): ExerciseEntry[] {
  return EXERCISES.filter((e) => predicates.every((p) => p(e)));
}

/** Convenience: max difficulty tier present in an entry's hyphenated label. */
export function difficultyRank(e: ExerciseEntry): number {
  const parts = e.difficulty.toLowerCase().split(/[\\s\\-/]+/).filter(Boolean);
  let max = -1;
  for (const p of parts) {
    const idx = DIFFICULTY_ORDER.indexOf(p);
    if (idx > max) max = idx;
  }
  return max; // -1 if no recognized tier, else 0/1/2.
}
`;

// ---------- Write or check ----------

if (CHECK_ONLY) {
  if (!existsSync(TS_PATH)) {
    die(`--check failed: ${TS_PATH} does not exist. Run \`npm run sync-db\` to generate it.`);
  }
  const existing = readFileSync(TS_PATH, 'utf-8');
  if (existing !== ts) {
    die(`--check failed: ${TS_PATH} is stale. Run \`npm run sync-db\` to update it.`);
  }
  console.log(`sync-db: ${TS_PATH} is up to date (version ${version}, ${normalized.length} entries).`);
  process.exit(0);
}

writeFileSync(TS_PATH, ts, 'utf-8');
console.log(
  `sync-db: wrote ${TS_PATH}\n` +
    `         version ${version}, ${normalized.length} entries, hash ${sourceHash}` +
    (warnings.length ? `, ${warnings.length} warning(s)` : ''),
);
