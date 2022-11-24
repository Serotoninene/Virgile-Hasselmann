import { TouchEvent, useState, WheelEvent } from "react";
import type { GetStaticProps, NextPage } from "next";
// Server
import { prisma } from "@server/prisma";
import { Video } from "@prisma/client";
// Components
import HeroVideo from "@components/Home/HeroVideo";
import Videos from "@components/Home/Videos";
import PhotosBanner from "@components/Home/PhotosBanner";
import SmoothScroll from "@components/Utils/SmoothScroll";
import ContactForm from "@components/Home/ContactForm";
import Footer from "@components/Utils/Footer";

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
      className="w-screen h-screen relative"
      onWheel={(e) => triggerMainMenuAnimDesk(e)}
      onTouchMove={(e) => triggerMainMenuAnimMobile(e)}
    >
      <SmoothScroll>
        <>
          <HeroVideo />
          <Videos videos={videos} />
          <PhotosBanner />
          <ContactForm />
          <Footer />
        </>
      </SmoothScroll>
    </div>
  );
}

export default Home;
