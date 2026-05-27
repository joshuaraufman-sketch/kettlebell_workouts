"use client";

import { useMemo, useState } from "react";
import {
  detectEmom,
  detectRounds,
  orderedSections,
  parseWorkout,
  type SectionKey,
  type WorkoutSection,
} from "@/lib/parseWorkout";
import type { WorkoutInputs } from "@/lib/workoutPrompt";
import WorkoutTimer from "./WorkoutTimer";

interface Props {
  workout: string | null;
  inputs: WorkoutInputs | null;
  loading: boolean;
  error: string | null;
  isSaved: boolean;
  onRegenerate: () => void;
  onSave: () => void;
}

const TYPE_LABEL: Record<string, string> = {
  "full-body-conditioning": "Full body conditioning",
  "full-body-strength": "Full body strength",
  "upper-body-strength": "Upper body strength",
  "lower-body-strength": "Lower body strength",
  beginner: "Beginner",
  "recovery-mobility": "Recovery / mobility",
};

const LEVEL_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const EQUIP_LABEL: Record<string, string> = {
  "one-kettlebell": "One kettlebell",
  "two-kettlebells": "Two kettlebells",
  "kettlebell-plus-bodyweight": "Kettlebell + bodyweight",
};

const INTENSITY_LABEL: Record<string, string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
};

const FOCUS_LABEL: Record<string, string> = {
  none: "",
  "fat-loss": "Fat loss",
  strength: "Strength",
  "work-capacity": "Work capacity",
  mobility: "Mobility",
  "posterior-chain": "Posterior chain",
  core: "Core",
};

export default function WorkoutOutput({
  workout,
  inputs,
  loading,
  error,
  isSaved,
  onRegenerate,
  onSave,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);

  const parsed = useMemo(
    () => (workout ? parseWorkout(workout) : null),
    [workout],
  );

  const timerHint = useMemo(() => {
    if (!parsed) return null;
    const main = parsed.sections.find((s) => s.key === "main");
    if (!main) return null;
    const emom = detectEmom(main.content);
    if (emom) return emom;
    const rounds = detectRounds(main.content);
    if (rounds) return { intervalSeconds: 60, totalRounds: rounds };
    return null;
  }, [parsed]);

  async function handleCopy() {
    if (!workout) return;
    try {
      await navigator.clipboard.writeText(workout);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
        Generating your workout...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        <p className="font-medium">Couldn&apos;t generate a workout.</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  if (!parsed || !workout) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-sm text-neutral-500 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
        Fill out the form and your workout will appear here.
      </div>
    );
  }

  const sections = orderedSections(parsed.sections);
  const focusLabel = inputs ? FOCUS_LABEL[inputs.focus] : "";

  return (
    <div className="grid gap-6">
      <div className="no-print flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onSave}
          aria-pressed={isSaved}
          className={[
            "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-neutral-500",
            isSaved
              ? "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-950 dark:text-pink-200 dark:hover:bg-pink-900"
              : "border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800",
          ].join(" ")}
          aria-label={isSaved ? "Workout saved" : "Save workout"}
        >
          <HeartIcon filled={isSaved} />
          {isSaved ? "Saved" : "Save"}
        </button>
        <button type="button" onClick={handleCopy} className={toolbarBtn}>
          {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" onClick={() => window.print()} className={toolbarBtn}>
          Print
        </button>
        <button type="button" onClick={onRegenerate} className={toolbarBtn}>
          Regenerate
        </button>
        <button
          type="button"
          onClick={() => setTimerOpen((v) => !v)}
          aria-pressed={timerOpen}
          className={[toolbarBtn, timerOpen ? "ring-2 ring-neutral-500" : ""].join(" ")}
        >
          {timerOpen ? "Hide timer" : "Timer"}
        </button>
      </div>

      {timerOpen && (
        <WorkoutTimer
          defaultIntervalSeconds={timerHint?.intervalSeconds ?? 60}
          defaultRounds={timerHint?.totalRounds ?? 10}
        />
      )}

      <article className="grid gap-6">
        <header>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {parsed.title ?? "Kettlebell workout"}
          </h1>
        </header>

        <SectionCard
          icon={<InfoIcon />}
          heading="Overview"
          tone="overview"
        >
          {inputs && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              <MetaChip label="Duration" value={`${inputs.duration} min`} />
              <MetaChip
                label="Type"
                value={TYPE_LABEL[inputs.workoutType] ?? inputs.workoutType}
              />
              <MetaChip
                label="Level"
                value={LEVEL_LABEL[inputs.skillLevel] ?? inputs.skillLevel}
              />
              <MetaChip
                label="Intensity"
                value={INTENSITY_LABEL[inputs.intensity] ?? inputs.intensity}
              />
              <MetaChip
                label="Equipment"
                value={EQUIP_LABEL[inputs.equipment] ?? inputs.equipment}
              />
              {focusLabel && <MetaChip label="Focus" value={focusLabel} />}
            </div>
          )}
          {parsed.metadata.goal && (
            <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              <span className="font-semibold">Goal: </span>
              {parsed.metadata.goal}
            </p>
          )}
        </SectionCard>

        {sections.map((section, idx) => (
          <SectionCard
            key={`${section.key}-${idx}`}
            icon={iconFor(section.key)}
            heading={section.heading}
            tone={section.key}
          >
            <Markdown source={section.content} />
          </SectionCard>
        ))}
      </article>
    </div>
  );
}

