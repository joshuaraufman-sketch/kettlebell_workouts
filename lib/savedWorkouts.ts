import type { WorkoutInputs } from "./workoutPrompt";

export interface SavedWorkout {
  id: string;
  workout: string;
  title: string | null;
  inputs: WorkoutInputs;
  savedAt: string;
}

const STORAGE_KEY = "kettlebell-saved-workouts-v1";

function readAll(): SavedWorkout[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedWorkout);
  } catch {
    return [];
  }
}

function writeAll(list: SavedWorkout[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function isSavedWorkout(v: unknown): v is SavedWorkout {
  if (!v || typeof v !== "object") return false;
  const r = v as Record<string, unknown>;
  return (
    typeof r.id === "string" &&
    typeof r.workout === "string" &&
    typeof r.savedAt === "string" &&
    typeof r.inputs === "object"
  );
}

export function listSavedWorkouts(): SavedWorkout[] {
  return readAll().sort((a, b) => (a.savedAt < b.savedAt ? 1 : -1));
}

export function saveWorkout(
  args: Omit<SavedWorkout, "id" | "savedAt">,
): SavedWorkout {
  const entry: SavedWorkout = {
    ...args,
    id: randomId(),
    savedAt: new Date().toISOString(),
  };
  writeAll([entry, ...readAll()]);
  return entry;
}

export function deleteSavedWorkout(id: string): void {
  writeAll(readAll().filter((w) => w.id !== id));
}

export function clearAllSavedWorkouts(): void {
  writeAll([]);
}

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
