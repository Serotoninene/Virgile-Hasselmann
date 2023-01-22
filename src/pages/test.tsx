import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import AnimatedLetters from "@src/components/Utils/AnimatedLetters";
import useDebounce from "@src/hooks/useDebounce";

type Props = {};

const Block = () => {
  let count = 0;
  const [displayCount, setDisplayCount] = useState(0);
  const countRef = useRef(count); // ref to store the latest count

  useEffect(() => {
    const intervalId = setInterval(() => {
      countRef.current += 1;
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayCount(countRef.current);
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [countRef]);

  return (
    <div className="h-screen mb-16 Block snap-child-start">
      <div className="w-16 h-16 bg-red-900"></div>
      {displayCount}
      <br /> {countRef.current}
      {/* <AnimatePresence>
        <AnimatedLetters
          key={slowedCounter}
          string={slowedCounter.toString()}
          absolute
          delay={0.2}
        />
      </AnimatePresence> */}
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
