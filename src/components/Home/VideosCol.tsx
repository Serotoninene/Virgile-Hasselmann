import React, { RefObject, useRef } from "react";
// Server
import { Video } from "@prisma/client";
// Component
import VideoMiniature from "../Videos/VideoMiniature";
import { motion, useInView, useScroll } from "framer-motion";
import useParallax from "@src/hooks/useParallax";
import useWindowSize from "@src/hooks/useWindowSize";

interface Props {
  category: string;
  videos?: Video[];
}

export default function VideosCol({ videos, category }: Props) {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isInView = useInView(ref, { once: true });
  const { width } = useWindowSize();
  const { scrollYProgress } = useScroll();
  let delta;

  if (category == "Evenements") {
    delta = -160;
  } else {
    delta = -64;
  }

  const y = useParallax(scrollYProgress, delta, "full");

  // if (!videos) return <div>Loading</div>;

  return (
    <div className="mx-2 col-span-2 sm:col-span-1 sm:mx-6" ref={ref}>
      {/* videos miniatures */}
      <motion.div style={width && width > 640 ? { y: y } : {}}>
        {videos &&
          videos.map((video) => (
            <div className="mb-4 sm:mb-[120px]" key={video.id}>
              <VideoMiniature isInView={isInView} data={video} />
            </div>
          ))}
      </motion.div>
    </div>
  );
}
