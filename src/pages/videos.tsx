import React, { useState, useEffect } from "react";
import Image from "next/image";
// Framer motion
import { motion, MotionValue, useScroll } from "framer-motion";
// Component
import SmoothScroll from "@src/components/Utils/SmoothScroll";
import useParallax from "@src/hooks/useParallax";
import useWindowSize from "@src/hooks/useWindowSize";

const filterLinks = ["Films", "Corporate", "Musique"];

interface FiltersProps {
  filterSelected: string;
  setFilterSelected: (e: string) => void;
}

interface VideoMiniatureProps {
  placeholder: string;
  scrollYProgress: MotionValue;
}

const Filters = ({ filterSelected, setFilterSelected }: FiltersProps) => {
  return (
    <div className="flex text-2xl sm:justify-center sm:text-5xl">
      <ul className="flex">
        {filterLinks.map((filter, idx) => (
          <div key={filter} className="flex">
            <li
              onClick={() => setFilterSelected(filter)}
              className={`${
                filterSelected === filter ? "text-blue font-black" : ""
              } mx-1`}
            >
              {filter}
            </li>
            {idx !== filterLinks.length - 1 && <li>/</li>}
          </div>
        ))}
      </ul>
    </div>
  );
};

const VideoMiniature = ({
  placeholder,
  scrollYProgress,
}: VideoMiniatureProps) => {
  let distance = -25;
  const { width } = useWindowSize();
  width! < 768 ? (distance = -25) : -75;
  const y = useParallax(scrollYProgress, distance);

  return (
    <div>
      <div className="border overflow-hidden">
        <motion.div
          className="relative h-[184px] sm:h-[336px] scale-150 opacity-20"
          style={{ y, scale: 1.2 }}
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
