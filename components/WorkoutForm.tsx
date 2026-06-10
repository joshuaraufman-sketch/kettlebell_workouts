"use client";

import { useEffect, useMemo, useState } from "react";
import { filterComplexes } from "@/lib/complexes";
import type {
  Duration,
  Equipment,
  Focus,
  Intensity,
  SkillLevel,
  WorkoutInputs,
  WorkoutType,
} from "@/lib/workoutPrompt";

const WORKOUT_TYPE_OPTIONS: { value: WorkoutType; label: string }[] = [
  { value: "full-body-conditioning", label: "Full body conditioning" },
  { value: "full-body-strength", label: "Full body strength" },
  { value: "upper-body-strength", label: "Upper body strength" },
  { value: "lower-body-strength", label: "Lower body strength" },
  { value: "beginner", label: "Beginner" },
  { value: "recovery-mobility", label: "Recovery / mobility" },
];

const SKILL_OPTIONS: { value: SkillLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const EQUIPMENT_OPTIONS: { value: Equipment; label: string }[] = [
  { value: "one-kettlebell", label: "One kettlebell" },
  { value: "two-kettlebells", label: "Two kettlebells" },
  { value: "kettlebell-plus-bodyweight", label: "Kettlebell + bodyweight" },
];

const INTENSITY_OPTIONS: { value: Intensity; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "moderate", label: "Moderate" },
  { value: "hard", label: "Hard" },
];

const FOCUS_OPTIONS: { value: Focus; label: string }[] = [
  { value: "none", label: "No specific focus" },
  { value: "fat-loss", label: "Fat loss / conditioning" },
  { value: "strength", label: "Strength" },
  { value: "work-capacity", label: "Work capacity" },
  { value: "mobility", label: "Mobility" },
  { value: "posterior-chain", label: "Posterior chain" },
  { value: "core", label: "Core" },
];

const DURATION_OPTIONS: Duration[] = [15, 20, 30, 45];

export const DEFAULT_INPUTS: WorkoutInputs = {
  workoutType: "full-body-conditioning",
  duration: 30,
  skillLevel: "intermediate",
  equipment: "one-kettlebell",
  intensity: "moderate",
  focus: "none",
  useComplex: false,
  complexName: "",
  useEMOM: false,
};

interface Props {
  loading: boolean;
  onSubmit: (inputs: WorkoutInputs) => void;
}

export default function WorkoutForm({ loading, onSubmit }: Props) {
  const [inputs, setInputs] = useState<WorkoutInputs>(DEFAULT_INPUTS);

  const availableComplexes = useMemo(
    () => filterComplexes(inputs.equipment, inputs.skillLevel),
    [inputs.equipment, inputs.skillLevel],
  );

  // Clear stale complex selection when equipment/skill change invalidates it.
  useEffect(() => {
    if (
      inputs.complexName &&
      !availableComplexes.some((c) => c.name === inputs.complexName)
    ) {
      setInputs((prev) => ({ ...prev, complexName: "" }));
    }
  }, [availableComplexes, inputs.complexName]);

  function update<K extends keyof WorkoutInputs>(key: K, value: WorkoutInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(inputs);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="no-print grid gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
    >
      <Field label="Workout type">
        <select
          className={selectClass}
          value={inputs.workoutType}
          onChange={(e) => update("workoutType", e.target.value as WorkoutType)}
        >
          {WORKOUT_TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Duration">
          <div className="flex flex-wrap gap-2">
            {DURATION_OPTIONS.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => update("duration", d)}
                className={pillClass(inputs.duration === d)}
              >
                {d} min
              </button>
            ))}
          </div>
        </Field>

        <Field label="Skill level">
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTIONS.map((o) => (
              <button
                type="button"
                key={o.value}
                onClick={() => update("skillLevel", o.value)}
                className={pillClass(inputs.skillLevel === o.value)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Equipment">
          <select
            className={selectClass}
            value={inputs.equipment}
            onChange={(e) => update("equipment", e.target.value as Equipment)}
          >
            {EQUIPMENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Intensity">
          <div className="flex flex-wrap gap-2">
            {INTENSITY_OPTIONS.map((o) => (
              <button
                type="button"
                key={o.value}
                onClick={() => update("intensity", o.value)}
                className={pillClass(inputs.intensity === o.value)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <Field label="Optional focus">
        <select
          className={selectClass}
          value={inputs.focus}
          onChange={(e) => update("focus", e.target.value as Focus)}
        >
          {FOCUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
          Structure
        </span>
        <div className="space-y-3">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={inputs.useComplex}
              onChange={(e) => update("useComplex", e.target.checked)}
              className={checkboxClass}
            />
            <div className="leading-snug">
              <div className="font-medium text-neutral-800 dark:text-neutral-200">
                Build around a complex
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Main section will be one named complex from the database.
              </div>
            </div>
          </label>

          {inputs.useComplex && (
            <div className="ml-7">
              <select
                className={selectClass}
                value={inputs.complexName}
                onChange={(e) => update("complexName", e.target.value)}
              >
                <option value="">Auto (let generator pick)</option>
                {availableComplexes.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {availableComplexes.length === 0 && (
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  No complexes match your current equipment and skill. Generator
                  will pick freely.
                </p>
              )}
            </div>
          )}

          <label className="flex cursor-pointer items-start gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={inputs.useEMOM}
              onChange={(e) => update("useEMOM", e.target.checked)}
              className={checkboxClass}
            />
            <div className="leading-snug">
              <div className="font-medium text-neutral-800 dark:text-neutral-200">
                EMOM
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Main section structured as Every Minute On the Minute.
              </div>
            </div>
          </label>

          {inputs.useComplex && inputs.useEMOM && (
            <p className="ml-7 text-xs text-neutral-500 dark:text-neutral-400">
              Both selected → complex will run on an EMOM cadence.
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {loading ? "Generating..." : "Generate workout"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
        {label}
      </span>
      {children}
    </label>
  );
}

const selectClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100";

const checkboxClass =
  "mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-950";

function pillClass(active: boolean) {
  return [
    "rounded-full border px-3 py-1.5 text-sm transition",
    active
      ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
      : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800",
  ].join(" ");
}
