import React, { RefObject, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// Framer motion
import { motion } from "framer-motion";
// Types
import { Video } from "@prisma/client";
// Store
import { photoLink } from "@src/contexts/store";

interface VideoMiniatureProps {
  isInView: boolean;
  data: Video;
}

const VideoMiniature = ({ isInView, data }: VideoMiniatureProps) => {
  const ref = useRef() as RefObject<HTMLDivElement>;

  const duration = 0.7;
  const ease = [0.6, 0.01, 0.05, 0.95];

  const containerAnim = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.4,
      },
    },
  };

  const photoAnim = {
    hidden: { y: "-100%", transition: { duration: 0.4 } },
    visible: { y: 0, transition: { duration, ease } },
  };

  const textAnim = {
    hidden: { opacity: 0, transition: { duration } },
    visible: {
      opacity: 1,
      transition: { duration, ease },
    },
  };

  // Parallax animation - the image scrolls faster than its container
  // let distance = 0;
  // const { scrollYProgress } = useScroll({ target: ref });
  // const y = useParallax(scrollYProgress, distance);

  // Treating the date
  const year = data.dateOfCreation.getFullYear();

  return (
    <Link href={`/videos/${data.id}`}>
      <motion.div
        ref={ref}
        variants={containerAnim}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        className="overflow-hidden cursor-pointer"
      >
        <motion.div className="overflow-hidden" variants={photoAnim}>
          <motion.div className="relative h-[184px] sm:h-[336px]">
            <Image
              alt={data.title}
              src={`${photoLink}/${data.placeholder_hq}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={`${photoLink}/${data.placeholder_hq}`}
            />
          </motion.div>
        </motion.div>
        <motion.div
          variants={textAnim}
          className="grid grid-cols-12 px-1 pt-2 text-sm"
        >
          <p className="col-span-4">{year}</p>
          <p className="col-span-4 xs:col-span-5"></p>

          <p className="col-span-4 xs:col-span-3">{data.title}</p>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default VideoMiniature;
