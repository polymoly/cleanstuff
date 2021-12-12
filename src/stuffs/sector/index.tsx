import { polarToCartesian } from "./helper";

interface SectorProps {
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
}

export const Sector = ({
  cx,
  cy,
  endAngle,
  radius,
  startAngle,
}: SectorProps) => {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const arcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    arcFlag,
    0,
    end.x,
    end.y,
    "L",
    cx,
    cy,
    "Z",
  ].join(" ");

  return (
    <svg viewBox="0 0 400 400" width="400" height="400">
      <path d={d} fill="orange" stroke="none" fill-rule="evenodd" />
    </svg>
  );
};
