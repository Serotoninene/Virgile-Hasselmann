import React, { useEffect, useRef, useState } from "react";
import AnimatedLetters from "../Utils/AnimatedLetters";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  loadingProgress: number;
};

type CounterProps = {
  value: number;
};

function Counter({ value }: CounterProps) {
  // basicaly i want to animate the counter with the
  const nodeRef = useRef<HTMLParagraphElement>(null);

  return (
    <motion.p ref={nodeRef} exit={{ y: "-100%" }}>
      {value}{" "}
    </motion.p>
  );
}

const Loader = ({ loadingProgress }: Props) => {
  const [finishedLoading, setFinishedLoading] = useState(false);
  console.log("loader");

  useEffect(() => {
    if (loadingProgress === 100) {
      setTimeout(() => {
        setFinishedLoading(true);
      }, 500);
    }
  }, [loadingProgress]);

  return (
    <AnimatePresence>
      {finishedLoading ? (
        <div key="finishedLoading"> </div>
      ) : (
        <div
          key="loading"
          className="h-[calc(var(--vh)*100)] flex justify-center items-center"
        >
          <div className="w-[305px] sm:w-[420px] xl:[33vw]">
            <motion.div
              className="h-[1px] w-full bg-light origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: loadingProgress / 100 }}
              exit={{ scaleX: 0, x: "100%" }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
            <div className="flex justify-between mt-3 overflow-hidden">
              <AnimatedLetters
                string="Virgile Hasselmann"
                delay={0}
                stagger={0.01}
              />
              <Counter value={loadingProgress} />
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
