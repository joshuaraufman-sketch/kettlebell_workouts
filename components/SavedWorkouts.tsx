"use client";

import { useEffect } from "react";
import type { SavedWorkout } from "@/lib/savedWorkouts";

interface Props {
  open: boolean;
  saved: SavedWorkout[];
  onClose: () => void;
  onOpen: (saved: SavedWorkout) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const LABELS: Record<string, string> = {
  "full-body-conditioning": "Full body conditioning",
  "full-body-strength": "Full body strength",
  "upper-body-strength": "Upper body strength",
  "lower-body-strength": "Lower body strength",
  beginner: "Beginner",
  "recovery-mobility": "Recovery / mobility",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

function formatLabel(value: string): string {
  return LABELS[value] ?? value;
}

export default function SavedWorkouts({
  open,
  saved,
  onClose,
  onOpen,
  onDelete,
  onClearAll,
}: Props) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      className={[
        "no-print fixed inset-0 z-40 transition-opacity",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close saved workouts"
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
        tabIndex={open ? 0 : -1}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Saved workouts"
        className={[
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neutral-200 bg-white shadow-xl transition-transform dark:border-neutral-800 dark:bg-neutral-900",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <header className="flex items-center justify-between gap-2 border-b border-neutral-200 p-4 dark:border-neutral-800">
          <div>
            <h2 className="text-base font-semibold">Saved workouts</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {saved.length === 0
                ? "Nothing saved yet."
                : `${saved.length} ${saved.length === 1 ? "workout" : "workouts"}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {saved.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
              <p className="font-medium text-neutral-700 dark:text-neutral-200">
                No saved workouts
              </p>
              <p className="mt-1">
                Tap <span className="font-medium">Save</span> on a generated
                workout to keep it here for later.
              </p>
            </div>
          ) : (
            <ul className="grid gap-3">
              {saved.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold leading-snug">
                        {item.title ?? "Kettlebell workout"}
                      </h3>
                      <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                        {new Date(item.savedAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Chip>{item.inputs.duration} min</Chip>
                    <Chip>{formatLabel(item.inputs.workoutType)}</Chip>
                    <Chip>{formatLabel(item.inputs.skillLevel)}</Chip>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onOpen(item)}
                      className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                      Open
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {saved.length > 0 && (
          <footer className="border-t border-neutral-200 p-4 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClearAll}
              className="w-full rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-900 dark:bg-neutral-950 dark:text-red-300 dark:hover:bg-red-950"
            >
              Clear all saved workouts
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
      {children}
    </span>
  );
}
