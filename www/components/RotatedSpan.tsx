import React, { ReactNode } from "react";

interface Props {
  angle: number;
  children: ReactNode;
}

RotatedSpan.defaultProps = { angle: 0 };

/**
 * Wraps children in a rotated span given a 0-360 angle.
 */
export default function RotatedSpan({ angle, children }: Props) {
  return (
    <span data-testid={`rotated-span-${angle}`} style={style(angle)}>
      {children}
    </span>
  );
}

function style(angle: number) {
  const rotate = `rotate(${angle}deg)`;
  return {
    WebkitTransform: rotate,
    display: "inline-block",
    msTransform: rotate,
    transform: rotate,
  };
}
