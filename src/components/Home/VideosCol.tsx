import React from "react";
// Server
import { Video } from "@prisma/client";
// Component
import VideoMiniature from "../Videos/VideoMiniature";

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
  return (
    <div className="border mx-6">
      <Category category={category} />
      {/* videos miniatures */}
      {videos.map((video, idx) => (
        <div className="mb-6">
          <VideoMiniature
            data={video}
            key={idx}
            placeholder={video.placeholder_hq}
          />
        </div>
      ))}
    </div>
  );
}
