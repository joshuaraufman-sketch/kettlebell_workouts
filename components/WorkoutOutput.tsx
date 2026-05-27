"use client";

import { useState } from "react";

interface Props {
  workout: string | null;
  loading: boolean;
  error: string | null;
  onRegenerate: () => void;
}

export default function WorkoutOutput({
  workout,
  loading,
  error,
  onRegenerate,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!workout) return;
    try {
      await navigator.clipboard.writeText(workout);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
        Generating your workout...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        <p className="font-medium">Couldn&apos;t generate a workout.</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-sm text-neutral-500 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
        Fill out the form and your workout will appear here.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="no-print flex flex-wrap items-center justify-end gap-2 border-b border-neutral-200 p-3 dark:border-neutral-800">
        <button onClick={handleCopy} className={toolbarBtn}>
          {copied ? "Copied" : "Copy"}
        </button>
        <button onClick={() => window.print()} className={toolbarBtn}>
          Print
        </button>
        <button onClick={onRegenerate} className={toolbarBtn}>
          Regenerate
        </button>
      </div>
      <article className="prose-kb p-6">
        <Markdown source={workout} />
      </article>
    </div>
  );
}

const toolbarBtn =
  "rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-800";

/**
 * Minimal Markdown renderer for the subset of syntax our prompt produces:
 * # h1, ## h2, **bold**, - bullets, and paragraphs.
 */
function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];

  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={key++} className="mb-2 text-2xl font-semibold tracking-tight">
          {renderInline(line.slice(2))}
        </h1>,
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2
          key={key++}
          className="mb-2 mt-6 text-lg font-semibold tracking-tight"
        >
          {renderInline(line.slice(3))}
        </h2>,
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="mb-1 mt-4 text-base font-semibold">
          {renderInline(line.slice(4))}
        </h3>,
      );
      i++;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-2 list-disc space-y-1 pl-5">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Paragraph: gather contiguous non-empty, non-special lines.
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !/^\s*[-*]\s+/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-2 leading-relaxed">
        {renderInline(paraLines.join(" "))}
      </p>,
    );
  }

  return <>{blocks}</>;
}

function renderInline(text: string): React.ReactNode[] {
  // Split on **bold** segments.
  const parts: React.ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={key++} className="font-semibold">
        {match[1]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}
