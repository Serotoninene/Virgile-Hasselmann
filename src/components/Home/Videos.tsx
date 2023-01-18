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
  const [clips, setClips] = useState<Video[]>();
  const [evenementVideos, setEvenementVideos] = useState<Video[]>();

  useEffect(() => {
    setClips(videos.filter((video) => video.vid_CategoryId === "Clips"));
    setEvenementVideos(
      videos.filter((video) => video.vid_CategoryId === "Evenements")
    );
  }, []);

  return (
    <div id="Videos" className="relative py-4 grid grid-cols-2 ">
      <VideosCol category="Evenements" videos={evenementVideos} />
      {/* <div className="hidden sm:block absolute top-20 bottom-20 w-[0.5px] bg-light left-[50%]"></div> */}
      <VideosCol category="Clips" videos={clips} />
    </div>
  );
}
