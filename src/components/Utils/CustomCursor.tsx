import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
import AnimatedLetters from "./AnimatedLetters";

export default function CustomCursor() {
  const { cursorType } = useContext(CursorContext);
  const [mousePosition, setMousePosition] = useState({
    x: 200,
    y: 200,
  });

  // different types
  let scrollIndicator = cursorType === "scrollIndicator";
  let hover = cursorType === "hover";

  const onMouseMove = (event: MouseEvent) => {
    const { clientX: x, clientY: y } = event;
    setMousePosition({
      x,
      y,
    });
  };

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
        width: scrollIndicator || hover ? "56px" : "16px",
        height: scrollIndicator || hover ? "56px" : "16px",
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
