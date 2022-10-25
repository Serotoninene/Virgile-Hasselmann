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
import { prisma } from "@server/prisma";
import { Video } from "@prisma/client";

const positions = [
  `col-start-1 col-end-6 lg:pt-16`,
  `col-start-8 col-end-13 lg:pt-[344px]`,
  `col-start-3 col-end-9 lg:mt-[184px]`,
  `col-start-6 col-end-12 lg:mt-[184px]`,
  `col-span-6 lg:mt-[184px]`,
  `col-start-6 col-end-12 lg:mt-[184px]`,
];

const filters = ["Films", "Corporate", "Musique"];

interface Props {
  data: Video[];
}

// export const getStaticProps: GetStaticProps = async () => {
//   const data = await prisma.video.findMany();
//   return {
//     props: { data: data },
//   };
// };

const Videos = ({ data }: Props): JSX.Element => {
  const videos = trpc.get_all_videos.useQuery();
  const { changeCursorType } = useContext(CursorContext);
  const [filterSelected, setFilterSelected] = useState<string>(filters[1]);
  const [dataSelected, setDataSelected] = useState<Video[]>([]);

  useEffect(() => {
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
                  key={d.placeholder + idx}
                  className={`${
                    idx < positions.length
                      ? positions[idx]
                      : positions[idx % positions.length]
                  }`}
                >
                  <VideoMiniature
                    placeholder={process.env.NEXT_PUBLIC_PHOTOS + d.placeholder}
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
