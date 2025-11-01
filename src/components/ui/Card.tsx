"use client";
import React from "react";
import clsx from "clsx";

type CardProps = {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
  className?: string;
};

export const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  hoverable = false,
  className,
}) => {
  return (
    <div
      className={clsx(
        "rounded-xl border border-gray-200 shadow-sm bg-white p-4 transition-all",
        hoverable && "hover:shadow-md hover:-translate-y-1",
        className
      )}
      data-testid="card"
    >
      {title && <h3 className="font-semibold text-lg mb-2">{title}</h3>}
      <div className="text-gray-700">{children}</div>
      {footer && (
        <div className="mt-4 border-t pt-2 text-sm text-gray-500">{footer}</div>
      )}
    </div>
  );
};
