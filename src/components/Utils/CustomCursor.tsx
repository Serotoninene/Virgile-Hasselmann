import { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
import AnimatedLetters from "./AnimatedLetters";

interface Props {
  actionIndicator?: string;
}

export default function CustomCursor({ actionIndicator }: Props) {
  const { cursorType } = useContext(CursorContext);
  const [mousePosition, setMousePosition] = useState({
    x: 200,
    y: 200,
  });
  const cursorSize = useMotionValue(56);

  const onMouseMove = (event: MouseEvent) => {
    const { clientX: x, clientY: y } = event;
    setMousePosition({
      x,
      y,
    });
  };

  // different types
  let scrollIndicator = cursorType === "scrollIndicator";
  let hover = cursorType === "hover";

  useEffect(() => {
    scrollIndicator || hover ? cursorSize.set(56) : cursorSize.set(8);
  }, [cursorType]);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <motion.div
      id="CustomCursor" // had to use css for styling here --> base.scss
      animate={{
        top: mousePosition.y,
        left: mousePosition.x,
      }}
      style={{
        mixBlendMode: hover ? "difference" : "normal",
      }}
      transition={{
        type: "spring",
        damping: 100,
        mass: 0.25,
        stiffness: 1000,
      }}
    >
      <p className="text-light text-sm text-end ">
        <AnimatePresence mode="wait">
          <AnimatedLetters
            string={actionIndicator}
            key={actionIndicator}
            delay={0}
            duration={0.05}
            stagger={0.005}
          />
        </AnimatePresence>
      </p>
    </motion.div>
  );
}
