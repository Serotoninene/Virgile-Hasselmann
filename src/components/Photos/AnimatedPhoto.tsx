import React, { useEffect } from "react";
import Image from "next/image";
// Framer motion
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
// Components
import useWindowSize from "@src/hooks/useWindowSize";

interface Props {
  isOverview: boolean;
  photoDisplayed: string;
}

const transition = { duration: 0.15, ease: [0.3, 0.01, -0.05, 0.95] };

const anim = {
  toDown: { y: "100%", transition: transition },
  fromUp: { y: "-100%", transition: transition },
  center: (custom: boolean) => ({
    y: 0,
    width: custom ? "60%" : "100%",
    transition: { duration: 0.15, ease: "easeOut" },
  }),
};

const AnimatedPhoto = ({ isOverview, photoDisplayed }: Props) => {
  const photoLink = process.env.NEXT_PUBLIC_CLOUDFRONT + "photos/";
  // const photoLink = "https://d2nuyhqai1xu20.cloudfront.net/photos/";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={photoDisplayed}
        variants={anim}
        initial={"fromUp"}
        animate="center"
        exit={"toDown"}
        custom={isOverview}
        className="w-full min-h-[70vh] sm:w-full sm:h-full"
      >
        <Image
          src={photoLink + photoDisplayed}
          alt="photo"
          layout="fill"
          objectFit={"contain"}
          objectPosition="top left"
          placeholder="blur"
          blurDataURL={photoLink + photoDisplayed}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPhoto;
