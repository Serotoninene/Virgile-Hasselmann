import React, { useEffect, useRef, useState } from "react";
import AnimatedLetters from "../Utils/AnimatedLetters";
import { AnimatePresence, animate, motion } from "framer-motion";

type Props = {
  loadingProgress: number;
};

type CounterProps = {
  from: number;
  to: number;
};

function Counter({ from, to }: CounterProps) {
  const nodeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = value.toFixed(0);
        }
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <p ref={nodeRef} />;
}

const Loader = ({ loadingProgress }: Props) => {
  const [from, setFrom] = useState(0);

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
          className="h-[1px] w-full bg-light"
          style={{
            scaleX: loadingProgress / 100,
          }}
        />
        <div className="flex justify-between mt-3 overflow-hidden">
          <AnimatePresence>
            <AnimatedLetters string="Virgile Hasselmann" />
            <Counter from={from} to={loadingProgress} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Loader;
