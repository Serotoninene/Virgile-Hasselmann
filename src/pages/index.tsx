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
import { useEffect } from "react";
import Image from "next/image";
import { photoLink } from "@src/contexts/store";

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
    console.log(photos[0]);
    console.log(photoLink + photos[0].title);
  }, []);

  if (!photos) return;

  return (
    <div id="Home" className="w-screen h-screen relative ">
      {/* preloading test */}
      <div className="absolute opacity-50 w-full h-screen z-10">
        {photos.map((photo) => (
          <Image
            key={photo.id}
            alt=""
            src={photoLink + photo.photoName}
            layout="fill"
          />
        ))}
      </div>

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
