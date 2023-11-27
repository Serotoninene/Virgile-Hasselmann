import React from "react";

type Props = {
  loadingProgress: number;
};

const Loader = ({ loadingProgress }: Props) => {
  return (
    <div className="h-[calc(var(--vh)*100)] flex justify-center items-center">
      Loader
    </div>
  );
};

export default Loader;
