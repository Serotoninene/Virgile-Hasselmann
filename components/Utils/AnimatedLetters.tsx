import React from "react";
// Framer Motion
import { motion } from "framer-motion";

type Props = {
  string: string;
  delay: number;
  ease: number[] | string;
  duration: number;
  stagger: number;
  start: boolean;
};

const AnimatedLetters = ({
  string,
  delay = 0.4,
  ease = [0.6, 0.01, -0.05, 0.95],
  duration = 0.45,
  stagger = 0.05,
  start = true,
}: Props) => {
  const containerAnim = {
    hidden: { overflow: "hidden", display: "inline-block", lineHeight: "110%" },
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const letterAnim = {
    hidden: { y: 400, display: "inline-block" },
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
    >
      {words.map((word) => (
        <span key={word}>
          {[...word].map((letter, idx) => (
            <motion.span key={`letter${idx}`} variants={letterAnim}>
              {letter}
            </motion.span>
          ))}{" "}
        </span>
      ))}
    </motion.span>
  );
};

export default AnimatedLetters;
