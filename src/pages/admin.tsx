import React, { useContext, useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
// Context
import { AuthContext } from "@src/contexts/AuthProvider";
// Prisma
import { prisma } from "@server/prisma";
import { Photo, Video, Vid_Category } from "@prisma/client";

interface Props {
  videos: Video[];
  photos: Photo[];
  vid_category: Vid_Category[];
}

export const getStaticProps: GetStaticProps = async () => {
  const videos = await prisma.video.findMany();
  const photos = await prisma.photo.findMany();
  const vid_category = await prisma.vid_Category.findMany();
  return {
    props: { videos: videos, photos: photos, vid_category: vid_category },
  };
};

export default function Admin({ videos, vid_category, photos }: Props) {
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

  console.log(videos);

  return (
    <div className="pt-16 xs:pt-[88px] px-4 sm:px-6">
      <h1 className="text-center text-2xl text-light font-bold">
        Admin's page
      </h1>
      <h2 className="text-xl"> Videos </h2>
      {videos.map((video) => (
        <div className="grid grid-cols-12" key={Number(video.id)}>
          <div className="col-span-2 p-1">
            {" "}
            <img
              src={process.env.NEXT_PUBLIC_PHOTOS + video.placeholder_hq}
            ></img>{" "}
          </div>
          <div className="col-span-2 p-1"> {video.title} </div>
          <div className="col-span-2 p-1">
            {/* supposed to be the video category there */}
          </div>
          <div className="col-span-2 p-1"> {video.published} </div>
        </div>
      ))}
    </div>
  );
}
