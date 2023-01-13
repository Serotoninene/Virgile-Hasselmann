import { TouchEvent, useState, WheelEvent } from "react";
import type { GetStaticProps } from "next";
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

import bcrypt from "bcryptjs";

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
  return (
    <div id="Home" className="w-screen h-screen relative">
      {/* <SmoothScroll> */}
      <>
        <HeroVideo />
        <Videos videos={videos} />
        <PhotosBanner />
        <ContactForm />
        <Footer />
      </>
      {/* </SmoothScroll> */}
    </div>
  );
}

export default Home;
