import React, { RefObject, useEffect, useRef } from "react";
// Server
import { Video } from "@prisma/client";
// Component
import VideoMiniature from "../Videos/VideoMiniature";
import { motion, useScroll } from "framer-motion";
import useParallax from "@src/hooks/useParallax";
import useWindowSize from "@src/hooks/useWindowSize";

interface Props {
  category: string;
  videos?: Video[];
}

interface CategoryProps {
  category: string;
}

const Category = ({ category }: CategoryProps) => {
  return (
    <div
      className={`flex items-center py-0 sm:py-4 ${
        category === "Evenements" && "justify-end"
      }`}
    >
      <div
        className={`w-12 h-[0.5px] bg-light ${
          category === "Clips" ? "order-1 ml-4" : "mr-4"
        }`}
      />
      <p className="font-light text-2xl">{category}</p>
    </div>
  );
};

export default function VideosCol({ videos, category }: Props) {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { width } = useWindowSize();
  const { scrollYProgress } = useScroll();
  let y = useParallax(scrollYProgress, -40, "full");

  if (!videos) return <div>Loading</div>;

  return (
    <div className="mx-2 col-span-2 sm:col-span-1 sm:mx-6" ref={ref}>
      <Category category={category} />
      {/* videos miniatures */}
      <motion.div
        style={
          width && width > 640 && category === "Evenements" ? { y: y } : {}
        }
      >
        {videos.map((video) => (
          <div className="mb-6" key={video.id}>
            <VideoMiniature data={video} scrollYProgress={scrollYProgress} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
