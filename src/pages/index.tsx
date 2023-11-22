import { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
// Server
import { prisma } from "@server/prisma";
import { Photo, Video } from "@prisma/client";
// Components
import HeroVideo from "@components/Home/HeroVideo";
import Videos from "@components/Home/Videos";
import PhotosBanner from "@components/Home/PhotosBanner";
import ContactForm from "@components/Home/ContactForm";
import Footer from "@components/Utils/Footer";

import { useAuthContext } from "@src/contexts/AuthProvider";
import VideoOverlay from "@src/components/Home/VideoOrverlay";
import VideoOverlayProvider from "@src/contexts/VideoOverlayProvider";

interface Props {
  videos: Video[];
  photos: Photo[];
}

interface SecretVideosProps {
  videos: Video[];
  userStatus: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const videos = await prisma.video.findMany({
    orderBy: { dateOfCreation: "desc" },
  });

  const photos = await prisma.photo.findMany();
  return {
    props: { videos, photos },
  };
};

const SecretVideos = ({ videos, userStatus }: SecretVideosProps) => {
  // if (userStatus !== "ADMIN") return null;

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
      <VideoOverlayProvider>
        <div className="snap-parent">
          <VideoOverlay />
          <HeroVideo />
          <Videos videos={publicVideos} />
          <SecretVideos videos={secretVideos} userStatus={userStatus} />
          <PhotosBanner />
          <ContactForm />
          <Footer />
        </div>
      </VideoOverlayProvider>
    </div>
  );
}

export default Home;
