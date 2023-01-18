import React, { RefObject, useEffect, useRef, useState } from "react";
// Server
import { Video } from "@prisma/client";
// Components
import VideosCol from "./VideosCol";
import { useInView } from "framer-motion";

interface Props {
  videos: Video[];
}

export default function Videos({ videos }: Props) {
  const [leftVideos, setLeftVideos] = useState<Video[]>([]);
  const [rightVideos, setRightVideos] = useState<Video[]>([]);

  useEffect(() => {
    videos.forEach((video, idx) => {
      if (idx % 2 !== 0) {
        setLeftVideos([...leftVideos, video]);
      } else {
        setRightVideos([...rightVideos, video]);
      }
    });
  }, [videos]);

  return (
    <div id="Videos" className="relative py-4 grid grid-cols-2 ">
      <VideosCol category="Evenements" videos={rightVideos} />
      {/* <div className="hidden sm:block absolute top-20 bottom-20 w-[0.5px] bg-light left-[50%]"></div> */}
      <VideosCol category="Clips" videos={leftVideos} />
    </div>
  );
}
