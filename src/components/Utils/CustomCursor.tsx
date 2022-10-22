import { useEffect, useState, useContext } from "react";
import { motion, useMotionValue } from "framer-motion";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
import AnimatedLetters from "./AnimatedLetters";

interface Props {
  width?: number;
}

export default function CustomCursor({ width }: Props) {
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
      id="CustomCursor"
      animate={{
        top: mousePosition.y,
        left: mousePosition.x,
      }}
      style={{
        width: cursorSize,
        height: cursorSize,
        mixBlendMode: hover ? "difference" : "normal",
      }}
      transition={{
        type: "spring",
        damping: 100,
        mass: 0.25,
        stiffness: 1000,
      }}
    >
      {cursorType === "scrollIndicator" && (
        <p className="text-dark text-sm">
          <AnimatedLetters string="scroll" />
        </p>
      )}
    </motion.div>
  );
}
