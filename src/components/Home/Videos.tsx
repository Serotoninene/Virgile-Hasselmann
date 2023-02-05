import React, { useEffect, useMemo, useState } from "react";
// Server
import { Video } from "@prisma/client";
// Components
import VideosCol from "./VideosCol";

interface Props {
  videos: Video[];
}

export default function Videos({ videos }: Props) {
  const leftVideos = useMemo(() => {
    if (!videos) return;
    let oddVideos: Video[] = [];
    videos.forEach((video, idx) => {
      if (idx % 2 !== 0) {
        oddVideos.push(video);
      }
    });
    return oddVideos;
  }, [videos]);

  const rightVideos = useMemo(() => {
    if (!videos) return;
    let evenVideos: Video[] = [];
    videos.forEach((video, idx) => {
      if (idx % 2 === 0) {
        evenVideos.push(video);
      }
    });
    return evenVideos;
  }, [videos]);

  return (
    <div
      id="Videos"
      className="relative py-4 grid grid-cols-2 xl:max-w-[1280px] 2xl:max-w-[1536px] xl:m-auto snap-child-start"
    >
      <VideosCol category="Evenements" videos={leftVideos} />
      {/* <div className="hidden sm:block absolute top-20 bottom-20 w-[0.5px] bg-light left-[50%]"></div> */}
      <VideosCol category="Clips" videos={rightVideos} />
    </div>
  );
}
