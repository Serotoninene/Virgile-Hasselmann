import React from "react";
import Image from "next/image";
// Framer motion
import { AnimatePresence, motion } from "framer-motion";
// Components
import useWindowSize from "@src/hooks/useWindowSize";

interface Props {
  photoDisplayed: string;
}

const AnimatedPhoto = ({ photoDisplayed }: Props) => {
  const photoLink = "https://virgile-portfollio.s3.amazonaws.com/photos/";
  const { width } = useWindowSize(); // getting the width of the page for the Image Component

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={photoDisplayed}
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full min-h-[70vh] sm:w-full sm:h-full"
      >
        <Image
          src={photoLink + photoDisplayed}
          layout="fill"
          objectFit={width! < 640 ? "cover" : "contain"}
          objectPosition="left"
          placeholder="blur"
          blurDataURL={photoLink + photoDisplayed}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPhoto;
