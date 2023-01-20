import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedArrow() {
  return (
    <div className="w-2 hidden lg:block">
      <svg
        className="w-full"
        width="33"
        height="24"
        viewBox="0 0 9 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{
            delay: 1.5,
            duration: 1,
            ease: [0.73, 0.15, 0.31, 0.94],
          }}
          stroke="#DDD5CB"
          strokeLinecap="round"
          d="M4.94843 0.480225H3.94842L3.94842 30.5265L1.62113 28.1992C1.42587 28.004 1.10929 28.004 0.914025 28.1992C0.718762 28.3945 0.718762 28.7111 0.914025 28.9064C0.914248 28.9066 0.913803 28.9061 0.914025 28.9064L4.04206 32.0344C4.07387 32.0787 4.11275 32.1175 4.15703 32.1494C4.20152 32.1813 4.25148 32.2062 4.30522 32.2222C4.47883 32.2794 4.67758 32.2389 4.81565 32.1009L8.01017 28.9064C8.20543 28.7111 8.20543 28.3945 8.01017 28.1992C7.81491 28.004 7.49832 28.004 7.30306 28.1992L4.94843 30.5539L4.94843 0.480225Z"
        />
      </svg>
    </div>
  );
}
