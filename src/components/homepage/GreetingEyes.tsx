import React, { useEffect, useRef } from "react";

export function GreetingEyes({
  className,
}: {
  className: string;
}): JSX.Element {
  const eyes = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const element = eyes.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    let x = 0;
    let y = 0;

    const reset = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      element.style.removeProperty("--eye-x");
      element.style.removeProperty("--eye-y");
    };
    const look = () => {
      frame = null;
      const bounds = element.getBoundingClientRect();
      const dx = x - (bounds.left + bounds.width / 2);
      const dy = y - (bounds.top + bounds.height / 2);
      const distance = Math.max(80, Math.hypot(dx, dy));
      element.style.setProperty("--eye-x", `${(dx / distance) * 4}px`);
      element.style.setProperty("--eye-y", `${(dy / distance) * 3}px`);
    };
    const follow = (event: PointerEvent) => {
      if (motion.matches || event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (frame === null) frame = requestAnimationFrame(look);
    };

    window.addEventListener("pointermove", follow, { passive: true });
    document.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset);
    return () => {
      window.removeEventListener("pointermove", follow);
      document.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", reset);
      reset();
    };
  }, []);

  return (
    <svg
      ref={eyes}
      className={className}
      data-greeting-eyes
      viewBox="0 0 82 54"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M12 8Q19 2 28 5M48 4Q57 0 66 6" />
      <g data-eye-blink>
        <ellipse cx="24" cy="30" rx="13" ry="18" />
        <ellipse cx="58" cy="28" rx="13" ry="18" />
        <g data-eye-pupils fill="currentColor" stroke="none">
          <circle cx="25" cy="30" r="3.5" />
          <circle cx="59" cy="28" r="3.5" />
        </g>
      </g>
    </svg>
  );
}
