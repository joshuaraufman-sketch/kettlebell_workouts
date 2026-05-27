import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  buildPrompt,
  type Duration,
  type Equipment,
  type Focus,
  type Intensity,
  type SkillLevel,
  type WorkoutInputs,
  type WorkoutType,
} from "@/lib/workoutPrompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WORKOUT_TYPES: WorkoutType[] = [
  "full-body-conditioning",
  "full-body-strength",
  "upper-body-strength",
  "lower-body-strength",
  "beginner",
  "recovery-mobility",
];
const SKILL_LEVELS: SkillLevel[] = ["beginner", "intermediate", "advanced"];
const EQUIPMENT: Equipment[] = [
  "one-kettlebell",
  "two-kettlebells",
  "kettlebell-plus-bodyweight",
];
const INTENSITIES: Intensity[] = ["easy", "moderate", "hard"];
const FOCUSES: Focus[] = [
  "none",
  "fat-loss",
  "strength",
  "work-capacity",
  "mobility",
  "posterior-chain",
  "core",
];
const DURATIONS: Duration[] = [15, 20, 30, 45];

function parseInputs(body: unknown): WorkoutInputs | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;

  const workoutType = b.workoutType as WorkoutType;
  const skillLevel = b.skillLevel as SkillLevel;
  const equipment = b.equipment as Equipment;
  const intensity = b.intensity as Intensity;
  const focus = b.focus as Focus;
  const duration = Number(b.duration) as Duration;

  if (!WORKOUT_TYPES.includes(workoutType)) return null;
  if (!SKILL_LEVELS.includes(skillLevel)) return null;
  if (!EQUIPMENT.includes(equipment)) return null;
  if (!INTENSITIES.includes(intensity)) return null;
  if (!FOCUSES.includes(focus)) return null;
  if (!DURATIONS.includes(duration)) return null;

  return { workoutType, skillLevel, equipment, intensity, focus, duration };
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is missing OPENAI_API_KEY." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const inputs = parseInputs(body);
  if (!inputs) {
    return NextResponse.json(
      { error: "Invalid or missing workout inputs." },
      { status: 400 },
    );
  }

  const { system, user } = buildPrompt(inputs);
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const client = new OpenAI({ apiKey });

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.6,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const workout = completion.choices[0]?.message?.content?.trim();
    if (!workout) {
      return NextResponse.json(
        { error: "The model returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ workout });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error generating workout.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
