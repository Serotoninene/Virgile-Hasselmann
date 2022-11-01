import React, { useContext, useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
// Context
import { AuthContext } from "@src/contexts/AuthProvider";
// Prisma
import { Prisma } from "@prisma/client";
import { prisma } from "@server/prisma";
import { Photo, Video, Vid_Category } from "@prisma/client";

// Defining a type for videos that includes the relation with categories`
const videoWithCategories = Prisma.validator<Prisma.VideoArgs>()({
  include: { Vid_Category: true },
});
type VideoWithCategories = Prisma.VideoGetPayload<typeof videoWithCategories>;

interface Props {
  videos: VideoWithCategories[];
  photos: Photo[];
}

export const getStaticProps: GetStaticProps = async () => {
  const videos = await prisma.video.findMany({
    include: { Vid_Category: true },
  });
  const photos = await prisma.photo.findMany();

  return {
    props: { videos: videos, photos: photos },
  };
};

export default function Admin({ videos, photos }: Props) {
  const router = useRouter();
  // auth context
  const { userStatus } = useContext(AuthContext);

  // If the status is not ADMIN, redirects toward the home
  // useEffect(() => {
  //   if (userStatus !== "ADMIN") {
  //     router.push("/");
  //   }
  // }, []);
  // if (userStatus !== "ADMIN") return <></>;

  return (
    <div className="pt-16 xs:pt-[88px] px-4 sm:px-6">
      <h1 className="text-center text-2xl text-light font-bold">
        Admin's page
      </h1>
      <h2 className="text-xl"> Videos </h2>
      {videos &&
        videos.map((video) => (
          <div className="grid grid-cols-12" key={Number(video.id)}>
            <div className="col-span-2 p-1">
              <img
                src={process.env.NEXT_PUBLIC_PHOTOS + video.placeholder_hq}
              ></img>
            </div>
            <div className="col-span-2 p-1 flex items-end"> {video.title} </div>
            <div className="col-span-2 p-1 flex items-end">
              {video.Vid_Category.name}
            </div>
            <div className="col-span-2 p-1 flex items-end">
              {video.published}
            </div>
          </div>
        ))}
    </div>
  );
}
