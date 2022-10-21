import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";

export default function CustomCursor() {
  const { cursorType } = useContext(CursorContext);
  const [mousePosition, setMousePosition] = useState({
    x: 200,
    y: 200,
  });

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
      transition={{ type: "spring", damping: 100, mass: 0.25, stiffness: 1000 }}
    ></motion.div>
  );
}
