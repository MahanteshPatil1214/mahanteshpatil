"use client";

import { useEffect, useState } from "react";

function formatIndiaTime() {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

export default function Clock({ className }: { className?: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => setTime(formatIndiaTime());
    update();

    const interval = window.setInterval(update, 15_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <time className={className} aria-label="Current time in India Standard Time">
      {time}
    </time>
  );
}
