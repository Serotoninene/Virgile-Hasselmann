import React, { useEffect, useState, WheelEvent } from "react";
// server | Types
import { trpc } from "@server/utils/trpc";
import { Photo, Photo_Category } from "@prisma/client";
// Custom hooks
import useDebounce from "@hooks/useDebounce";
// Components
import PhotosFooter from "@components/Photos/PhotosFooter";
import AnimatedPhoto from "@components/Photos/AnimatedPhoto";
import Overview from "@src/components/Photos/Overview";

export default function Photos() {
  // Getting all the datas, photos and filters(/ that I'll call categories for more complexity ...)
  const photosData: Photo[] | undefined = trpc.photo.list.useQuery().data;
  const filters: Photo_Category[] | undefined =
    trpc.photoCat.list.useQuery().data;

  const [wheelDirection, setWheelDirection] = useState("");
  const [isOverview, setIsOverview] = useState(false); // if overview's true -> shows the overview nav bar (to be made)
  const [category, setCategory] = useState<Photo_Category>(); // manage the category selected, for now : "Artistiques" and "Professionnelles"

  // Init the data to display with the photos of the first category
  const [displayedPhotoIdx, setDisplayedPhotoIdx] = useState(0); // idx of the photo displayed
  const { debouncedValue, setDebounce } = useDebounce(displayedPhotoIdx, 500);

  const [photoDisplayed, setPhotoDisplayed] = useState(""); // photo displayed among the dataSelected
  const [dataSelected, setDataSelected] = useState<Photo[]>(); // photos from the category selected

  // Here we'll push all the data fetched by api into the states
  useEffect(() => {
    if (photosData && filters) {
      setCategory(filters[0]);
      setPhotoDisplayed(photosData[displayedPhotoIdx].photoName);
    }
  }, [photosData, filters]);

  // Changing the photoDisplayed every time the photoIdx changes
  useEffect(() => {
    dataSelected &&
      setPhotoDisplayed(dataSelected[displayedPhotoIdx].photoName);
  }, [displayedPhotoIdx]);

  // changing the data to display when new filter selected
  useEffect(() => {
    const dataToDisplay = photosData?.filter(
      (photo) => photo.photo_CategoryId === category?.id
    );
    setDisplayedPhotoIdx(0);
    setDataSelected(dataToDisplay);
  }, [category]);

  const setDebouncedIdx = (value: number) => {
    setDebounce(value);
    setDisplayedPhotoIdx(debouncedValue);
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    // if not wheeling enough : no effect
    const threshold = 50;
    if (Math.abs(e.deltaY) < threshold) return;

    // if overview triggered : no effect
    if (isOverview) return;

    if (e.deltaY > 0) {
      setWheelDirection("down");
      displayedPhotoIdx < dataSelected!.length - 1
        ? setDebouncedIdx(displayedPhotoIdx + 1)
        : setDebouncedIdx(0);
    } else {
      setWheelDirection("up");
      displayedPhotoIdx > 0
        ? setDebouncedIdx(displayedPhotoIdx - 1)
        : setDebouncedIdx(dataSelected!.length - 1);
    }
  };

  if (!photosData || !filters) return <>Loading</>; // while the data's loading, returns loading

  return (
    <div
      className="h-screen pt-12 px-2 flex flex-col justify-between relative sm:px-6"
      onWheel={(e) => {
        handleWheel(e);
      }}
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
        category={category?.name}
        displayedPhotoIdx={displayedPhotoIdx}
        photosLength={dataSelected?.length}
        isOverview={isOverview}
        setIsOverview={setIsOverview}
        filters={filters}
        setCategory={setCategory}
      />
    </div>
  );
}
