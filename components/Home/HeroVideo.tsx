import React from "react";

export default function HeroVideo() {
  return (
    <div className="fixed h-screen w-screen overflow-hidden flex justify-center items-center">
      <video loop autoPlay muted className="w-full h-full object-cover">
        <source src="/assets/videos/heroVideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
