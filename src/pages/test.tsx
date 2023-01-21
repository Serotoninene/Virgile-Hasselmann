import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import AnimatedLetters from "@src/components/Utils/AnimatedLetters";

type Props = {};

const Block = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="h-screen mb-16 Block snap-child-start">
      <div className="w-16 h-16 bg-red-900"></div>
      <AnimatePresence>
        <AnimatedLetters key={counter} string={counter.toString()} absolute />
      </AnimatePresence>
    </div>
  );
};

export default function Test({}: Props) {
  const blocksRef = useRef() as RefObject<HTMLDivElement>;
  const [blocks, setBlocks] = useState(["", "", "", ""]);

  return (
    <div id="Test" className="p-16  ">
      <motion.div
        ref={blocksRef}
        className="blockContainer snap-parent-mandatory"
      >
        {blocks.map((block, blockIdx) => (
          <Block key={blockIdx} />
        ))}
      </motion.div>
    </div>
  );
}
