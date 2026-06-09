import { renderProjectSystemPrompt } from "./projectContext";

export type WorkoutType =
  | "full-body-conditioning"
  | "full-body-strength"
  | "upper-body-strength"
  | "lower-body-strength"
  | "beginner"
  | "recovery-mobility";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type Equipment =
  | "one-kettlebell"
  | "two-kettlebells"
  | "kettlebell-plus-bodyweight";

export type Intensity = "easy" | "moderate" | "hard";

export type Focus =
  | "none"
  | "fat-loss"
  | "strength"
  | "work-capacity"
  | "mobility"
  | "posterior-chain"
  | "core";

export type Duration = 15 | 20 | 30 | 45;

export interface WorkoutInputs {
  workoutType: WorkoutType;
  duration: Duration;
  skillLevel: SkillLevel;
  equipment: Equipment;
  intensity: Intensity;
  focus: Focus;
}

const LABELS = {
  workoutType: {
    "full-body-conditioning": "Full body conditioning",
    "full-body-strength": "Full body strength",
    "upper-body-strength": "Upper body strength",
    "lower-body-strength": "Lower body strength",
    beginner: "Beginner",
    "recovery-mobility": "Recovery / mobility",
  },
  skillLevel: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
  equipment: {
    "one-kettlebell": "One kettlebell",
    "two-kettlebells": "Two kettlebells",
    "kettlebell-plus-bodyweight": "Kettlebell + bodyweight",
  },
  intensity: {
    easy: "Easy",
    moderate: "Moderate",
    hard: "Hard",
  },
  focus: {
    none: "No specific focus",
    "fat-loss": "Fat loss / conditioning",
    strength: "Strength",
    "work-capacity": "Work capacity",
    mobility: "Mobility",
    "posterior-chain": "Posterior chain",
    core: "Core",
  },
} as const;

const OUTPUT_FORMAT_INSTRUCTIONS = `When the user asks for a workout via this web app, output Markdown that follows EXACTLY this structure, headings, and heading levels. Use the headings verbatim. Do not add, rename, or reorder top-level sections.

# [Workout Title]

**Duration:** <minutes>
**Equipment:** <equipment>
**Level:** <level>
**Goal:** <one short sentence>

## Warm-up

A bullet list of 3-5 prep movements with reps or time, scaled to the warm-up portion of the duration.

## Main Workout

Open with ONE plain line stating the format, rounds, and rest — e.g. "Chain circuit: one rep of each move in order, 5 rounds, rest 60-75 seconds between rounds." If you use an interval format, write the words "EMOM" or "N rounds" in this line so the in-app timer can read it.

Then list the 4-6 main exercises as a bullet list, one exercise per line, in the order performed:

- **Exercise name** — reps or time, per side/set

Keep each exercise to a single line.

## Finisher

A short conditioning or carry-based finisher as a brief bullet list, scaled to the remaining time. If the workout type is recovery/mobility, make this a cooldown instead.

## Exercise Notes

A bullet list with one short technique cue per main exercise:

- **Exercise name:** cue

## Scaling

- Easier option: ...
- Harder option: ...
- Suggested kettlebell weight: a range (kg or lb) for the requested skill level, not a single number. End with "Stop or reduce load if form breaks down."

Formatting rules — follow exactly:
- NEVER use Markdown tables or pipe characters (|). List exercises as bullets, never as a table.
- NEVER use numbered lists (1., 2.) — use "-" bullets only.
- NEVER use horizontal rules (---), and NEVER use single-asterisk italics (*text*). For emphasis use **bold** only.
- Do NOT print movement-pattern names or "patterns covered" lines. Use patterns only to select and balance movements behind the scenes — they are internal logic, not output.

Keep the whole workout under ~450 words.`;

export function buildSystemPrompt(): string {
  return `${renderProjectSystemPrompt()}\n\n---\n\n# Output format\n\n${OUTPUT_FORMAT_INSTRUCTIONS}`;
}

export function buildUserPrompt(inputs: WorkoutInputs): string {
  const focusLine =
    inputs.focus === "none"
      ? "No specific focus beyond the workout type."
      : LABELS.focus[inputs.focus];

  // Per-request variation key. It lives in the (uncached) user prompt so that
  // every request — including Regenerate, which resends identical inputs —
  // differs, which keeps the model from collapsing onto the same selection.
  const variationKey = Math.random().toString(36).slice(2, 10);

  return `Generate one kettlebell workout for me.

Variation key: ${variationKey} — produce a fresh exercise selection for this key. Do not reuse a previous workout's exercise list; vary which movements fill each pattern slot while keeping the workout appropriate for the inputs below.

Inputs:
- Workout type: ${LABELS.workoutType[inputs.workoutType]}
- Duration: ${inputs.duration} minutes
- Skill level: ${LABELS.skillLevel[inputs.skillLevel]}
- Equipment: ${LABELS.equipment[inputs.equipment]}
- Intensity: ${LABELS.intensity[inputs.intensity]}
- Optional focus: ${focusLine}`;
}
