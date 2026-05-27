import { exerciseLibraryForPrompt } from "./exercises";
import { EXERCISES_52 } from "./knowledge/52-exercises";
import { COMPLEX_CHALLENGE_10X10 } from "./knowledge/10x10-complex-challenge";
import { ISSA_6_WEEK_PROGRAM } from "./knowledge/issa-6-week-program";
import { KETTLEBELL_BASICS_101 } from "./knowledge/kettlebell-basics-101";
import { WEEKLY_PROGRAM_TEMPLATE } from "./knowledge/weekly-program-template";

/**
 * Mirrors the custom instructions of the "Kettle Workouts" Claude project.
 * Edit this string to keep the web app in sync with the project's instructions.
 */
export const PROJECT_INSTRUCTIONS = `You are a kettlebell programming assistant. You write practical, safe, time-boxed kettlebell workouts in a plainspoken tone.

Rules you always follow:
- Keep workouts time-boxed. Default structure: ~5 min warm-up, ~20 min main block, ~5 min finisher or cooldown. Scale proportionally to the requested duration.
- Use simple kettlebell patterns: swing/hinge, goblet squat, clean, press/push press, row, reverse lunge, carry, halo, Turkish get-up only when appropriate.
- No more than 4-6 main exercises per workout. Prefer EMOM, AMRAP, circuits, ladders, and complexes. Include explicit rest periods. Preserve form quality.
- Beginner workouts must avoid snatches, complex flows, and high-rep overhead work.
- Include short technique cues for swings, cleans, squats, presses, and lunges when they appear in the workout.
- Add a brief note to stop or reduce load if form breaks down.
- Do not make medical claims. Do not invent citations. Do not be overly enthusiastic. No emojis. No hype.
- Respect the requested equipment. If the user has one kettlebell, do not program movements that require two.`;

/**
 * Mirrors the knowledge files attached to the "Kettle Workouts" Claude project.
 * Each entry is rendered as a labeled document in the system prompt.
 */
export interface KnowledgeDoc {
  title: string;
  content: string;
}

export const PROJECT_KNOWLEDGE: KnowledgeDoc[] = [
  {
    title: "Exercise Library (curated)",
    content: exerciseLibraryForPrompt(),
  },
  {
    title: "52 Kettlebell Exercises (GB Personal Training)",
    content: EXERCISES_52,
  },
  {
    title: "Kettlebell Basics 101 (BestKettlebellWorkout.com)",
    content: KETTLEBELL_BASICS_101,
  },
  {
    title: "ISSA 6-Week Kettlebell Program (Josh Bryant)",
    content: ISSA_6_WEEK_PROGRAM,
  },
  {
    title: "10x10 Complex Challenge (AJ Holland, Doc's Fitness)",
    content: COMPLEX_CHALLENGE_10X10,
  },
  {
    title: "Reference weekly program (~30 min/day, one kettlebell)",
    content: WEEKLY_PROGRAM_TEMPLATE,
  },
];

export function renderProjectSystemPrompt(): string {
  const knowledge = PROJECT_KNOWLEDGE.map(
    (doc) => `# ${doc.title}\n\n${doc.content}`,
  ).join("\n\n---\n\n");

  return `${PROJECT_INSTRUCTIONS}\n\n---\n\n# Project knowledge\n\nThe following reference material is attached to the project. Use it as the canonical source when generating workouts. Prefer names and descriptions from this material over inventing alternatives.\n\n${knowledge}`;
}
