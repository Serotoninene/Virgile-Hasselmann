import React, { useState, useEffect, useContext } from "react";
// Framer motion
import { AnimatePresence } from "framer-motion";
// Context
import { CursorContext } from "@src/contexts/CursorProvider";
// Component
import Filters from "@src/components/Videos/Filters";
import VideoMiniature from "@src/components/Videos/VideoMiniature";
import ScrollTopButton from "@src/components/Videos/ScrollTopButton";
import Footer from "@src/components/Utils/Footer";
import SmoothScroll from "@src/components/Utils/SmoothScroll";
import { trpc } from "@server/utils/trpc";
import { GetStaticProps } from "next";
// import { prisma } from "@server/prisma";
import { Video } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

interface DataUnit {
  date: string;
  client: string;
  titre: string;
  placeholder_ld: string;
  placeholder_hd: string;
  video: string;
  category: string;
}

const positions = [
  `col-start-1 col-end-6 lg:pt-16`,
  `col-start-8 col-end-13 lg:pt-[344px]`,
  `col-start-3 col-end-9 lg:pt-[80px]`,
  `col-start-6 col-end-12 lg:pt-[80px]`,
  `col-span-6 lg:pt-[80px]`,
  `col-start-6 col-end-12 lg:pt-[80px]`,
];

const filters = ["Films", "Corporate", "Musique"];

interface Props {
  videos: Video[];
}

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();
  const videos = await prisma.video.findMany({
    select: {
      title: true,
    },
  });
  return {
    props: { videos: videos },
  };
};

const Videos = ({ videos }: Props): JSX.Element => {
  const data = trpc.get_all_videos.useQuery();
  console.log(videos);
  const { changeCursorType } = useContext(CursorContext);
  const [filterSelected, setFilterSelected] = useState<string>(filters[1]);
  const [dataSelected, setDataSelected] = useState<DataUnit[]>([]);

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

    changeCursorType("pointer");
  }, []);

  // useEffect(() => {
  //   const dataToDisplay = data.filter((d) => d.category === filterSelected);
  //   setDataSelected(dataToDisplay);
  // }, [filterSelected]);

  return (
    <SmoothScroll filterSelected={filterSelected}>
      <>
        <div id="Videos" className="pt-16 xs:pt-[88px]">
          <Filters
            filters={filters}
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
          />
          <div className="lg:grid grid-cols-1 sm:grid-cols-12 px-4 sm:px-8 ">
            {dataSelected.map((d, idx) => (
              <AnimatePresence key={idx} mode="wait">
                <div
                  key={d.placeholder_hd + idx}
                  className={`pt-4 ${
                    idx < positions.length
                      ? positions[idx]
                      : positions[idx % positions.length]
                  }`}
                >
                  <VideoMiniature
                    placeholder={d.placeholder_ld}
                    // scrollYProgress={scrollYProgress}
                  />
                </div>
              </AnimatePresence>
            ))}
          </div>
        </div>
        <div className="hidden pt-8 pr-10 justify-end cursor-pointer lg:flex">
          <ScrollTopButton />
        </div>
        <Footer />
      </>
    </SmoothScroll>
  );
};

export default Videos;
