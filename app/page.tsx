"use client";

import { useState } from "react";
import WorkoutForm, { DEFAULT_INPUTS } from "@/components/WorkoutForm";
import WorkoutOutput from "@/components/WorkoutOutput";
import type { WorkoutInputs } from "@/lib/workoutPrompt";

export default function Page() {
  const [workout, setWorkout] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastInputs, setLastInputs] = useState<WorkoutInputs>(DEFAULT_INPUTS);

  async function generate(inputs: WorkoutInputs) {
    setLastInputs(inputs);
    setLoading(true);
    setError(null);
    setWorkout(null);

    try {
      const res = await fetch("/api/generate-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = (await res.json()) as { workout?: string; error?: string };

      if (!res.ok || !data.workout) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      setWorkout(data.workout);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <header className="no-print mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Kettlebell Workout Generator
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Practical, time-boxed kettlebell sessions. Pick your inputs and generate
          a 30-minute workout by default.
        </p>
      </header>

      <div className="grid gap-6">
        <WorkoutForm loading={loading} onSubmit={generate} />
        <WorkoutOutput
          workout={workout}
          loading={loading}
          error={error}
          onRegenerate={() => generate(lastInputs)}
        />
      </div>

      <footer className="no-print mt-10 text-xs text-neutral-500 dark:text-neutral-500">
        Stop or reduce load if form breaks down. This tool is not medical advice.
      </footer>
    </main>
  );
}
