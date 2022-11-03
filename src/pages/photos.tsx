import React, { useEffect, useState } from "react";
// server | Types
import { trpc } from "@server/utils/trpc";
import { Photo, Photo_Category } from "@prisma/client";
// Components
import PhotosFooter from "@src/components/Photos/PhotosFooter";
import AnimatedPhoto from "@src/components/Photos/AnimatedPhoto";

export default function photos() {
  // Getting all the datas, photos and filters(/ that I'll call categories for more complexity ...)
  const photosData: Photo[] | undefined = trpc.photo.list.useQuery().data;
  const filters: Photo_Category[] | undefined =
    trpc.photoCat.list.useQuery().data;
  if (!photosData || !filters) return <>Loading</>; // while the data's loading, returns loading hihi

  const [isOverview, setIsOverview] = useState(false); // if overview's true -> shows the overview nav bar (to be made)
  const [category, setCategory] = useState(filters[0].name); // manage the category selected, for now : "Artistiques" and "Professionnelles"

  const [photoIdx, setPhotoIdx] = useState(0);
  const [photoDisplayed, setPhotoDisplayed] = useState(
    photosData[photoIdx].photoName
  );

  const handleClick = () => {
    if (photoIdx < photosData.length - 1) {
      setPhotoIdx(photoIdx + 1);
    } else {
      setPhotoIdx(0);
    }
  };

  useEffect(() => {
    setPhotoDisplayed(photosData[photoIdx].photoName);
  }, [photoIdx]);

  return (
    <div
      className="h-screen pt-12 px-2 flex flex-col justify-between relative sm:px-6"
      onClick={handleClick}
    >
      <div className="absolute opacity-0 h-0 overflow-hidden"></div>
      <div className="h-full relative overflow-hidden flex items-start sm:items-center">
        <AnimatedPhoto photoDisplayed={photoDisplayed} />
      </div>
      <PhotosFooter
        category={category}
        photoIdx={photoIdx}
        photosLength={photos.length}
        isOverview={isOverview}
        setIsOverview={setIsOverview}
        filters={filters}
        setCategory={setCategory}
      />
    </div>
  );
}
