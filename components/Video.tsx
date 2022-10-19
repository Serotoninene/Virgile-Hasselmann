import React, { useState } from "react";
import Image from "next/image";
// framer-motion
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  src: string;
  placeholder: string;
  type: string;
};

const transition = { ease: "easeOut", duration: 0.2 };

const anim = {
  hidden: { opacity: 0, transition },
  shown: { opacity: 1, transition },
};

export default function Video(props: Props) {
  const { src, type, placeholder } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            variants={anim}
            initial="hidden"
            animate="shown"
            exit="hidden"
          >
            <Image
              src={placeholder}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={placeholder}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <video
        loop
        autoPlay
        muted
        onCanPlayThrough={() => {
          setIsLoading(false);
        }}
        preload="metadata"
        poster={placeholder}
        className={`w-full h-full object-cover ${isLoading && "hidden"}`}
      >
        <source src={src} type={`video/${type}`} />
      </video>
    </>
  );
}
