import { exerciseLibraryForPrompt } from "./exercises";

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

export const SYSTEM_PROMPT = `You are a kettlebell programming assistant. You write practical, safe, time-boxed kettlebell workouts in a plainspoken tone.

Rules you always follow:
- Keep workouts time-boxed. Default structure: ~5 min warm-up, ~20 min main block, ~5 min finisher or cooldown. Scale proportionally to the requested duration.
- Use simple kettlebell patterns: swing/hinge, goblet squat, clean, press/push press, row, reverse lunge, carry, halo, Turkish get-up only when appropriate.
- No more than 4-6 main exercises per workout. Prefer EMOM, AMRAP, circuits, ladders, and complexes. Include explicit rest periods. Preserve form quality.
- Beginner workouts must avoid snatches, complex flows, and high-rep overhead work.
- Include short technique cues for swings, cleans, squats, presses, and lunges when they appear in the workout.
- Add a brief note to stop or reduce load if form breaks down.
- Do not make medical claims. Do not invent citations. Do not be overly enthusiastic. No emojis. No hype.
- Respect the requested equipment. If the user has one kettlebell, do not program movements that require two.
- Output Markdown that follows the exact structure given in the user message. Use the headings exactly as listed. Do not add other top-level sections.

You select movements from the following exercise library. Use the exact names from this list when naming exercises in the workout, and base the technique cues in Exercise Notes on these descriptions. You may include common warm-up/cooldown movements (light cardio, mobility drills, stretches) that aren't in the library only when they fit the warm-up or cooldown.

${exerciseLibraryForPrompt()}`;

export function buildUserPrompt(inputs: WorkoutInputs): string {
  const focusLine =
    inputs.focus === "none"
      ? "No specific focus beyond the workout type."
      : LABELS.focus[inputs.focus];

  return `Generate one kettlebell workout for me.

Inputs:
- Workout type: ${LABELS.workoutType[inputs.workoutType]}
- Duration: ${inputs.duration} minutes
- Skill level: ${LABELS.skillLevel[inputs.skillLevel]}
- Equipment: ${LABELS.equipment[inputs.equipment]}
- Intensity: ${LABELS.intensity[inputs.intensity]}
- Optional focus: ${focusLine}

Output the workout as Markdown using EXACTLY this structure and heading levels:

# [Workout Title]

**Duration:** ${inputs.duration} minutes
**Equipment:** ${LABELS.equipment[inputs.equipment]}
**Level:** ${LABELS.skillLevel[inputs.skillLevel]}
**Goal:** <one short sentence>

## Warm-up

A short list of exercises with reps or time, scaled to the warm-up portion of the total duration.

## Main Workout

State the format clearly (EMOM, AMRAP, circuit, ladder, complex, etc.), then list the 4-6 main exercises with reps/time, rounds, and rest. Keep it tight.

## Finisher

A short conditioning or carry-based finisher scaled to fit the remaining time. If the workout type is recovery/mobility, replace this with a cooldown.

## Exercise Notes

One or two short technique cues per main exercise.

## Scaling

- Easier option: ...
- Harder option: ...
- Suggested kettlebell weight: brief guidance for the requested skill level (give a range in kg or lb, not a single number). Add "stop or reduce load if form breaks down."

Keep the whole thing under ~450 words. Do not add any sections beyond the ones above.`;
}

export function buildPrompt(inputs: WorkoutInputs) {
  return {
    system: SYSTEM_PROMPT,
    user: buildUserPrompt(inputs),
  };
}
