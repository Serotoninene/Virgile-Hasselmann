import React from "react";

export default function DarkGradients() {
  return (
    <div className="h-screen w-screen fixed flex flex-col justify-between pointer-events-none">
      <div className="h-[20vh] bg-gradient-to-b from-black to-transparent"></div>
      <div className="h-[60vh] xs:h-[33vh] bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}
