import React from "react";
import Image from "next/image";
// Framer motion
import { AnimatePresence, motion } from "framer-motion";
// Components
import useWindowSize from "@src/hooks/useWindowSize";

interface Props {
  isOverview: boolean;
  wheelDirection: string;
  photoDisplayed: string;
}

const transition = { duration: 0.1, ease: [0.3, 0.01, -0.05, 0.95] };

const anim = {
  fromDown: { y: "100%", transition: transition },
  fromUp: { y: "-100%", transition: transition },
  center: (custom: boolean) => ({
    y: 0,
    width: custom ? "60%" : "100%",
    transition: { ease: [0.3, 0.01, -0.05, 0.95], duration: 0.1 },
  }),
};

const AnimatedPhoto = ({
  isOverview,
  wheelDirection,
  photoDisplayed,
}: Props) => {
  const photoLink = "https://virgile-portfollio.s3.amazonaws.com/photos/";
  const { width } = useWindowSize(); // getting the width of the page for the Image Component

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={photoDisplayed}
        variants={anim}
        initial={wheelDirection === "down" ? "fromDown" : "fromUp"}
        animate="center"
        exit={wheelDirection === "up" ? "fromDown" : "fromUp"}
        custom={isOverview}
        className="w-full min-h-[70vh] sm:w-full sm:h-full"
      >
        <Image
          src={photoLink + photoDisplayed}
          layout="fill"
          objectFit={width! < 640 ? "cover" : "contain"}
          objectPosition="top left"
          placeholder="blur"
          blurDataURL={photoLink + photoDisplayed}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPhoto;
