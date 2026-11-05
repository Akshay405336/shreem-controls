"use client";

import {
  Bell,
  Camera,
  Shield,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/cn";

const alerts = [
  { label: "Front door", time: "2m ago", type: "Closed" },
  { label: "Living motion", time: "18m ago", type: "Clear" },
] as const;

export function HomeSecurityMobileVisual() {
  return (
    <div className="relative mx-auto w-[min(100%,280px)] shrink-0 sm:w-[300px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 left-1/2 h-12 w-full -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(0,158,152,0.14)_0%,transparent_72%)]"
      />
      <div className="relative rounded-[2rem] border border-[#2a3333] bg-[linear-gradient(145deg,#1a2222_0%,#0d1212_100%)] p-[6px] shadow-[0_16px_40px_rgba(8,127,123,0.14),0_6px_16px_rgba(0,0,0,0.22)]">
        <div className="absolute left-1/2 top-[8px] h-[3px] w-14 -translate-x-1/2 rounded-full bg-black/85" />
        <div className="overflow-hidden rounded-[1.65rem] bg-[#0a0f0f] px-4 pb-5 pt-9">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#5c8f8c]">
                Security
              </p>
              <p className="mt-0.5 font-display text-lg font-medium leading-none tracking-tight text-white">
                My property
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#009E98]/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#73BDB8]">
              <ShieldCheck className="size-3" strokeWidth={2} />
              Armed
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <StatusTile label="System" value="Online" icon={Shield} active />
            <StatusTile label="Cameras" value="2 live" icon={Camera} active />
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
              <p className="text-[10px] font-medium text-white/90">Camera preview</p>
              <span className="text-[9px] text-[#73BDB8]">Entry</span>
            </div>
            <div className="relative aspect-[16/10] bg-[linear-gradient(135deg,#1a2424_0%,#0f1515_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,158,152,0.12),transparent_55%)]" />
              <Camera
                className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-white/25"
                strokeWidth={1.25}
              />
            </div>
          </div>

          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-[#5c8f8c]">
            Recent alerts
          </p>
          <ul className="mt-2 space-y-2">
            {alerts.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-md bg-[#087F7B]/22 text-[#73BDB8]">
                    <Bell size={13} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium text-white/92">{item.label}</p>
                    <p className="text-[9px] text-white/45">{item.time}</p>
                  </div>
                </div>
                <span className="text-[9px] text-white/55">{item.type}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-lg bg-[#009E98] py-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-white"
            >
              Disarm
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg border border-white/12 bg-white/[0.04] py-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/80"
            >
              Sensors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusTile({
  label,
  value,
  icon: Icon,
  active,
}: {
  label: string;
  value: string;
  icon: typeof Shield;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-2.5 py-2",
        active
          ? "border-[#009E98]/25 bg-[#009E98]/10"
          : "border-white/[0.06] bg-white/[0.04]",
      )}
    >
      <Icon className="size-3.5 text-[#73BDB8]" strokeWidth={1.75} />
      <p className="mt-1 text-[10px] font-medium text-white/90">{label}</p>
      <p className="text-[9px] text-white/50">{value}</p>
    </div>
  );
}
