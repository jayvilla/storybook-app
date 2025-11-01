"use client";
import React from "react";
import clsx from "clsx";

type BadgeProps = {
  label: string;
  variant?: "info" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "info",
  size = "md",
  className,
}) => {
  const base =
    "inline-flex items-center font-medium rounded-full transition-all select-none";

  const variants: Record<string, string> = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  const sizes: Record<string, string> = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={clsx(base, variants[variant], sizes[size], className)}
      data-testid="badge"
    >
      {label}
    </span>
  );
};
