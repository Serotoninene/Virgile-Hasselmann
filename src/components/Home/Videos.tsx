import React from "react";
// Server
import { Video } from "@prisma/client";
// Components
import VideosCol from "./VideosCol";

interface Props {
  videos: Video[];
}

export default function Videos({ videos }: Props) {
  return (
    <div className="relative py-4 grid grid-cols-2">
      <VideosCol category="Evenements" videos={videos} />
      <div className="hidden sm:block absolute top-20 h-[90%] w-[0.5px] bg-light left-[50%]"></div>
      <VideosCol category="Clips" videos={videos} />
    </div>
  );
}
