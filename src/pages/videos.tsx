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
import { Video, Vid_Category } from "@prisma/client";

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

const VideoInputs = () => {
  // filters Id for default vid_categoryId
  const filters: Vid_Category[] | undefined = trpc.vidCat.list.useQuery().data;
  // inputs
  const [title, setTitle] = useState<string>("");
  const [dateOfCreation, setDateOfCreation] = useState<Date>(
    new Date("1994-08-01")
  );
  const [videoName, setVideoName] = useState<string>("");
  const [placeholder_lq, setPlaceholder_lq] = useState<string | undefined>();
  const [placeholder_hq, setPlaceholder_hq] = useState<string>("");
  const [vid_CategoryId, setvid_CategoryID] = useState<bigint>(BigInt(1));

  const createVideo = trpc.video.create.useMutation();

  const handleSubmit = () => {
    createVideo.mutate({
      title,
      dateOfCreation,
      videoName,
      placeholder_lq,
      placeholder_hq,
      vid_CategoryId,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="date"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={dateOfCreation.toISOString().split("T")[0]}
        onChange={(e) => setDateOfCreation(new Date(e.target.value))}
      />
      <input
        type="text"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={videoName}
        onChange={(e) => setVideoName(e.target.value)}
        placeholder="Name of the data"
      />
      <input
        type="text"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={placeholder_lq}
        onChange={(e) => setPlaceholder_lq(e.target.value)}
        placeholder="Placeholder LQ"
      />
      <input
        type="text"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={placeholder_hq}
        onChange={(e) => setPlaceholder_hq(e.target.value)}
        placeholder="Placeholder HQ"
      />
      <select
        value={Number(vid_CategoryId)}
        onChange={(e) => setvid_CategoryID(BigInt(e.target.value))}
      >
        {filters &&
          filters.map((filter, idx) => (
            <option key={idx} value={Number(filter.id)}>
              {filter.name}
            </option>
          ))}
      </select>
      <button> go !</button>
    </form>
  );
};

const Videos = ({ data, filters }: Props): JSX.Element => {
  const photos = trpc.photo["list"].useQuery();
  const { changeCursorType } = useContext(CursorContext);
  const [filterSelected, setFilterSelected] = useState<BigInt>();
  const [dataSelected, setDataSelected] = useState<Video[]>([]);

  useEffect(() => {
    setFilterSelected(filters[1].id);
    changeCursorType("pointer");
  }, []);

  useEffect(() => {
    const dataToDisplay = data.filter(
      (d) => d.vid_CategoryId === filterSelected
    );
    setDataSelected(dataToDisplay);
  }, [filterSelected]);

  return (
    <SmoothScroll filterSelected={filterSelected}>
      <>
        <div id="Videos" className="pt-16 xs:pt-[88px]">
          <VideoInputs />
          <Filters
            filters={filters}
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
          />
          <div className="lg:grid grid-cols-1 sm:grid-cols-12 px-4 sm:px-8 ">
            {dataSelected.map((d, idx) => (
              <AnimatePresence key={idx} mode="wait">
                <div
                  key={d.title + idx}
                  className={`${
                    idx < positions.length
                      ? positions[idx]
                      : positions[idx % positions.length]
                  }`}
                >
                  <VideoMiniature
                    placeholder={
                      process.env.NEXT_PUBLIC_PHOTOS + d.placeholder_hq
                    }
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
