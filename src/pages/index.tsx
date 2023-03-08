import { useEffect } from "react";
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
import { useAuthContext } from "@src/contexts/AuthProvider";

interface Props {
  videos: Video[];
  photos: Photo[];
}

export const getStaticProps: GetStaticProps = async () => {
  const videos = await prisma.video.findMany();
  const photos = await prisma.photo.findMany();
  return {
    props: { videos, photos },
    revalidate: 30,
  };
};

function Home({ videos, photos }: Props) {
  const { userStatus } = useAuthContext();
  const publicVideos = videos?.filter((video) => video.isSecret === false);
  const secretVideos = videos?.filter((video) => video.isSecret === true);

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
        <Videos videos={publicVideos} />
        {userStatus === "ADMIN" && (
          <>
            <h2> Secret Videos</h2>
            <Videos videos={secretVideos} />{" "}
          </>
        )}

        <PhotosBanner />
        <ContactForm />
        <Footer />
      </div>
      {/* </SmoothScroll> */}
    </div>
  );
}

export default Home;
