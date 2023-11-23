import React, { useState } from "react";
import Image from "next/image";

import { Video } from "@prisma/client";
import { trpc } from "@server/utils/trpc";

import VideoInputs from "./VideoInputs";
import Link from "next/link";

type Props = {
  videos: Video[];
};

interface VideoLineProps {
  video: Video;
}

const VideoLine = ({ video }: VideoLineProps) => {
  const deleteVideo = trpc.video.delete.useMutation();

  const handleDelete = async () => {
    deleteVideo.mutate(video.id, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

  return (
    <li
      key={video.id}
      className="inline-flex flex-col text-center lg:w-auto my-4"
    >
      <div className="group relative">
        <div className="relative w-full aspect-square overflow-hidden rounded-md bg-gray-200 ">
          <Image
            src={process.env.NEXT_PUBLIC_PHOTOS + video.placeholder_hq}
            alt={video.title}
            layout="fill"
            className="object-cover object-center"
          />
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            {video.dateOfCreation.toDateString()}
          </p>
          <h3 className="mt-1 font-semibold text-gray-900">{video.title}</h3>
          <div className="mt-1 flex flex-1 items-end justify-center gap-4 text-blue">
            <Link href={`/admin/${video.id}`}>
              <button
                type="button"
                className="text-sm font-medium hover:text-indigo-500"
              >
                Mettre à jour
              </button>
            </Link>
            <button
              type="button"
              className="text-sm font-medium hover:text-indigo-500"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function VideoSection({ videos }: Props) {
  // Show or not the video inputs to add a new one
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  return (
    <div className="relative mt-10">
      {isAddingVideo ? (
        <VideoInputs />
      ) : (
        <button
          className="text-white rounded bg-blue px-4 py-2 hover:bg-indigo-400 mb-10"
          onClick={() => {
            setIsAddingVideo(true);
          }}
        >
          Add a video
        </button>
      )}
      <section>
        <ul className="grid grid-cols-1 pb-10 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {videos &&
            videos.map((video) => (
              <VideoLine video={video} key={video.id.toString()} />
            ))}
        </ul>
      </section>
    </div>
  );
}
