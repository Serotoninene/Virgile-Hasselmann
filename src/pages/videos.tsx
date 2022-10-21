import React, { useState, useEffect } from "react";
// Framer motion
import { useScroll } from "framer-motion";
// Component
import Filters from "@src/components/Videos/Filters";
import VideoMiniature from "@src/components/Videos/VideoMiniature";
import ScrollTopButton from "@src/components/Videos/ScrollTopButton";
import Footer from "@src/components/Utils/Footer";
import SmoothScroll from "@src/components/Utils/SmoothScroll";

const positions = [
  `col-start-2 col-end-7 lg:pt-16`,
  `col-start-8 col-end-13 lg:pt-[344px]`,
  `col-start-3 col-end-9 lg:pt-[80px]`,
  `col-start-6 col-end-12 lg:pt-[80px]`,
  `col-span-6 lg:pt-[80px]`,
  `col-start-6 col-end-12 lg:pt-[80px]`,
];

const data = [
  {
    date: "08/09/2021",
    client: "Mitsubichi",
    titre: "Holding Hands",
    placeholder_ld: "/assets/photos/hands_holding.png",
    placeholder_hd: "/assets/photos/hands_holding.png",
    video: "/assets/videos/hands_holding.mp4",
  },
  // {
  //   date: "08/09/2021",
  //   client: "Mitsubichi",
  //   titre: "Holding Hands",
  //   placeholder_ld: "/assets/photos/hands_holding.png",
  //   placeholder_hd: "/assets/photos/hands_holding.png",
  //   video: "/assets/videos/hands_holding.mp4",
  // },
  // {
  //   date: "08/09/2021",
  //   client: "Mitsubichi",
  //   titre: "Holding Hands",
  //   placeholder_ld: "/assets/photos/hands_holding.png",
  //   placeholder_hd: "/assets/photos/hands_holding.png",
  //   video: "/assets/videos/hands_holding.mp4",
  // },
  // {
  //   date: "08/09/2021",
  //   client: "Mitsubichi",
  //   titre: "Holding Hands",
  //   placeholder_ld: "/assets/photos/hands_holding.png",
  //   placeholder_hd: "/assets/photos/hands_holding.png",
  //   video: "/assets/videos/hands_holding.mp4",
  // },
  // {
  //   date: "08/09/2021",
  //   client: "Mitsubichi",
  //   titre: "Holding Hands",
  //   placeholder_ld: "/assets/photos/hands_holding.png",
  //   placeholder_hd: "/assets/photos/hands_holding.png",
  //   video: "/assets/videos/hands_holding.mp4",
  // },
  // {
  //   date: "08/09/2021",
  //   client: "Mitsubichi",
  //   titre: "Holding Hands",
  //   placeholder_ld: "/assets/photos/hands_holding.png",
  //   placeholder_hd: "/assets/photos/hands_holding.png",
  //   video: "/assets/videos/hands_holding.mp4",
  // },
  // {
  //   date: "08/09/2021",
  //   client: "Mitsubichi",
  //   titre: "Holding Hands",
  //   placeholder_ld: "/assets/photos/hands_holding.png",
  //   placeholder_hd: "/assets/photos/hands_holding.png",
  //   video: "/assets/videos/hands_holding.mp4",
  // },
  // {
  //   date: "08/09/2021",
  //   client: "Mitsubichi",
  //   titre: "Holding Hands",
  //   placeholder_ld: "/assets/photos/hands_holding.png",
  //   placeholder_hd: "/assets/photos/hands_holding.png",
  //   video: "/assets/videos/hands_holding.mp4",
  // },
  // {
  //   date: "08/09/2021",
  //   client: "Mitsubichi",
  //   titre: "Holding Hands",
  //   placeholder_ld: "/assets/photos/hands_holding.png",
  //   placeholder_hd: "/assets/photos/hands_holding.png",
  //   video: "/assets/videos/hands_holding.mp4",
  // },
  // {
  //   date: "08/09/2021",
  //   client: "Mitsubichi",
  //   titre: "Holding Hands",
  //   placeholder_ld: "/assets/photos/hands_holding.png",
  //   placeholder_hd: "/assets/photos/hands_holding.png",
  //   video: "/assets/videos/hands_holding.mp4",
  // },
];

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
      <>
        <div id="Videos" className="pt-16 xs:pt-[88px]">
          <Filters
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
          />
          <div className="lg:grid grid-cols-1 sm:grid-cols-12 px-4 sm:px-8 ">
            {data.map((d, idx) => (
              <div
                key={idx}
                className={`pt-4 ${
                  idx < positions.length
                    ? positions[idx]
                    : positions[idx % positions.length]
                }`}
              >
                <VideoMiniature
                  placeholder={d.placeholder_ld}
                  scrollYProgress={scrollYProgress}
                />
              </div>
            ))}
          </div>
        </div>
        <ScrollTopButton />
        <Footer />
      </>
    </SmoothScroll>
  );
};

export default Videos;
