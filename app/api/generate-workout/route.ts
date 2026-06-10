import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { isValidComplexFor } from "@/lib/complexes";
import {
  buildSystemPrompt,
  buildUserPrompt,
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

  const useComplex = Boolean(b.useComplex);
  const useEMOM = Boolean(b.useEMOM);
  const complexName =
    typeof b.complexName === "string" ? b.complexName.trim() : "";

  // If a specific complex was named, validate it against the user's equipment+skill.
  if (useComplex && complexName !== "") {
    if (!isValidComplexFor(complexName, equipment, skillLevel)) {
      return null;
    }
  }

  return {
    workoutType,
    skillLevel,
    equipment,
    intensity,
    focus,
    duration,
    useComplex,
    complexName,
    useEMOM,
  };
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is missing ANTHROPIC_API_KEY." },
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

  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model,
      max_tokens: 2048,
      system: [
        {
          type: "text",
          text: buildSystemPrompt(),
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: buildUserPrompt(inputs) }],
    });

    const workout = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    if (!workout) {
      return NextResponse.json(
        { error: "The model returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ workout });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "Invalid ANTHROPIC_API_KEY." },
        { status: 500 },
      );
    }
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Rate limited by Anthropic. Try again in a moment." },
        { status: 429 },
      );
    }
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.status ?? 502 },
      );
    }
    const message =
      err instanceof Error ? err.message : "Unknown error generating workout.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
