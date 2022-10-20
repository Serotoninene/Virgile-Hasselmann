import { MotionValue, useTransform } from "framer-motion";

export default function useParallax(
  value: MotionValue<number>,
  distance: number,
  type?: string
) {
  let outputRange = [];
  if (type === "reverse") outputRange = [distance, 0];
  else if (type === "full") outputRange = [-distance, distance];
  else outputRange = [0, distance];

  return useTransform(value, [0, 1], outputRange);
}
