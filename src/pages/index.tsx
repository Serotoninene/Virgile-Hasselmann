import { TouchEvent, useState, WheelEvent } from "react";
import type { GetStaticProps, NextPage } from "next";
// Server
import { prisma } from "@server/prisma";
// Components
import HeroVideo from "@components/Home/HeroVideo";
import Videos from "@src/components/Home/Videos";
import { Video } from "@prisma/client";

interface Props {
  videos: Video[];
}

export const getStaticProps: GetStaticProps = async () => {
  const videos = await prisma.video.findMany();
  return {
    props: { videos },
  };
};

function Home({ videos }: Props) {
  const [goToMainMenu, setGoToMainMenu] = useState<boolean>(false);
  let lastY: number = 0;

  const triggerMainMenuAnimMobile = (e: TouchEvent<HTMLDivElement>) => {
    let currentY = e.touches[0].clientY;
    if (currentY < lastY) {
      setGoToMainMenu(true);
    } else if (currentY > lastY) {
      setGoToMainMenu(false);
    }
    lastY = currentY;
  };

  const triggerMainMenuAnimDesk = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      setGoToMainMenu(true);
    } else {
      setGoToMainMenu(false);
    }
  };

  return (
    <div
      id="Home"
      className="w-screen h-screen"
      onWheel={(e) => triggerMainMenuAnimDesk(e)}
      onTouchMove={(e) => triggerMainMenuAnimMobile(e)}
    >
      <HeroVideo />
      <Videos videos={videos} />
    </div>
  );
}

export default Home;
