import React from "react";
// Framer Motion
import { motion } from "framer-motion";

interface Props {
  string: string;
  delay?: number;
  ease?: number[] | string | undefined;
  duration?: number | undefined;
  stagger?: number | undefined;
  start?: boolean | undefined;
  fontWeight?: string | undefined;
}

const AnimatedLetters = ({
  string,
  delay = 0.4,
  ease = [0.6, 0.01, -0.05, 0.95],
  duration = 0.45,
  stagger = 0.05,
  start = true,
  fontWeight = "font-normal",
}: Props) => {
  const containerAnim = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const letterAnim = {
    hidden: { y: 400 },
    show: {
      y: 0,
      transition: {
        ease: ease,
        duration: duration,
      },
    },
  };

  const words = string.split(" ");

  return (
    <motion.span
      variants={containerAnim}
      initial="hidden"
      animate={start && "show"}
      key={string}
      className="overflow-hidden inline-block align-bottom"
    >
      {words.map((word) => (
        <span key={word}>
          {[...word].map((letter, idx) => (
            <motion.span
              key={`letter${idx}`}
              className={`${fontWeight} inline-block`}
              variants={letterAnim}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

export default AnimatedLetters;
