import { useVideoOverlayContext } from "@src/contexts/VideoOverlayProvider";
import useWindowSize from "@src/hooks/useWindowSize";
import React from "react";

import ReactPlayer from "react-player";

import { XMarkIcon } from "@heroicons/react/24/solid";

const VideoOverlay: React.FC = () => {
  const { isOverlay, selectedVideo, handleCloseOverlay } =
    useVideoOverlayContext();

  const { width } = useWindowSize();
  const ratio = width && width < 640 ? 0.9 : 0.7;

  const playerWidth = width && width * ratio;
  const playerHeight = playerWidth && playerWidth * (9 / 16);

  if (!isOverlay || !selectedVideo || !selectedVideo.videoLink) return null;

  return (
    <div
      className=" fixed top-0 left-0 right-0 bottom-0 bg-dark bg-opacity-80 flex justify-center items-center z-50"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          handleCloseOverlay();
        }
      }}
      onClick={handleCloseOverlay}
    >
      <div className="absolute top-6 left-6 w-8 h-8 cursor-pointer">
        <XMarkIcon />
      </div>
      <ReactPlayer
        url={selectedVideo.videoLink}
        controls={true}
        width={playerWidth}
        height={playerHeight}
      />
    </div>
  );
};

export default VideoOverlay;
