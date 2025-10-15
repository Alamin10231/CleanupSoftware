"use client";

import React from "react";

type Slice = { name: string; value: number; color: string };

function toConicGradient(slices: Slice[]) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  let acc = 0;
  const parts = slices.map((s) => {
    const start = (acc / total) * 360;
    acc += s.value;
    const end = (acc / total) * 360;
    return `${s.color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${parts.join(", ")})`;
}

function percent(n: number, total: number) {
  return total ? Math.round((n / total) * 100) : 0;
}

const analyticsData: Slice[] = [
  { name: "Paid", value: 100, color: "#009608" },
  { name: "Pending", value: 200, color: "#FF9800" },
  { name: "Stopped", value: 100, color: "#D32F2F" },
  { name: "Paused", value: 100, color: "#0288D1" },
];

export default function Analytics() {
  const total = analyticsData.reduce((s, x) => s + x.value, 0);
  const bg = toConicGradient(analyticsData);

  return (
    <div className="w-full rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold">Analytics Report</h2>

      <div className="flex flex-col items-center gap-4">
        {/* Donut Chart */}
        <div className="flex items-center justify-center">
          <div
            className="relative aspect-square w-[220px] rounded-full"
            style={{ background: bg }}
            role="img"
            aria-label="Analytics distribution donut chart"
          >
            <div className="absolute inset-6 rounded-full bg-white shadow-inner" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-semibold">{total}%</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <ul className="flex flex-wrap justify-center gap-3 text-sm">
          {analyticsData.map((s) => (
            <li
              key={s.name}
              className="flex items-center gap-2 rounded-lg border px-3 py-1 transition hover:bg-muted/30"
              title={`${s.name}: ${percent(s.value, total)}%`}
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="font-medium">{s.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-muted-foreground text-center">
        Hover on labels to view percentage.
      </p>
    </div>
  );
}
