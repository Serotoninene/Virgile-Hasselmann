import { Video } from "@prisma/client";
import React, { createContext, useMemo, useState } from "react";

interface VideoOverlayContextProps {
  isOverlay: boolean;
  selectedVideo: Video | null;
  handleOpenOverlay: (video: Video) => void;
  handleCloseOverlay: () => void;
}

interface VideoOverlayProviderProps {
  children: JSX.Element;
}

export const VideoOverlayContext = createContext<VideoOverlayContextProps>({
  isOverlay: false,
  selectedVideo: null,
  handleOpenOverlay: () => {},
  handleCloseOverlay: () => {},
});

const VideoOverlayProvider = ({ children }: VideoOverlayProviderProps) => {
  const [isOverlay, setIsOverlay] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleOpenOverlay = (video: Video) => {
    setIsOverlay(true);
    setSelectedVideo(video);
  };

  const handleCloseOverlay = () => {
    setIsOverlay(false);
    setSelectedVideo(null);
  };

  const stateValues = useMemo(
    () => ({ handleOpenOverlay, handleCloseOverlay, isOverlay, selectedVideo }),
    [isOverlay, selectedVideo]
  );

  return (
    <VideoOverlayContext.Provider value={stateValues}>
      {children}
    </VideoOverlayContext.Provider>
  );
};

export const useVideoOverlayContext = () => {
  return React.useContext(VideoOverlayContext);
};

export default VideoOverlayProvider;
