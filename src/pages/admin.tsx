import React, { useContext, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
// Context
import { AuthContext } from "@src/contexts/AuthProvider";
// Prisma
import { prisma } from "@server/prisma";
import VideoInputs from "@src/components/Admin/VideoInputs";
import { trpc } from "@server/utils/trpc";
import { VideoWithCategories, PhotoWithCategories } from "types";

// Defining a type for videos that includes the relation with categories`

interface Props {
  videos: VideoWithCategories[];
  photos: PhotoWithCategories[];
}

interface VideoLineProps {
  video: VideoWithCategories;
}

const VideoLine = ({ video }: VideoLineProps) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const deleteVideo = trpc.video.delete.useMutation();

  if (isUpdated) return <VideoInputs data={video} />;
  return (
    <div className="grid grid-cols-12" key={Number(video.id)}>
      <div className="col-span-2 p-1">
        <img src={process.env.NEXT_PUBLIC_PHOTOS + video.placeholder_hq}></img>
      </div>
      <div className="col-span-2 p-1 flex items-end"> {video.title} </div>
      <div className="col-span-2 p-1 flex items-end">
        {video.Vid_Category.name}
      </div>
      <div className="col-span-2 p-1 flex items-end">
        {video.dateOfCreation.toDateString()}
      </div>
      <div
        className="col-span-2 p-1 flex items-end cursor-pointer"
        onClick={() => {
          setIsUpdated(true);
        }}
      >
        update
      </div>
      <div
        className="col-span-2 p-1 flex items-end cursor-pointer"
        onClick={() => deleteVideo.mutate(video.id)}
      >
        delete
      </div>
    </div>
  );
};

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
  // If the status is not ADMIN, redirects toward the home
  const router = useRouter();
  // auth context
  const { userStatus } = useContext(AuthContext);

  // useEffect(() => {
  //   if (userStatus !== "ADMIN") {
  //     router.push("/");
  //   }
  // }, []);
  // if (userStatus !== "ADMIN") return <></>;

  // Show or not the video inputs to add a new one
  const [isAddingVideo, setIsAddingVideo] = useState(false);

  return (
    <div className="pt-16 xs:pt-[88px] px-4 sm:px-6">
      <h1 className="text-center text-2xl text-light font-bold">
        Admin's page
      </h1>
      <h2 className="text-xl"> Videos </h2>
      {isAddingVideo ? (
        <VideoInputs />
      ) : (
        <p
          className="text-blue text-end cursor-pointer"
          onClick={() => {
            setIsAddingVideo(true);
          }}
        >
          Add a video
        </p>
      )}
      {videos &&
        videos.map((video) => (
          <VideoLine video={video} key={video.id.toString()} />
        ))}
    </div>
  );
}
