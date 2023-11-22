import { useVideoOverlayContext } from "@src/contexts/VideoOverlayProvider";
import React from "react";

const VideoOverlay: React.FC = () => {
  const { isOverlay, selectedVideo } = useVideoOverlayContext();

  console.log(selectedVideo);

  if (!isOverlay || !selectedVideo) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark bg-opacity-40 flex justify-center items-center z-50">
      <div className="w-[500px] h-[500px] bg-red-400"></div>
    </div>
  );
};

export default VideoOverlay;
