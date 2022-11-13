import React, { RefObject, useRef } from "react";
// Server
import { Video } from "@prisma/client";
// Components
import VideosCol from "./VideosCol";
// Framer motion
import useParallax from "@hooks/useParallax";
import { motion, useScroll } from "framer-motion";

interface Props {
  videos: Video[];
}

export default function Videos({ videos }: Props) {
  return (
    <div className="relative py-4 grid grid-cols-2">
      <VideosCol category="Evenements" videos={videos} />
      <VideosCol category="Clips" videos={videos} />
    </div>
  );
}
