import Video from "components/Video";
import React from "react";

export default function HeroVideo() {
  return (
    <div className="fixed h-screen w-screen overflow-hidden flex justify-center items-center">
      <Video
        src="/assets/videos/heroVideo.mp4"
        type="mp4"
        placeholder="/assets/photos/heroVideo_placeholder.png"
      />
    </div>
  );
}
