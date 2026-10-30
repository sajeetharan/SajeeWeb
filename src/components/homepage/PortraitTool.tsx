import React, { useId } from "react";
import type { PortraitToolId } from "../../data/portrait-reactions";

export function PortraitTool({
  tool,
  className,
}: {
  tool: PortraitToolId;
  className?: string;
}): JSX.Element {
  const id = `tool-${useId().replace(/:/g, "")}`;
  return (
    <svg
      className={className}
      viewBox="0 0 120 150"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-skin`} x1="0" x2="1" y1="0" y2="0.5">
          <stop stopColor="#f1c29c" />
          <stop offset="0.45" stopColor="#d99d72" />
          <stop offset="1" stopColor="#a96945" />
        </linearGradient>
        <radialGradient id={`${id}-glove`} cx="0.35" cy="0.25" r="0.8">
          <stop stopColor="#ef6666" />
          <stop offset="0.55" stopColor="#b91c1c" />
          <stop offset="1" stopColor="#641414" />
        </radialGradient>
      </defs>
      {tool === "slap" && (
        <g
          fill={`url(#${id}-skin)`}
          stroke="#8c583d"
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          <path d="M42 145 41 116Q31 108 25 96L9 71Q4 61 11 57Q18 53 24 61L36 77 30 29Q29 18 37 17Q45 16 47 27L52 64 49 14Q49 5 57 5Q66 5 66 15L69 61 72 18Q73 9 81 10Q90 11 89 21L86 66 94 35Q96 27 103 29Q111 31 109 40L102 88Q101 105 89 116L86 145Z" />
          <path
            d="M41 83q20-13 37 0M48 101q13-8 29-1M52 65l2 12m15-15 1 13m16-9-2 13"
            fill="none"
          />
        </g>
      )}
      {tool === "pinch" && (
        <g fill={`url(#${id}-skin)`} stroke="#8c583d" strokeWidth="1.5">
          <path d="M49 148 45 112Q19 91 19 67L25 29Q27 17 36 20Q43 23 40 33L36 65 54 80 66 69 47 40Q41 29 50 25Q58 22 64 32L87 64Q98 78 94 104L87 148Z" />
          <path d="M55 83q12-9 22-4M67 100q10-2 17 3M43 69l10 9" fill="none" />
        </g>
      )}
      {tool === "punch" && (
        <g stroke="#6b1515" strokeWidth="2">
          <path
            d="M29 115Q13 105 13 78L15 38Q17 15 38 14H79Q101 14 104 37L108 76Q110 103 92 116Z"
            fill={`url(#${id}-glove)`}
          />
          <path d="M24 113h70v30H24Z" fill="#222c3a" stroke="#111827" />
          <path
            d="M27 29q28-14 57 0M28 42q22-10 45-3"
            fill="none"
            stroke="#fca5a5"
            strokeOpacity="0.55"
            strokeWidth="4"
          />
          <path d="M85 65q-28-12-36 8q-8 20 24 23" fill="none" />
          <path d="M39 128h40" stroke="#cbd5e1" strokeWidth="3" />
        </g>
      )}
      {tool === "tickle" && (
        <g stroke="#5b21b6" strokeWidth="2">
          <path
            d="M23 124Q5 86 31 43Q57 3 98 7Q114 49 75 84Q48 107 23 124Z"
            fill="#c4b5fd"
          />
          <path
            d="M15 145 88 20M29 117l-4-28m16 8-1-32m13 14 2-31m13 15 4-28m-41 78 32-9M43 94l34-14M57 71l35-17M72 46l26-16"
            fill="none"
          />
        </g>
      )}
      {tool === "flower" && (
        <g stroke="#166534" strokeWidth="2">
          <path d="M59 145 63 58" fill="none" strokeWidth="5" />
          <path
            d="M60 113Q24 118 26 88Q51 88 61 107M62 93Q95 98 99 72Q76 70 62 89"
            fill="#4ade80"
          />
          <g fill="#f9a8d4" stroke="#be185d">
            <ellipse cx="62" cy="25" rx="14" ry="22" />
            <ellipse cx="62" cy="67" rx="14" ry="22" />
            <ellipse cx="41" cy="46" rx="22" ry="14" />
            <ellipse cx="83" cy="46" rx="22" ry="14" />
          </g>
          <circle cx="62" cy="46" r="13" fill="#facc15" stroke="#a16207" />
        </g>
      )}
      {tool === "spider" && (
        <g stroke="#1f2937" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M60 0v42" strokeWidth="1" stroke="#94a3b8" />
          <path d="m47 70-23-21-9 5m31 25L16 69 7 80m40 8L17 94l-6 15m38-13-19 22 1 15m42-63 23-21 9 5M74 79l30-10 9 11M73 88l30 6 6 15m-38-13 19 22-1 15" />
          <ellipse cx="60" cy="67" rx="18" ry="23" fill="#374151" />
          <ellipse cx="60" cy="91" rx="14" ry="17" fill="#1f2937" />
          <circle cx="55" cy="95" r="2" fill="#f8fafc" stroke="none" />
          <circle cx="65" cy="95" r="2" fill="#f8fafc" stroke="none" />
        </g>
      )}
    </svg>
  );
}
