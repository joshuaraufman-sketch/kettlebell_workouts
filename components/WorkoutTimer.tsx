"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  defaultIntervalSeconds?: number;
  defaultRounds?: number;
}

type Phase = "idle" | "work" | "rest" | "done";

export default function WorkoutTimer({
  defaultIntervalSeconds = 60,
  defaultRounds = 10,
}: Props) {
  const [intervalSeconds, setIntervalSeconds] = useState(defaultIntervalSeconds);
  const [totalRounds, setTotalRounds] = useState(defaultRounds);
  const [restSeconds, setRestSeconds] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const [phase, setPhase] = useState<Phase>("idle");
  const [round, setRound] = useState(1);
  const [remainingMs, setRemainingMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [flash, setFlash] = useState(false);

  const endTimeRef = useRef<number>(0);
  const stateRef = useRef({
    phase,
    round,
    intervalSeconds,
    totalRounds,
    restSeconds,
    soundOn,
  });
  stateRef.current = {
    phase,
    round,
    intervalSeconds,
    totalRounds,
    restSeconds,
    soundOn,
  };

  // Sync inputs into displayed time while idle so the readout reflects settings.
  useEffect(() => {
    if (phase === "idle") setRemainingMs(intervalSeconds * 1000);
  }, [intervalSeconds, phase]);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTimeRef.current - now);
      if (remaining > 0) {
        setRemainingMs(remaining);
        return;
      }
      const s = stateRef.current;
      triggerFlash();
      if (s.phase === "work") {
        if (s.restSeconds > 0) {
          endTimeRef.current = now + s.restSeconds * 1000;
          setPhase("rest");
          setRemainingMs(s.restSeconds * 1000);
          playBeep(s.soundOn);
        } else {
          advanceRound(now);
        }
      } else if (s.phase === "rest") {
        advanceRound(now);
      }
    };
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [running]);

  function triggerFlash() {
    setFlash(true);
    window.setTimeout(() => setFlash(false), 250);
  }

  function advanceRound(now: number) {
    const s = stateRef.current;
    const next = s.round + 1;
    if (next > s.totalRounds) {
      setPhase("done");
      setRunning(false);
      setRemainingMs(0);
      playDone(s.soundOn);
      return;
    }
    setRound(next);
    setPhase("work");
    endTimeRef.current = now + s.intervalSeconds * 1000;
    setRemainingMs(s.intervalSeconds * 1000);
    playBeep(s.soundOn);
  }

  function start() {
    if (phase === "idle" || phase === "done") {
      setRound(1);
      setPhase("work");
      endTimeRef.current = Date.now() + intervalSeconds * 1000;
      setRemainingMs(intervalSeconds * 1000);
      setRunning(true);
      primeAudio();
      return;
    }
    endTimeRef.current = Date.now() + remainingMs;
    setRunning(true);
    primeAudio();
  }

  function pause() {
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    setPhase("idle");
    setRound(1);
    setRemainingMs(intervalSeconds * 1000);
  }

  function skipRound() {
    if (phase === "idle") return;
    const next = round + 1;
    if (next > totalRounds) {
      setPhase("done");
      setRunning(false);
      setRemainingMs(0);
      return;
    }
    setRound(next);
    setPhase("work");
    endTimeRef.current = Date.now() + intervalSeconds * 1000;
    setRemainingMs(intervalSeconds * 1000);
  }

  const seconds = Math.ceil(remainingMs / 1000);
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  const display = `${mm.toString().padStart(2, "0")}:${ss
    .toString()
    .padStart(2, "0")}`;

  const phaseLabel =
    phase === "work"
      ? "Work"
      : phase === "rest"
        ? "Rest"
        : phase === "done"
          ? "Done"
          : "Ready";

  return (
    <section
      aria-label="Interval timer"
      className="no-print rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
          Interval timer
        </h3>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          Useful for EMOM and circuit work.
        </span>
      </div>

      <div
        className={[
          "mt-4 grid gap-4 rounded-xl p-4 transition-colors sm:p-6",
          phase === "work"
            ? "bg-emerald-50 dark:bg-emerald-950/40"
            : phase === "rest"
              ? "bg-amber-50 dark:bg-amber-950/40"
              : phase === "done"
                ? "bg-sky-50 dark:bg-sky-950/40"
                : "bg-neutral-100 dark:bg-neutral-950/40",
          flash ? "ring-2 ring-neutral-900 dark:ring-white" : "",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
              {phaseLabel}
            </p>
            <p
              className="font-mono text-5xl font-bold leading-none tabular-nums sm:text-6xl"
              aria-live="polite"
            >
              {display}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
              Round
            </p>
            <p className="text-3xl font-semibold tabular-nums sm:text-4xl">
              {round}
              <span className="text-base font-normal text-neutral-500 dark:text-neutral-400">
                {" / "}
                {totalRounds}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {running ? (
            <button
              type="button"
              onClick={pause}
              className={primaryBtn}
              aria-label="Pause timer"
            >
              Pause
            </button>
          ) : (
            <button
              type="button"
              onClick={start}
              className={primaryBtn}
              aria-label={phase === "idle" || phase === "done" ? "Start timer" : "Resume timer"}
            >
              {phase === "idle" || phase === "done" ? "Start" : "Resume"}
            </button>
          )}
          <button
            type="button"
            onClick={skipRound}
            disabled={phase === "idle" || phase === "done"}
            className={secondaryBtn}
            aria-label="Skip to next round"
          >
            Next round
          </button>
          <button
            type="button"
            onClick={reset}
            className={secondaryBtn}
            aria-label="Reset timer"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => setSoundOn((s) => !s)}
            className={secondaryBtn}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute sound" : "Unmute sound"}
          >
            {soundOn ? "Sound on" : "Sound off"}
          </button>
        </div>
      </div>

      <fieldset className="mt-4 grid gap-3 sm:grid-cols-3">
        <legend className="sr-only">Timer settings</legend>
        <NumberField
          label="Interval (sec)"
          value={intervalSeconds}
          min={5}
          max={600}
          step={5}
          onChange={setIntervalSeconds}
          disabled={running}
        />
        <NumberField
          label="Rounds"
          value={totalRounds}
          min={1}
          max={99}
          step={1}
          onChange={setTotalRounds}
          disabled={running}
        />
        <NumberField
          label="Rest (sec)"
          value={restSeconds}
          min={0}
          max={300}
          step={5}
          onChange={setRestSeconds}
          disabled={running}
        />
      </fieldset>
    </section>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <label className="grid gap-1 text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
      {label}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isFinite(n)) {
            onChange(Math.max(min, Math.min(max, n)));
          }
        }}
        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-normal normal-case tracking-normal text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
      />
    </label>
  );
}

const primaryBtn =
  "inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200";

const secondaryBtn =
  "inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800";

let audioCtx: AudioContext | null = null;

function primeAudio() {
  if (typeof window === "undefined") return;
  try {
    if (!audioCtx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      void audioCtx.resume();
    }
  } catch {
    audioCtx = null;
  }
}

function playBeep(soundOn: boolean) {
  if (!soundOn || !audioCtx) return;
  beep(audioCtx, 880, 0.18, 0.25);
}

function playDone(soundOn: boolean) {
  if (!soundOn || !audioCtx) return;
  const ctx = audioCtx;
  beep(ctx, 880, 0.18, 0.25);
  window.setTimeout(() => beep(ctx, 660, 0.18, 0.25), 220);
  window.setTimeout(() => beep(ctx, 990, 0.32, 0.25), 440);
}

function beep(ctx: AudioContext, freq: number, duration: number, gain: number) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.frequency.value = freq;
  osc.type = "sine";
  osc.connect(g);
  g.connect(ctx.destination);
  const t = ctx.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}
