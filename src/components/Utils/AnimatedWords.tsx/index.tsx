"use client";

import React from "react";
// Framer Motion
import { AnimatePresence, motion } from "framer-motion";
import { getAnimations } from "./anims";

interface Props {
  string?: string;
  delay?: number;
  ease?: number[] | string | undefined;
  duration?: number | undefined;
  stagger?: number | undefined;
  start?: boolean | undefined;
  fontWeight?: string | undefined;
  leading?: string | undefined;
  absolute?: boolean;
}

export const AnimatedWords = ({
  string,
  delay = 0.4,
  ease = [0.6, 0.01, 0.05, 0.95],
  duration = 0.45,
  stagger = 0.02,
  start = true,
  fontWeight = "font-normal",
  absolute,
}: Props) => {
  const words = string?.split(" ");

  const { containerAnim, letterAnim } = getAnimations(delay, duration, ease);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={string}
        id={string}
        variants={containerAnim}
        initial="hidden"
        animate={start ? "show" : "hidden"}
        exit="exit"
        className={`${absolute ? "absolute w-[100px]" : ""}
        overflow-hidden inline-block align-bottom`}
      >
        {words?.map((word) => (
          <>
            <span
              key={`${word}-${string}`}
              className="overflow-hidden inline-block"
            >
              <motion.span
                className={`${fontWeight} inline-block`}
                variants={letterAnim}
              >
                {word}
              </motion.span>
            </span>{" "}
          </>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};
