import { Video } from "@prisma/client";
import { trpc } from "@server/utils/trpc";
import { videoLink } from "@src/utils/constants";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function VideoId() {
  const router = useRouter();
  const { videoId } = router.query;

  const video: Video | undefined | null = trpc.video.byId.useQuery(
    videoId as string
  ).data;

  console.log(video);

  useEffect(() => {
    if (!video) {
      router.push("/admin");
    }
  }, []);

  return (
    <div className="pt-16 xs:pt-[88px] px-4 sm:px-6">
      <h1 className="text-center text-2xl text-light font-bold my-10">
        Admin's page
      </h1>
      <div className="bg-gray-100 text-gray-900 rounded mx-6 px-4 mb-10 py-10 sm:mx-20 sm:px-10">
        <video controls={true}>
          <source src={videoLink + video?.videoName} />
        </video>
      </div>
    </div>
  );
}
