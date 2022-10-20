import { MotionValue, useTransform } from "framer-motion";

export default function useParallax(
  value: MotionValue<number>,
  distance: number,
  type?: string
) {
  if (type === "reverse") return useTransform(value, [0, 1], [distance, 0]);
  if (type === "full")
    return useTransform(value, [0, 1], [-distance, distance]);

  return useTransform(value, [0, 1], [0, distance]);
}
