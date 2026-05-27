"use client";

import { useEffect, useState } from "react";
import WorkoutForm, { DEFAULT_INPUTS } from "@/components/WorkoutForm";
import WorkoutOutput from "@/components/WorkoutOutput";
import SavedWorkouts from "@/components/SavedWorkouts";
import { parseWorkout } from "@/lib/parseWorkout";
import type { WorkoutInputs } from "@/lib/workoutPrompt";
import {
  clearAllSavedWorkouts,
  deleteSavedWorkout,
  listSavedWorkouts,
  saveWorkout,
  type SavedWorkout,
} from "@/lib/savedWorkouts";

export default function Page() {
  const [workout, setWorkout] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastInputs, setLastInputs] = useState<WorkoutInputs>(DEFAULT_INPUTS);
  const [hasGenerated, setHasGenerated] = useState(false);

  const [saved, setSaved] = useState<SavedWorkout[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentSavedId, setCurrentSavedId] = useState<string | null>(null);

  useEffect(() => {
    setSaved(listSavedWorkouts());
  }, []);

  async function generate(inputs: WorkoutInputs) {
    setLastInputs(inputs);
    setHasGenerated(true);
    setLoading(true);
    setError(null);
    setWorkout(null);
    setCurrentSavedId(null);

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

  function handleSave() {
    if (!workout) return;
    if (currentSavedId) return;
    const parsed = parseWorkout(workout);
    const entry = saveWorkout({
      workout,
      title: parsed.title,
      inputs: lastInputs,
    });
    setSaved((prev) => [entry, ...prev]);
    setCurrentSavedId(entry.id);
  }

  function handleOpenSaved(item: SavedWorkout) {
    setWorkout(item.workout);
    setLastInputs(item.inputs);
    setHasGenerated(true);
    setLoading(false);
    setError(null);
    setCurrentSavedId(item.id);
    setDrawerOpen(false);
  }

  function handleDeleteSaved(id: string) {
    deleteSavedWorkout(id);
    setSaved((prev) => prev.filter((w) => w.id !== id));
    if (currentSavedId === id) setCurrentSavedId(null);
  }

  function handleClearAll() {
    clearAllSavedWorkouts();
    setSaved([]);
    setCurrentSavedId(null);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <header className="no-print mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Kettlebell Workout Generator
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Practical, time-boxed kettlebell sessions. Pick your inputs and
            generate a 30-minute workout by default.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="shrink-0 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Open saved workouts"
        >
          Saved
          {saved.length > 0 && (
            <span className="ml-1.5 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-neutral-900 px-1.5 text-xs font-semibold text-white dark:bg-white dark:text-neutral-900">
              {saved.length}
            </span>
          )}
        </button>
      </header>

      <div className="grid gap-6">
        <WorkoutForm loading={loading} onSubmit={generate} />
        <WorkoutOutput
          workout={workout}
          inputs={hasGenerated ? lastInputs : null}
          loading={loading}
          error={error}
          isSaved={currentSavedId !== null}
          onRegenerate={() => generate(lastInputs)}
          onSave={handleSave}
        />
      </div>

      <footer className="no-print mt-10 text-xs text-neutral-500 dark:text-neutral-500">
        Stop or reduce load if form breaks down. This tool is not medical
        advice.
      </footer>

      <SavedWorkouts
        open={drawerOpen}
        saved={saved}
        onClose={() => setDrawerOpen(false)}
        onOpen={handleOpenSaved}
        onDelete={handleDeleteSaved}
        onClearAll={handleClearAll}
      />
    </main>
  );
}
