import React from "react";
import Image from "next/image";
// Framer motion
import { motion, MotionValue } from "framer-motion";
// Hooks
import useParallax from "@src/hooks/useParallax";
import useWindowSize from "@src/hooks/useWindowSize";

interface VideoMiniatureProps {
  placeholder: string;
  scrollYProgress: MotionValue;
}

const VideoMiniature = ({
  placeholder,
  scrollYProgress,
}: VideoMiniatureProps) => {
  let distance = -25;
  const { width } = useWindowSize();
  width! < 768 ? (distance = -25) : -75;
  const y = useParallax(scrollYProgress, distance);

  return (
    <div>
      <div className="overflow-hidden">
        <motion.div
          className="relative h-[184px] sm:h-[336px] scale-150"
          style={{ y, scale: 1.2 }}
        >
          <Image
            src={placeholder}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </motion.div>
      </div>
      <div className="grid grid-cols-12 px-1 pt-2 text-sm">
        <p className="col-span-4">08/09/2021</p>
        <p className="col-span-3">Client</p>
        <p className="col-span-5">Titre de l’oeuvre</p>
      </div>
    </div>
  );
};

export default VideoMiniature;
