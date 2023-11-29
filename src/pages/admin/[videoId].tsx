import React from "react";
import { useRouter } from "next/router";
import { Video } from "@prisma/client";
import { trpc } from "@server/utils/trpc";

import { photoLink } from "@src/contexts/store";
import VideoInputs from "@src/components/Admin/VideoInputs";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface Options {
  year: string;
  month: string;
  day: string;
}

export const formatDate = (dateString: Date | undefined) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = dateString && new Date(dateString);
  return date?.toLocaleDateString("fr-FR", options);
};

export default function VideoId() {
  const router = useRouter();
  const { videoId } = router.query;
  // const memoVideoId = React.useMemo(() => videoId, [videoId]);

  // trpc  API routes
  const video: Video | undefined | null = trpc.video.byId.useQuery(
    videoId as string,
    {
      refetchOnWindowFocus: false,
    }
  ).data;

  const memoVideo = React.useMemo<Video | undefined>(
    () => (video ? video : undefined),
    [video]
  );

  if (!video)
    return (
      <div className="flex justify-center items-center h-screen">Loading</div>
    );

  return (
    <div className="pt-16 xs:pt-[88px] px-4 sm:px-6">
      <div className="bg-white m-6 ">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <Link href="/admin">
              <div className="mt-4 flex items-center cursor-pointer">
                <ArrowLeftIcon
                  className="h-10 w-10 text-dark mr-4"
                  aria-hidden="true"
                />
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {video?.title}
                </h1>
              </div>
            </Link>

            <section aria-labelledby="information-heading" className="mt-4">
              <p className="text-lg text-gray-900 sm:text-xl">
                {formatDate(video?.dateOfCreation)}
              </p>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{video.description}</p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <img
                src={photoLink + "/" + video.placeholder_hq}
                alt={video.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
              <VideoInputs video={memoVideo} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
