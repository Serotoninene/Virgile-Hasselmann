import React, { useEffect, useState, WheelEvent } from "react";
// server | Types
import { trpc } from "@server/utils/trpc";
import { Photo, Photo_Category } from "@prisma/client";
// Components
import PhotosFooter from "@components/Photos/PhotosFooter";
import AnimatedPhoto from "@components/Photos/AnimatedPhoto";
import Overview from "@src/components/Photos/Overview";

export default function Photos() {
  // Getting all the datas, photos and filters(/ that I'll call categories for more complexity ...)
  const photosData: Photo[] | undefined = trpc.photo.list.useQuery().data;

  const [wheelDirection, setWheelDirection] = useState("");
  const [isOverview, setIsOverview] = useState(false); // if overview's true -> shows the overview nav bar (to be made)

  // Init the data to display with the photos of the first category
  const [displayedPhotoIdx, setDisplayedPhotoIdx] = useState(0); // idx of the photo displayed
  const [photoDisplayed, setPhotoDisplayed] = useState(""); // photo displayed among the dataSelected

  // Here we'll push all the data fetched by api into the states
  useEffect(() => {
    if (photosData) {
      setPhotoDisplayed(photosData[displayedPhotoIdx].photoName);
    }
  }, [photosData]);

  // Changing the photoDisplayed every time the photoIdx changes
  useEffect(() => {
    photosData && setPhotoDisplayed(photosData[displayedPhotoIdx]?.photoName);
  }, [displayedPhotoIdx]);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    // if not wheeling enough : no effect
    const threshold = 50;
    if (Math.abs(e.deltaY) !== threshold) return;
    // if overview triggered : no effect
    if (isOverview) return;

    if (e.deltaY > 0) {
      setWheelDirection("down");
      displayedPhotoIdx < photosData!.length - 1
        ? setDisplayedPhotoIdx(displayedPhotoIdx + 1)
        : setDisplayedPhotoIdx(0);
    } else {
      setWheelDirection("up");
      displayedPhotoIdx > 0
        ? setDisplayedPhotoIdx(displayedPhotoIdx - 1)
        : setDisplayedPhotoIdx(photosData!.length - 1);
    }
  };

  if (!photosData) return <>Loading</>; // while the data's loading, returns loading

  return (
    <div
      className="h-screen pt-4 px-2 flex flex-col justify-between relative sm:px-6"
      onWheel={handleWheel}
    >
      <div className="h-full relative overflow-hidden flex items-start sm:items-center">
        <AnimatedPhoto
          isOverview={isOverview}
          wheelDirection={wheelDirection}
          photoDisplayed={photoDisplayed}
        />

        <Overview
          isOverview={isOverview}
          photos={photosData}
          displayedPhotoIdx={displayedPhotoIdx}
          setDisplayedPhotoIdx={setDisplayedPhotoIdx}
        />
      </div>
      <PhotosFooter
        displayedPhotoIdx={displayedPhotoIdx}
        photosLength={photosData?.length}
        isOverview={isOverview}
        setIsOverview={setIsOverview}
      />
    </div>
  );
}
