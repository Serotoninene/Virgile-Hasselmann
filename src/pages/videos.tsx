import React, { useState, useRef, RefObject } from "react";
import Image from "next/image";
// Framer motion
import { motion, MotionValue, useScroll } from "framer-motion";
// Component
import SmoothScroll from "@src/components/Utils/SmoothScroll";
import useParallax from "@src/hooks/useParallax";

const filterLinks = ["Films", "Corporate", "Musique"];

interface FiltersProps {
  filterSelected: string;
  setFilterSelected: (e: string) => void;
}

interface VideoMiniatureProps {
  placeholder: string;
  scrollYProgress: MotionValue;
}

const VideoMiniature = ({
  placeholder,
  scrollYProgress,
}: VideoMiniatureProps) => {
  return (
    <div>
      <div className="overflow-hidden">
        <motion.div
          className="relative h-[184px] sm:h-[336px]"
          style={{
            y: useParallax(scrollYProgress, 75, "reverse"),
            scale: 1.5,
          }}
        >
          <Image
            src={placeholder}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </motion.div>
      </div>
      <div className="grid grid-cols-12 px-1 pt-2 text-sm">
        <p className="col-span-4">08/09/2021</p>
        <p className="col-span-3">Client</p>
        <p className="col-span-5">Titre de l’oeuvre</p>
      </div>
    </div>
  );
};

const Filters = ({ filterSelected, setFilterSelected }: FiltersProps) => {
  return (
    <div className="flex text-2xl sm:justify-center sm:text-5xl">
      <ul className="flex">
        {filterLinks.map((filter, idx) => (
          <div key={filter}>
            <li
              onClick={() => setFilterSelected(filter)}
              className={`${
                filterSelected === filter ? "text-blue font-black" : ""
              } mx-1`}
            >
              {filter}
            </li>
            {idx !== 2 && <li>/</li>}
          </div>
        ))}
      </ul>
    </div>
  );
};

const Videos = (): JSX.Element => {
  const { scrollYProgress } = useScroll();
  const [filterSelected, setFilterSelected] = useState<string>("Films");
  return (
    <SmoothScroll>
      <div id="Videos" className="pt-16 xs:pt-[88px]">
        <Filters
          filterSelected={filterSelected}
          setFilterSelected={setFilterSelected}
        />
        <div className="px-4 pt-4 sm:grid grid-cols-1 sm:grid-cols-12 sm:px-6">
          <div className="col-span-5 sm:pt-16">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>
          <div></div>
          <div className="col-span-6 sm:pt-[336px]">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>
          <div className="col-start-3 col-end-9 sm:pt-16">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>

          <div className="col-span-5 sm:pt-16">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>
          <div></div>
          <div className="col-span-6 sm:pt-[336px]">
            <VideoMiniature
              placeholder="/assets/photos/hands_holding.png"
              scrollYProgress={scrollYProgress}
            />
          </div>
          <div className="col-start-3 col-end-9 sm:pt-16">
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
