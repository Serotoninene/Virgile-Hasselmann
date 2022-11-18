import React, { RefObject, useRef } from "react";
// Server
import { Video } from "@prisma/client";
// Component
import VideoMiniature from "../Videos/VideoMiniature";
import { motion, useScroll } from "framer-motion";
import useParallax from "@src/hooks/useParallax";

interface Props {
  category: string;
  videos: Video[];
}

interface CategoryProps {
  category: string;
}

const Category = ({ category }: CategoryProps) => {
  return (
    <div
      className={`flex items-center py-4 ${
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
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, -40, "full");
  if (!videos) return <div>Loading</div>;

  return (
    <div className="mx-6" ref={ref}>
      <Category category={category} />
      {/* videos miniatures */}
      <motion.div style={category === "Evenements" ? { y: y } : {}}>
        {videos.map((video, idx) => (
          <div className="mb-6" key={video.id}>
            <VideoMiniature data={video} scrollYProgress={scrollYProgress} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
