import React, { useEffect, useState, WheelEvent } from "react";
// server | Types
import { trpc } from "@server/utils/trpc";
import { Photo, Photo_Category } from "@prisma/client";
// Custom hooks
import useDebounce from "@hooks/useDebounce";
// Components
import PhotosFooter from "@components/Photos/PhotosFooter";
import AnimatedPhoto from "@components/Photos/AnimatedPhoto";

export default function photos() {
  // Getting all the datas, photos and filters(/ that I'll call categories for more complexity ...)
  const photosData: Photo[] | undefined = trpc.photo.list.useQuery().data;
  const filters: Photo_Category[] | undefined =
    trpc.photoCat.list.useQuery().data;

  const [isOverview, setIsOverview] = useState(false); // if overview's true -> shows the overview nav bar (to be made)
  const [category, setCategory] = useState<Photo_Category>(); // manage the category selected, for now : "Artistiques" and "Professionnelles"

  // Init the data to display with the photos of the first category
  const [photoIdx, setPhotoIdx] = useState(0);
  const { debouncedValue, setDebounce } = useDebounce(photoIdx, 900);

  const [photoDisplayed, setPhotoDisplayed] = useState("");
  const [dataSelected, setDataSelected] = useState<Photo[]>();

  // Here we'll push all the data fetched by api into the states
  useEffect(() => {
    if (photosData && filters) {
      setCategory(filters[0]);
      setPhotoDisplayed(photosData[photoIdx].photoName);
    }
  }, [photosData, filters]);

  // Changing the photoDisplayed every time the photoIdx changes
  useEffect(() => {
    dataSelected && setPhotoDisplayed(dataSelected[photoIdx].photoName);
  }, [photoIdx]);

  // changing the data to display when new filter selected
  useEffect(() => {
    const dataToDisplay = photosData?.filter(
      (photo) => photo.photo_CategoryId === category?.id
    );
    setPhotoIdx(0);
    setDataSelected(dataToDisplay);
  }, [category]);

  const handleClick = () => {
    if (photoIdx < dataSelected!.length - 1) {
      setPhotoIdx(photoIdx + 1);
    } else {
      setPhotoIdx(0);
    }
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      if (photoIdx < dataSelected!.length - 1) {
        setDebounce(photoIdx + 1);
        setPhotoIdx(debouncedValue);
      } else {
        setDebounce(0);
        setPhotoIdx(debouncedValue);
      }
    } else {
      if (photoIdx > 0) {
        setDebounce(photoIdx - 1);
        setPhotoIdx(debouncedValue);
      } else {
        setDebounce(dataSelected!.length - 1);
        setPhotoIdx(debouncedValue);
      }
    }
  };

  if (!photosData || !filters) return <>Loading</>; // while the data's loading, returns loading hihi

  return (
    <div
      className="h-screen pt-12 px-2 flex flex-col justify-between relative sm:px-6"
      onWheel={(e) => {
        handleWheel(e);
      }}
    >
      <div className="h-full relative overflow-hidden flex items-start sm:items-center">
        <AnimatedPhoto photoDisplayed={photoDisplayed} />
      </div>
      <PhotosFooter
        category={category?.name}
        photoIdx={photoIdx}
        photosLength={dataSelected?.length}
        isOverview={isOverview}
        setIsOverview={setIsOverview}
        filters={filters}
        setCategory={setCategory}
      />
    </div>
  );
}
