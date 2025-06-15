"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_COLOR = "#FFC700";
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const range = (start: number, end?: number, step = 1) => {
  let output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
};

const useRandomInterval = <T extends () => unknown>(
  callback: T,
  minDelay: number,
  maxDelay: number
) => {
  const timeoutId = useRef<number>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let isEnabled =
      typeof minDelay === "number" && typeof maxDelay === "number";

    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);

        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };

      handleTick();
    }

    return () => window.clearTimeout(timeoutId.current as never);
  }, [minDelay, maxDelay]);

  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current as never);
  }, []);

  return cancel;
};

const generateSparkle = (color: string) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(0, 100) + "%",
      left: random(0, 100) + "%",
    },
  };

  return sparkle;
};

const Sparkles = ({
  color = DEFAULT_COLOR,
  children,
  ...delegated
}: React.ComponentProps<"span">) => {
  const [sparkles, setSparkles] = useState(() => {
    return range(3).map(() => generateSparkle(color));
  });

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);

      const now = Date.now();

      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });

      nextSparkles.push(sparkle);

      setSparkles(nextSparkles);
    },
    50,
    450
  );

  return (
    <span className="inline-block relative" {...delegated}>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <strong className="relative z-1 font-bold">{children}</strong>
    </span>
  );
};

const Sparkle = ({
  size,
  color,
  style,
}: {
  size: number;
  color: string;
  style: CSSProperties;
}) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

  return (
    <span className="absolute block animate-come-in-out" style={style}>
      <svg
        className="animate-spin [animation-duration:5000ms] block size-5"
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
      >
        <path d={path} fill={color} />
      </svg>
    </span>
  );
};

export default Sparkles;
