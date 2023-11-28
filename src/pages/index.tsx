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
import { useLoader } from "@src/hooks/useLoader";
import Loader from "@src/components/Home/Loader";
import Navbar from "@src/components/Utils/Navbar";
import Lenis from "@studio-freight/lenis";

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

  return {
    props: { videos },
  };
};

const SecretVideos = ({ videos, userStatus }: SecretVideosProps) => {
  if (userStatus !== "ADMIN") return null;

  return (
    <section>
      <h2> Secret Videos</h2>
      <Videos videos={videos} />
    </section>
  );
};

function Home({ videos }: Props) {
  const { userStatus } = useAuthContext();
  const [publicVideos, setPublicVideos] = useState<Video[]>([]);
  const [secretVideos, setSecretVideos] = useState<Video[]>([]);

  const { isLoading, loadingProgress } = useLoader({ videos });

  useEffect(() => {
    setPublicVideos(videos?.filter((video) => video.isSecret === false));
    setSecretVideos(videos?.filter((video) => video.isSecret === true));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const lenis = new Lenis();

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loader loadingProgress={loadingProgress} />; // Replace with your actual loader component
  }

  return (
    <div id="Home" className="w-screen h-screen relative ">
      <header className="fixed w-screen z-50">
        <Navbar />
      </header>
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
