import { useContext, useEffect, useState } from "react";
import type { GetStaticProps } from "next";
// Server
import { prisma } from "@server/prisma";
import { Photo, Video } from "@prisma/client";
// Components
import HeroVideo from "@components/Home/HeroVideo";
import Videos from "@components/Home/Videos";
import PhotosBanner from "@components/Home/PhotosBanner";
import ContactForm from "@components/Home/ContactForm";
import Footer from "@components/Utils/Footer";
import PhotosLoader from "@src/components/Utils/PhotosLoader";
import LoadingFrame from "@src/components/LoadingFrame";

interface Props {
  videos: Video[];
  photos: Photo[];
}

export const getStaticProps: GetStaticProps = async () => {
  const videos = await prisma.video.findMany();
  const photos = await prisma.photo.findMany();
  return {
    props: { videos, photos },
  };
};

function Home({ videos, photos }: Props) {
  useEffect(() => {
    if (!photos) return;

    window.localStorage.setItem("photosData", JSON.stringify(photos));
  }, [photos]);

  if (!photos) return;

  return (
    <div id="Home" className="w-screen h-screen relative ">
      {/* preloading test */}
      <LoadingFrame />
      <PhotosLoader photos={photos} videos={videos} />

      {/* <SmoothScroll> */}
      <div className="snap-parent- ">
        <HeroVideo />
        <Videos videos={videos} />
        <PhotosBanner />
        <ContactForm />
        <Footer />
      </div>
      {/* </SmoothScroll> */}
    </div>
  );
}

export default Home;
