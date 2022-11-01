import React, { useState } from "react";
// trpc
import { trpc } from "@server/utils/trpc";
// Types
import { Video, Vid_Category } from "@prisma/client";

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
  const [videoName, setVideoName] = useState<string>(
    data ? data.videoName : ""
  );
  const [placeholder_lq, setPlaceholder_lq] = useState<string | undefined>(
    data && data.placeholder_lq ? data.placeholder_lq : undefined
  );
  const [placeholder_hq, setPlaceholder_hq] = useState<string>(
    data ? data.placeholder_hq : ""
  );
  const [vid_CategoryId, setvid_CategoryID] = useState<bigint>(
    data ? data.vid_CategoryId : BigInt(1)
  );
  const updateVideo = trpc.video.update.useMutation();
  const createVideo = trpc.video.create.useMutation();

  const handleSubmit = () => {
    if (data) {
      updateVideo.mutate({
        id: data.id,
        title,
        dateOfCreation,
        videoName,
        placeholder_lq,
        placeholder_hq,
        vid_CategoryId,
      });
    } else {
      createVideo.mutate({
        title,
        dateOfCreation,
        videoName,
        placeholder_lq,
        placeholder_hq,
        vid_CategoryId,
      });
    }
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
        type="text"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={videoName}
        onChange={(e) => setVideoName(e.target.value)}
        placeholder="Name of the data"
      />
      <input
        type="text"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={placeholder_lq}
        onChange={(e) => setPlaceholder_lq(e.target.value)}
        placeholder="Placeholder LQ"
      />
      <input
        type="text"
        className="mb-4 p-1 bg-transparent outline-none border border-light text-light"
        value={placeholder_hq}
        onChange={(e) => setPlaceholder_hq(e.target.value)}
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
