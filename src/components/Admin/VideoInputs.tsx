import React, { FormEvent, useState } from "react";
// trpc
import { trpc } from "@server/utils/trpc";
// Types
import { Video, Vid_Category } from "@prisma/client";
import { uploadImage, uploadVideo } from "@src/pages/api/upload-image";

interface Props {
  data?: Video;
}

const VideoInputs = ({ data }: Props) => {
  // filters Id for default vid_categoryId
  const filters: Vid_Category[] | undefined = trpc.vidCat.list.useQuery().data;
  // inputs
  const [title, setTitle] = useState<string>(data ? data.title : "");
  const [dateOfCreation, setDateOfCreation] = useState<Date>(
    data ? data.dateOfCreation : new Date("1994-08-01")
  );
  const [video, setVideo] = useState<File>();
  const [placeholder_hq, setPlaceholder_hq] = useState<File>();
  const [vid_CategoryId, setvid_CategoryID] = useState<bigint>(
    data ? data.vid_CategoryId : BigInt(1)
  );

  // trpc  API routes
  const updateVideo = trpc.video.update.useMutation();
  const createVideo = trpc.video.create.useMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!placeholder_hq || !video) return;

    await uploadImage(placeholder_hq);
    await uploadVideo(video);

    // if (data) {
    //   updateVideo.mutate({
    //     id: data.id,
    //     title,
    //     dateOfCreation,
    //     videoName,
    //     placeholder_hq,
    //     vid_CategoryId,
    //   });
    // } else {

    createVideo.mutate({
      title,
      dateOfCreation,
      videoName: video.name,
      placeholder_hq: placeholder_hq.name,
      vid_CategoryId,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="date"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={dateOfCreation.toISOString().split("T")[0]}
        onChange={(e) => setDateOfCreation(new Date(e.target.value))}
      />
      <input
        type="file"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        onChange={(e) => setVideo(e.currentTarget.files![0])}
        placeholder="Name of the data"
      />
      <input
        type="file"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        onChange={(e) => setPlaceholder_hq(e.currentTarget.files![0])}
        placeholder="Placeholder HQ"
      />
      <select
        value={Number(vid_CategoryId)}
        onChange={(e) => setvid_CategoryID(BigInt(e.target.value))}
      >
        {filters &&
          filters.map((filter, idx) => (
            <option key={idx} value={Number(filter.id)}>
              {filter.name}
            </option>
          ))}
      </select>
      <button> go !</button>
    </form>
  );
};

export default VideoInputs;
