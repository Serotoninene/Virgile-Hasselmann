import React, { RefObject, useContext, useRef } from "react";
import Image from "next/image";
// Framer motion
import { motion, MotionValue, useScroll, useSpring } from "framer-motion";
// Hooks
import useParallax from "@src/hooks/useParallax";
import { AuthContext } from "@src/contexts/AuthProvider";
import { trpc } from "@server/utils/trpc";
import { Video } from "@prisma/client";
import Link from "next/link";

interface VideoMiniatureProps {
  isInView: boolean;
  data: Video;
}

const VideoMiniature = ({ isInView, data }: VideoMiniatureProps) => {
  const ref = useRef() as RefObject<HTMLDivElement>;

  const duration = 0.7;
  const ease = "easeOut";

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
          <motion.div
            className="relative h-[184px] sm:h-[336px]"
            // style={{ y }}
          >
            <Image
              alt={data.title}
              src={`https://virgile-portfollio.s3.amazonaws.com/photos/${data.placeholder_hq}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={`https://virgile-portfollio.s3.amazonaws.com/photos/${data.placeholder_hq}`}
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
