import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { motion, useScroll } from "framer-motion";

type Props = {};

const Block = () => {
  return (
    <div className="h-screen mb-16 Block snap-child-start">
      <div className="w-16 h-16 bg-red-900"></div>
    </div>
  );
};

export default function Test({}: Props) {
  const blocksRef = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll();
  const [blocks, setBlocks] = useState(["", "", "", ""]);

  scrollYProgress.onChange((e) => console.log(e));

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
