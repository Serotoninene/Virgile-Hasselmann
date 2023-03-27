import { useEffect, useState } from "react";
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

interface SecretVideosProps {
  videos: Video[];
  userStatus: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const videos = await prisma.video.findMany();
  const photos = await prisma.photo.findMany();
  return {
    props: { videos, photos },
    revalidate: 30,
  };
};

const SecretVideos = ({ videos, userStatus }: SecretVideosProps) => {
  console.log(userStatus);
  if (userStatus !== "ADMIN") return null;

  return (
    <section>
      <h2> Secret Videos</h2>
      <Videos videos={videos} />
    </section>
  );
};

function Home({ videos, photos }: Props) {
  const { userStatus } = useAuthContext();
  const [publicVideos, setPublicVideos] = useState<Video[]>([]);
  const [secretVideos, setSecretVideos] = useState<Video[]>([]);

  useEffect(() => {
    setPublicVideos(videos?.filter((video) => video.isSecret === false));
    setSecretVideos(videos?.filter((video) => video.isSecret === true));
  }, []);

  useEffect(() => {
    if (!photos) return;

    window.localStorage.setItem("photosData", JSON.stringify(photos));
  }, [photos]);

  if (!photos) return;

  return (
    <div id="Home" className="w-screen h-screen relative ">
      <LoadingFrame />
      <PhotosLoader photos={photos} videos={videos} />

      {/* <SmoothScroll> */}
      <div className="snap-parent- ">
        <HeroVideo />
        <Videos videos={publicVideos} />
        <SecretVideos videos={secretVideos} userStatus={userStatus} />

        <PhotosBanner />
        <ContactForm />
        <Footer />
      </div>
      {/* </SmoothScroll> */}
    </div>
  );
}

export default Home;
