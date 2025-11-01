"use client";
import React from "react";
import clsx from "clsx";

type Ratio = "1/2" | "1/3" | "2/3";
type Gutter = "none" | "sm" | "md" | "lg";
type Align = "start" | "center" | "stretch";
type StackAt = "sm" | "md"; // stack below this breakpoint

export type SplitPaneProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: Ratio;
  gutter?: Gutter;
  align?: Align;
  stackAt?: StackAt;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
};

const ratioClasses = (ratio: Ratio, stackAt: StackAt) => {
  // Applies only at/above the stackAt breakpoint
  const bp = stackAt === "sm" ? "sm" : "md";
  switch (ratio) {
    case "1/3":
      return {
        left: `${bp}:basis-1/3`,
        right: `${bp}:basis-2/3`,
      };
    case "2/3":
      return {
        left: `${bp}:basis-2/3`,
        right: `${bp}:basis-1/3`,
      };
    default: // "1/2"
      return {
        left: `${bp}:basis-1/2`,
        right: `${bp}:basis-1/2`,
      };
  }
};

const gutterClasses: Record<Gutter, string> = {
  none: "gap-0",
  sm: "gap-3",
  md: "gap-6",
  lg: "gap-8",
};

const alignClasses: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  stretch: "items-stretch",
};

export const SplitPane: React.FC<SplitPaneProps> = ({
  left,
  right,
  ratio = "1/2",
  gutter = "md",
  align = "stretch",
  stackAt = "md",
  className,
  leftClassName,
  rightClassName,
}) => {
  const bp = stackAt === "sm" ? "sm" : "md";
  const ratioCls = ratioClasses(ratio, stackAt);

  return (
    <section
      className={clsx(
        "flex flex-col",
        `${bp}:flex-row`,
        gutterClasses[gutter],
        alignClasses[align],
        className
      )}
      data-testid="splitpane"
      aria-label="splitpane"
    >
      <div
        className={clsx("flex-1", ratioCls.left, leftClassName)}
        data-testid="splitpane-left"
      >
        {left}
      </div>
      <div
        className={clsx("flex-1", ratioCls.right, rightClassName)}
        data-testid="splitpane-right"
      >
        {right}
      </div>
    </section>
  );
};
