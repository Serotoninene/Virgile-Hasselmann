import React, { FormEvent, useState } from "react";
// Api
import { trpc } from "@server/utils/trpc";
import { uploadImage, uploadVideo } from "@src/pages/api/upload-image";
// Types
import { Video } from "@prisma/client";

interface Props {
  data?: Video;
}

const VideoInputs = ({ data }: Props) => {
  // inputs
  const [title, setTitle] = useState<string>(data ? data.title : "");
  const [dateOfCreation, setDateOfCreation] = useState<Date>(
    data ? data.dateOfCreation : new Date("1994-08-01")
  );
  const [video, setVideo] = useState<File>();
  const [placeholder_hq, setPlaceholder_hq] = useState<File>();
  const [isSecret, setIsSecret] = useState<boolean>(false);

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
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
      <input
        id="title"
        type="text"
        className="p-1 bg-transparent outline-none border border-light text-light"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <div className="flex justify-between">
        <div className="titleContainer flex items-center gap-4">
          <label htmlFor="date">Date of Creation</label>
          <input
            id="date"
            type="date"
            className="p-1 bg-transparent outline-none border border-light text-light"
            value={dateOfCreation.toISOString().split("T")[0]}
            onChange={(e) => setDateOfCreation(new Date(e.target.value))}
          />
        </div>

        <div className="VideoContainer flex items-center gap-4">
          <label htmlFor="video"> Video</label>
          <input
            id="video"
            type="file"
            className="p-1 bg-transparent outline-none border border-light text-light"
            onChange={(e) => setVideo(e.currentTarget.files![0])}
            placeholder="Name of the data"
          />
        </div>
      </div>
      <div className="placeholderContainer flex items-center self-center gap-4">
        <label htmlFor="placeholder">Placeholder</label>
        <input
          id="placeholder"
          type="file"
          className="p-1 bg-transparent outline-none border border-light text-light"
          onChange={(e) => setPlaceholder_hq(e.currentTarget.files![0])}
          placeholder="Placeholder HQ"
        />
      </div>
      <div className="flex justify-between">
        <div className="placeholderContainer flex items-center gap-4">
          <label htmlFor="secret"> Secret ? </label>
          <input
            type="checkbox"
            id="secret"
            checked={isSecret}
            onChange={(e) => setIsSecret(e.target.checked)}
          />
        </div>
        <button className="ml-16 border border-light p-1 rounded-sm">
          go !
        </button>
      </div>
    </form>
  );
};

export default VideoInputs;
