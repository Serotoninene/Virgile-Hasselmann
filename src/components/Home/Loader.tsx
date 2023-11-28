import React, { useEffect, useRef, useState } from "react";
import AnimatedLetters from "../Utils/AnimatedLetters";
import { AnimatePresence, animate, motion } from "framer-motion";

type Props = {
  loadingProgress: number;
};

type CounterProps = {
  value: number;
};

function Counter({ value }: CounterProps) {
  // basicaly i want to animate the counter with the

  const nodeRef = useRef<HTMLParagraphElement>(null);

  return <motion.p ref={nodeRef}>{value} </motion.p>;
}

const Loader = ({ loadingProgress }: Props) => {
  const [from, setFrom] = useState(50);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrom(loadingProgress);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [loadingProgress]);

  return (
    <div className="h-[calc(var(--vh)*100)] flex justify-center items-center">
      <div className="w-[305px] sm:w-[420px] xl:[33vw]">
        <motion.div
          className="h-[1px] w-full bg-light origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: loadingProgress / 100 }}
          exit={{ scaleX: 0, x: "100%" }}
        />
        <div className="flex justify-between mt-3 overflow-hidden">
          <AnimatePresence>
            <AnimatedLetters string="Virgile Hasselmann" />
            <Counter value={loadingProgress} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Loader;
