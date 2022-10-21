import React, { useState, useEffect } from "react";
// Framer motion
import { useScroll } from "framer-motion";
// Component
import SmoothScroll from "@src/components/Utils/SmoothScroll";
import Filters from "@src/components/Videos/Filters";
import VideoMiniature from "@src/components/Videos/VideoMiniature";

const Videos = (): JSX.Element => {
  const { scrollYProgress } = useScroll();
  const [filterSelected, setFilterSelected] = useState<string>("Films");

  useEffect(() => {
    // I'm forced to do so because of a bug from scrollYProgress, at the first scroll push,
    //the value is, just for a milisecond : 1 instead of zero, which pushes the images in a stroke
    // So I'm emulating a push of the scroll after 0.5s so I can hide the push with an anim 😬
    setTimeout(
      () =>
        window.scroll({
          top: 1,
        }),
      500
    );
  }, []);

  return (
    <SmoothScroll>
      <div id="Videos" className="pt-16 xs:pt-[88px]">
        <Filters
          filterSelected={filterSelected}
          setFilterSelected={setFilterSelected}
        />
        <div className="px-4 pt-4 lg:grid grid-cols-1 sm:grid-cols-12 sm:px-6">
          <div className="col-span-5 lg:pt-16">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>
          <div></div>
          <div className="col-span-6 lg:pt-[336px]">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>
          <div className="col-start-3 col-end-9 lg:pt-16">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>

          <div className="col-span-5 lg:pt-16">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>
          <div></div>
          <div className="col-span-6 lg:pt-[336px]">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>
          <div className="col-start-3 col-end-9 lg:pt-16">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default Videos;
