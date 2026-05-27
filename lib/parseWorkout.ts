export interface WorkoutMetadata {
  duration?: string;
  equipment?: string;
  level?: string;
  goal?: string;
}

export interface WorkoutSection {
  heading: string;
  key: SectionKey;
  content: string;
}

export type SectionKey =
  | "warmup"
  | "main"
  | "finisher"
  | "notes"
  | "scaling"
  | "other";

export interface ParsedWorkout {
  title: string | null;
  metadata: WorkoutMetadata;
  sections: WorkoutSection[];
  raw: string;
}

export function parseWorkout(markdown: string): ParsedWorkout {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let title: string | null = null;
  const metadata: WorkoutMetadata = {};
  const sections: WorkoutSection[] = [];

  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;

  if (i < lines.length && lines[i].startsWith("# ")) {
    title = stripPlaceholderBrackets(lines[i].slice(2).trim());
    i++;
  }

  while (i < lines.length) {
    const line = lines[i].trim();
    if (line === "") {
      i++;
      continue;
    }
    if (line.startsWith("## ") || line.startsWith("# ")) break;
    const m = line.match(/^\*\*([^*]+?):\*\*\s*(.*)$/);
    if (!m) break;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === "duration") metadata.duration = value;
    else if (key === "equipment") metadata.equipment = value;
    else if (key === "level") metadata.level = value;
    else if (key === "goal") metadata.goal = value;
    i++;
  }

  let current: WorkoutSection | null = null;
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      const heading = line.slice(3).trim();
      current = { heading, key: sectionKey(heading), content: "" };
    } else if (current) {
      current.content += (current.content ? "\n" : "") + line;
    }
  }
  if (current) sections.push(current);
  for (const s of sections) s.content = s.content.trim();

  return { title, metadata, sections, raw: markdown };
}

function stripPlaceholderBrackets(s: string): string {
  return s.replace(/^\[(.+)\]$/, "$1");
}

function sectionKey(heading: string): SectionKey {
  const h = heading.toLowerCase().replace(/[^a-z]/g, "");
  if (h.includes("warm")) return "warmup";
  if (h.includes("main")) return "main";
  if (h.includes("finish") || h.includes("cool")) return "finisher";
  if (h.includes("note")) return "notes";
  if (h.includes("scal")) return "scaling";
  return "other";
}

const SECTION_ORDER: SectionKey[] = [
  "warmup",
  "main",
  "finisher",
  "notes",
  "scaling",
];

export function orderedSections(sections: WorkoutSection[]): WorkoutSection[] {
  const byKey = new Map<SectionKey, WorkoutSection[]>();
  for (const s of sections) {
    const list = byKey.get(s.key) ?? [];
    list.push(s);
    byKey.set(s.key, list);
  }
  const out: WorkoutSection[] = [];
  for (const key of SECTION_ORDER) {
    const list = byKey.get(key);
    if (list) out.push(...list);
  }
  const others = byKey.get("other");
  if (others) out.push(...others);
  return out;
}

export interface EmomHint {
  intervalSeconds: number;
  totalRounds: number;
}

export function detectEmom(text: string): EmomHint | null {
  const minMatch = text.match(/(\d+)[\s-]?(?:minute|min)\s+EMOM/i);
  if (minMatch) {
    return { intervalSeconds: 60, totalRounds: parseInt(minMatch[1], 10) };
  }
  if (/\bEMOM\b/i.test(text)) {
    return { intervalSeconds: 60, totalRounds: 10 };
  }
  return null;
}

export function detectRounds(text: string): number | null {
  const m = text.match(/(\d+)\s+rounds?/i);
  return m ? parseInt(m[1], 10) : null;
}
