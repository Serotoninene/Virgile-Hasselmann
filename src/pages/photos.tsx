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
  const [category, setCategory] = useState<Photo_Category>(filters[0]); // manage the category selected, for now : "Artistiques" and "Professionnelles"

  // Init the data to display with the photos of the first category
  const [dataSelected, setDataSelected] = useState<Photo[]>(
    photosData.filter((photo) => photo.photo_CategoryId === category.id)
  );
  const [photoIdx, setPhotoIdx] = useState(0);
  const [photoDisplayed, setPhotoDisplayed] = useState(
    photosData[photoIdx].photoName
  );

  const handleClick = () => {
    if (photoIdx < dataSelected.length - 1) {
      setPhotoIdx(photoIdx + 1);
    } else {
      setPhotoIdx(0);
    }
  };

  // Changing the photoDisplayed every time the photoIdx changes
  useEffect(() => {
    setPhotoDisplayed(dataSelected[photoIdx].photoName);
  }, [photoIdx]);

  // changing the data to display when new filter selected
  useEffect(() => {
    const dataToDisplay = photosData.filter(
      (photo) => photo.photo_CategoryId === category.id
    );
    setPhotoIdx(0);
    setDataSelected(dataToDisplay);
  }, [category]);

  return (
    <div
      className="h-screen pt-12 px-2 flex flex-col justify-between relative sm:px-6"
      onClick={handleClick}
    >
      <div className="h-full relative overflow-hidden flex items-start sm:items-center">
        <AnimatedPhoto photoDisplayed={photoDisplayed} />
      </div>
      <PhotosFooter
        category={category.name}
        photoIdx={photoIdx}
        photosLength={dataSelected.length}
        isOverview={isOverview}
        setIsOverview={setIsOverview}
        filters={filters}
        setCategory={setCategory}
      />
    </div>
  );
}