const toolbarBtn =
  "rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800";

function SectionCard({
  icon,
  heading,
  tone,
  children,
}: {
  icon: React.ReactNode;
  heading: string;
  tone: SectionKey | "overview";
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={heading}
      className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
    >
      <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600 dark:text-neutral-400">
        <span
          aria-hidden="true"
          className={[
            "inline-flex h-7 w-7 items-center justify-center rounded-full",
            toneBg(tone),
          ].join(" ")}
        >
          {icon}
        </span>
        <span className="text-sm tracking-wide text-neutral-900 dark:text-neutral-100">
          {heading}
        </span>
      </h2>
      <div className="text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200">
        {children}
      </div>
    </section>
  );
}

function toneBg(tone: SectionKey | "overview"): string {
  switch (tone) {
    case "overview":
      return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200";
    case "warmup":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200";
    case "main":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200";
    case "finisher":
      return "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200";
    case "notes":
      return "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200";
    case "scaling":
      return "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200";
    default:
      return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200";
  }
}

function iconFor(key: SectionKey) {
  switch (key) {
    case "warmup":
      return <SunIcon />;
    case "main":
      return <TargetIcon />;
    case "finisher":
      return <FlagIcon />;
    case "notes":
      return <NoteIcon />;
    case "scaling":
      return <ArrowsIcon />;
    default:
      return <InfoIcon />;
  }
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200">
      <span className="text-neutral-500 dark:text-neutral-400">{label}:</span>
      <span>{value}</span>
    </span>
  );
}

/* ---------------- Icons (inline SVG) ---------------- */

const ICON_PROPS = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function InfoIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v5h1" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
function FlagIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M4 21V4" />
      <path d="M4 4h12l-2 4 2 4H4" />
    </svg>
  );
}
function NoteIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M9 9h6M9 13h6M9 17h4" />
    </svg>
  );
}
function ArrowsIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M8 4v16M5 7l3-3 3 3M16 20V4M13 17l3 3 3-3" />
    </svg>
  );
}
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* ---------------- Minimal Markdown renderer ---------------- */

function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];

  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="mb-1.5 mt-4 text-base font-semibold">
          {renderInline(line.slice(4))}
        </h3>,
      );
      i++;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-2 list-disc space-y-1.5 pl-5">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !/^\s*[-*]\s+/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-2 leading-relaxed">
        {renderInline(paraLines.join(" "))}
      </p>,
    );
  }

  return <>{blocks}</>;
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={key++} className="font-semibold">
        {match[1]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}
