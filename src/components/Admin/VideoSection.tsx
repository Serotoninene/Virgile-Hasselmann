import React, { useState } from "react";
import { Video } from "@prisma/client";
import { trpc } from "@server/utils/trpc";
import VideoInputs from "./VideoInputs";

type Props = {
  videos: Video[];
};

interface VideoLineProps {
  video: Video;
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

export default function VideoSection({ videos }: Props) {
  // Show or not the video inputs to add a new one
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  return (
    <div className="relative">
      <h2 className="text-xl"> Videos </h2>
      {isAddingVideo ? (
        <VideoInputs />
      ) : (
        <p
          className="text-blue text-end cursor-pointer absolute top-0 right-0"
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
