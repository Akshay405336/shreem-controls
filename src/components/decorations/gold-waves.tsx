type WaveProps = {
  className?: string;
  /** Brighter strokes for dark teal sections */
  tone?: "default" | "light";
};

const TEAL = "#009E98";
const TEAL_MUTED = "#73BDB8";
const TEAL_LINE = "#C5E5E2";

export function AmbientGoldWaves({ className }: WaveProps) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full ${className ?? ""}`}
      viewBox="0 0 1440 820"
      preserveAspectRatio="none"
      fill="none"
    >
      {([0, 2.5, 5] as const).map((offset, index) => (
        <g key={`ambient-primary-${offset}`} transform={`translate(0 ${offset})`}>
          <path
            d="M-100 570 C180 730 330 490 570 560 S1000 620 1180 340 S1390 70 1540 0"
            stroke={index === 0 ? TEAL : TEAL_LINE}
            strokeWidth={index === 0 ? "1.2" : "0.75"}
            opacity={index === 0 ? 0.28 : 0.2 - index * 0.04}
          />
        </g>
      ))}
      {Array.from({ length: 7 }).map((_, index) => (
        <path
          key={index}
          d={`M-100 ${585 + index * 12} C180 ${745 + index * 10} 330 ${505 + index * 12} 570 ${575 + index * 12} S1000 ${635 + index * 12} 1180 ${355 + index * 12} S1390 ${85 + index * 12} 1540 ${15 + index * 12}`}
          stroke={TEAL_LINE}
          strokeWidth=".7"
          opacity=".14"
        />
      ))}
      <path
        d="M-80 850 C200 690 350 810 610 770 S1050 850 1260 730 S1450 690 1530 740"
        stroke={TEAL_MUTED}
        strokeWidth="1.2"
        opacity=".18"
      />
      {Array.from({ length: 7 }).map((_, index) => (
        <path
          key={`bottom-${index}`}
          d={`M-80 ${862 + index * 9} C200 ${702 + index * 9} 350 ${822 + index * 9} 610 ${782 + index * 9} S1050 ${862 + index * 9} 1260 ${742 + index * 9} S1450 ${702 + index * 9} 1530 ${752 + index * 9}`}
          stroke={TEAL_LINE}
          strokeWidth=".7"
          opacity=".12"
        />
      ))}
    </svg>
  );
}

export function SectionBottomWaves({ className }: WaveProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 150"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none absolute bottom-0 left-0 h-[85px] w-full ${className ?? ""}`}
    >
      <path
        d="M-50 120 C180 -10 310 35 520 90 S850 150 1080 55 S1350 5 1490 45"
        stroke={TEAL}
        strokeWidth="1.2"
        opacity=".25"
      />
      {Array.from({ length: 8 }).map((_, index) => (
        <path
          key={index}
          d={`M-50 ${130 + index * 4} C180 ${index * 4} 310 ${45 + index * 4} 520 ${100 + index * 4} S850 ${160 + index * 4} 1080 ${65 + index * 4} S1350 ${15 + index * 4} 1490 ${55 + index * 4}`}
          stroke={TEAL_LINE}
          strokeWidth="0.8"
          opacity="0.2"
        />
      ))}
    </svg>
  );
}

export function DarkSectionWaves({ className, tone = "default" }: WaveProps) {
  const isLight = tone === "light";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 260"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-[110px] w-full ${className ?? ""}`}
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <path
          key={index}
          d={`M-80 ${125 + index * 10} C180 ${-10 + index * 9} 330 ${20 + index * 10} 550 ${125 + index * 9} S900 ${260 + index * 8} 1120 ${125 + index * 9} S1370 ${-15 + index * 9} 1520 ${35 + index * 10}`}
          stroke={
            isLight
              ? index === 5
                ? "#FFFFFF"
                : "#E8F7F5"
              : index === 5
                ? TEAL
                : TEAL_MUTED
          }
          strokeWidth={index === 5 ? "1.2" : "0.8"}
          opacity={isLight ? (index === 5 ? "0.62" : "0.32") : index === 5 ? "0.28" : "0.14"}
        />
      ))}
    </svg>
  );
}

export function CreamSectionRings() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 top-0 h-[350px] w-[350px] rounded-full border border-[#009E98]/8" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[350px] w-[350px] rounded-full border border-[#73BDB8]/10" />
    </>
  );
}
