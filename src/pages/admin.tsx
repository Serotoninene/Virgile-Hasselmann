import React, { useContext, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import classNames from "@src/utils";
// Context
import { AuthContext } from "@src/contexts/AuthProvider";
// Prisma
import { prisma } from "@server/prisma";
import { Photo, Video } from "@prisma/client";
// Component
import VideoSection from "@src/components/Admin/VideoSection";
import PhotoInputs from "@src/components/Admin/PhotoInputs";
import PhotoSection from "@src/components/Admin/PhotoSection";

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
  const [currentTab, setCurrentTab] = useState("Video");
  // If the status is not ADMIN, redirects toward the home
  const router = useRouter();
  // auth context
  const { userStatus } = useContext(AuthContext);

  useEffect(() => {
    if (userStatus !== "ADMIN") {
      router.push("/");
    }
  }, []);

  const tabs = ["Video", "Photo"];

  return (
    <div className="pt-16 xs:pt-[88px] px-4 sm:px-6">
      <h1 className="text-center text-2xl text-light font-bold my-10">
        Admin's page
      </h1>
      <div className="bg-gray-100 text-gray-900 rounded mx-6 px-4 sm:mx-20 sm:px-10">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block rounded-md text-gray-900 border-gray-300 py-2 px-8 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={currentTab}
            onChange={(e) => {
              setCurrentTab(e.target.value);
            }}
          >
            {tabs.map((tab) => (
              <option key={tab} value={tab}>
                {tab}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden  sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={classNames(
                    currentTab === tab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-900 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 py-4 px-1 text-xl font-medium"
                  )}
                  aria-current={currentTab ? "page" : undefined}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>
        {currentTab === "Photo" ? (
          <PhotoSection photos={photos} />
        ) : (
          <VideoSection videos={videos} />
        )}
      </div>
    </div>
  );
}
