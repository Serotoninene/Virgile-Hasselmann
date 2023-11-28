import React, { RefObject, useRef } from "react";
import Image from "next/image";

// Framer motion
import { motion } from "framer-motion";
// Types
import { Video } from "@prisma/client";
// Store
import { photoLink } from "@src/contexts/store";
import { useVideoOverlayContext } from "@src/contexts/VideoOverlayProvider";
import { containerAnim, photoAnim, textAnim } from "./animations";
import { useRouter } from "next/router";

interface VideoMiniatureProps {
  isInView: boolean;
  data: Video;
  idx: number;
}

const VideoMiniature = ({ isInView, data, idx }: VideoMiniatureProps) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const router = useRouter();
  const { handleOpenOverlay } = useVideoOverlayContext();

  // Parallax animation - the image scrolls faster than its container
  // let distance = 0;
  // const { scrollYProgress } = useScroll({ target: ref });
  // const y = useParallax(scrollYProgress, distance);

  // Treating the date
  const year = data.dateOfCreation.getFullYear();

  return (
    <motion.div
      ref={ref}
      variants={containerAnim}
      onClick={() =>
        data.videoLink
          ? handleOpenOverlay(data)
          : router.push(`/videos/${data.id}`)
      }
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
            priority={idx < 2}
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
  );
};

export default VideoMiniature;
