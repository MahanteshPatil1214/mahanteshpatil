"use client";

import { useEffect, useState } from "react";

type CopyState = "idle" | "copied" | "error";

type CopyEmailProps = {
  email: string;
  label: string;
  copiedLabel?: string;
  className?: string;
};

function legacyCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.padding = "0";
  textarea.style.border = "0";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("Copy command failed");
  }
}

export default function CopyEmail({
  email,
  label,
  copiedLabel = "Copied to clipboard",
  className,
}: CopyEmailProps) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;

    const timeout = window.setTimeout(() => setState("idle"), 2400);
    return () => window.clearTimeout(timeout);
  }, [state]);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        legacyCopy(email);
      }
      setState("copied");
    } catch {
      try {
        legacyCopy(email);
        setState("copied");
      } catch {
        setState("error");
      }
    }
  };

  const text =
    state === "copied"
      ? copiedLabel
      : state === "error"
        ? "Copy failed — select the email"
        : label;

  return (
    <button
      type="button"
      className={className}
      onClick={copy}
      aria-live="polite"
      data-state={state}
    >
      <span>{text}</span>
      <span aria-hidden="true">{state === "copied" ? "✓" : "⧉"}</span>
    </button>
  );
}
