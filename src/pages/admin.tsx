import React, { useContext, useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
// Context
import { AuthContext } from "@src/contexts/AuthProvider";
// Prisma
import { prisma } from "@server/prisma";
import VideoSection from "@src/components/Admin/VideoSection";
import { Photo, Video } from "@prisma/client";
import PhotoInputs from "@src/components/Admin/PhotoInputs";

// Defining a type for videos that includes the relation with categories`

interface Props {
  videos: Video[];
  photos: Photo[];
}

export const getStaticProps: GetStaticProps = async () => {
  const videos = await prisma.video.findMany();
  const photos = await prisma.photo.findMany();

  return {
    props: { videos: videos, photos: photos },
  };
};

export default function Admin({ videos, photos }: Props) {
  // If the status is not ADMIN, redirects toward the home
  const router = useRouter();
  // auth context
  const { userStatus } = useContext(AuthContext);

  useEffect(() => {
    if (userStatus !== "ADMIN") {
      router.push("/");
    }
  }, []);

  return (
    <div className="pt-16 xs:pt-[88px] px-4 sm:px-6">
      <h1 className="text-center text-2xl text-light font-bold">
        Admin's page
      </h1>
      <PhotoInputs />
      <VideoSection videos={videos} />
    </div>
  );
}
