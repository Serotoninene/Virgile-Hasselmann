import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
// Framer motion
import { AnimatePresence } from "framer-motion";
// Prisma
import { prisma } from "@server/prisma";
import { Video, Vid_Category } from "@prisma/client";
// Component
import SmoothScroll from "@src/components/Utils/SmoothScroll";
import Filters from "@src/components/Videos/Filters";
import VideoMiniature from "@src/components/Videos/VideoMiniature";
import ScrollTopButton from "@src/components/Videos/ScrollTopButton";
import Footer from "@src/components/Utils/Footer";

const positions = [
  `col-start-1 col-end-6 lg:pt-16`,
  `col-start-8 col-end-13 lg:pt-[344px]`,
  `col-start-3 col-end-9 lg:mt-[184px]`,
  `col-start-6 col-end-12 lg:mt-[184px]`,
  `col-span-6 lg:mt-[184px]`,
  `col-start-6 col-end-12 lg:mt-[184px]`,
];

interface Props {
  data: Video[];
  filters: Vid_Category[];
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.video.findMany();
  const filters = await prisma.vid_Category.findMany();
  return {
    props: { data: data, filters: filters },
  };
};

const Videos = ({ data, filters }: Props): JSX.Element => {
  // State managing the category selected and the data displayed accordingly
  const [filterSelected, setFilterSelected] = useState<string>();
  const [dataSelected, setDataSelected] = useState<Video[]>([]);

  // setting up the category selected at launch and the cursor style
  useEffect(() => {
    setFilterSelected(filters[1].id);
  }, []);

  // changing the data to display when new filter selected
  useEffect(() => {
    const dataToDisplay = data.filter(
      (d) => d.vid_CategoryId === filterSelected
    );
    setDataSelected(dataToDisplay);
  }, [filterSelected]);

  return (
    <>
      <SmoothScroll filterSelected={filterSelected}>
        <>
          <div id="Videos" className="pt-16 xs:pt-[88px]">
            <Filters
              filters={filters}
              filterSelected={filterSelected}
              setFilterSelected={setFilterSelected}
            />
            <div className="lg:grid grid-cols-1 sm:grid-cols-12 px-4 sm:px-8 "></div>
          </div>
          <div className="hidden pt-8 pr-10 justify-end cursor-pointer lg:flex">
            <ScrollTopButton />
          </div>
          <Footer />
        </>
      </SmoothScroll>
    </>
  );
};

export default Videos;
