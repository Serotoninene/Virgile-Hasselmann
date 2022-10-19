import React from "react";

export default function HeroVideo() {
  return (
    <div className="fixed h-screen w-screen">
      <video width="100%" height="100%" loop autoPlay>
        <source src="/assets/videos/heroVideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
