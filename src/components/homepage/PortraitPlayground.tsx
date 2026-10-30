import React, { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import {
  EXPRESSIONS,
  PORTRAIT_TOOLS,
  getPortraitReaction,
  type ExpressionId,
  type PortraitToolId,
} from "../../data/portrait-reactions";
import { PortraitTool } from "./PortraitTool";
import styles from "./PortraitPlayground.module.scss";

interface Scene {
  count: number;
  tool: PortraitToolId;
  expression: ExpressionId;
  direction: "left" | "right";
  uses: Record<PortraitToolId, number>;
  redness: number;
  bleeding: boolean;
  active: boolean;
}

const INITIAL_SCENE: Scene = {
  count: 0,
  tool: "slap",
  expression: "affection",
  direction: "right",
  uses: { slap: 0, pinch: 0, punch: 0, tickle: 0, flower: 0, spider: 0 },
  redness: 0,
  bleeding: false,
  active: false,
};

export function PortraitPlayground(): JSX.Element {
  const [scene, setScene] = useState<Scene>(INITIAL_SCENE);
  const photo = useRef<HTMLButtonElement>(null);
  const frame = useRef<number | null>(null);
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const id = `portrait-${useId().replace(/:/g, "")}`;
  const imageBase = useBaseUrl("/img/expressions/");
  const expression = EXPRESSIONS.find((item) => item.id === scene.expression);
  const tool = PORTRAIT_TOOLS.find((item) => item.id === scene.tool);
  if (!expression || !tool)
    throw new Error("Invalid portrait scene selection.");

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const resetPointer = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    photo.current?.style.removeProperty("--hand-x");
    photo.current?.style.removeProperty("--hand-y");
    gesture.current = null;
    suppressClick.current = false;
  };

  const react = (direction?: "left" | "right") => {
    setScene((current) => {
      const uses = current.uses[current.tool] + 1;
      return {
        ...current,
        ...getPortraitReaction(current.tool, uses),
        count: current.count + 1,
        direction: direction ?? (current.count % 2 === 0 ? "left" : "right"),
        uses: { ...current.uses, [current.tool]: uses },
        active: true,
      };
    });
  };

  const moveTool = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!event.isPrimary) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      10,
      Math.min(90, ((event.clientX - bounds.left) / bounds.width) * 100),
    );
    const y = Math.max(
      15,
      Math.min(85, ((event.clientY - bounds.top) / bounds.height) * 100),
    );
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      photo.current?.style.setProperty("--hand-x", `${x}%`);
      photo.current?.style.setProperty("--hand-y", `${y}%`);
    });
  };

  return (
    <div
      className={styles.portrait}
      data-portrait-playground
      data-tool={scene.tool}
      data-expression={scene.expression}
      data-interactions={scene.count}
      data-direction={scene.direction}
    >
      <h2 className={styles.title}>Nine moods, one developer</h2>
      <button
        ref={photo}
        type="button"
        className={styles.photo}
        aria-label={tool.action}
        aria-describedby={`${id}-expression`}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          suppressClick.current = false;
          gesture.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
          };
          moveTool(event);
        }}
        onPointerMove={moveTool}
        onPointerUp={(event) => {
          const start = gesture.current;
          gesture.current = null;
          if (!start || start.id !== event.pointerId) return;
          const dx = event.clientX - start.x,
            dy = event.clientY - start.y;
          if (Math.abs(dx) >= 24 && Math.abs(dx) > Math.abs(dy) * 1.25) {
            suppressClick.current = true;
            react(dx > 0 ? "right" : "left");
          } else if (Math.abs(dy) >= 24) suppressClick.current = true;
        }}
        onPointerCancel={() => {
          resetPointer();
          suppressClick.current = true;
        }}
        onPointerLeave={() => {
          const suppressed = suppressClick.current;
          resetPointer();
          suppressClick.current = suppressed;
        }}
        onBlur={resetPointer}
        onClick={(event) => {
          if (event.detail > 0 && suppressClick.current) {
            suppressClick.current = false;
            return;
          }
          react();
        }}
      >
        <span
          key={scene.count}
          className={clsx(styles.scene, scene.active && styles.hit)}
        >
          <span className={styles.face}>
            {EXPRESSIONS.map((item) => (
              <img
                key={item.id}
                src={`${imageBase}${item.id}.webp`}
                alt={
                  item.id === scene.expression
                    ? `Sajeetharan Sinnathurai expressing ${item.label.toLowerCase()}`
                    : ""
                }
                aria-hidden={item.id !== scene.expression}
                className={styles.expressionImage}
                width="480"
                height="320"
                draggable={false}
              />
            ))}
            <svg
              className={styles.skinEffects}
              viewBox="0 0 480 320"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <radialGradient id={`${id}-blush`}>
                  <stop stopColor="#ce3434" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#ce3434" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g opacity={scene.redness} data-cheek-redness>
                <ellipse
                  cx={expression.cheeks[0]}
                  cy={expression.cheeks[1]}
                  rx="31"
                  ry="21"
                  fill={`url(#${id}-blush)`}
                />
                <ellipse
                  cx={expression.cheeks[2]}
                  cy={expression.cheeks[3]}
                  rx="31"
                  ry="21"
                  fill={`url(#${id}-blush)`}
                />
              </g>
              {scene.bleeding && (
                <g
                  transform={`translate(${expression.nose[0]} ${expression.nose[1]})`}
                  data-nosebleed
                >
                  <path
                    d="M4 0q-2 6 0 12q2 5 0 9"
                    fill="none"
                    stroke="#92272b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <ellipse cx="4" cy="21" rx="2" ry="3" fill="#92272b" />
                </g>
              )}
            </svg>
          </span>
          <span className={styles.handPosition} aria-hidden="true">
            <PortraitTool tool={scene.tool} className={styles.hand} />
          </span>
        </span>
        <span className={styles.expressionBadge} aria-hidden="true">
          {expression.rasa} / {expression.label}
        </span>
      </button>
      <div className={styles.feedback}>
        <div
          className={styles.toolChoices}
          role="group"
          aria-label="Choose a portrait prop"
        >
          {PORTRAIT_TOOLS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={scene.tool === item.id}
              onClick={() => {
                resetPointer();
                setScene((current) => ({
                  ...current,
                  tool: item.id,
                  active: false,
                }));
              }}
            >
              <PortraitTool tool={item.id} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <p
        id={`${id}-expression`}
        className={styles.srOnly}
        role="status"
        aria-atomic="true"
      >
        {expression.label}
      </p>
    </div>
  );
}
