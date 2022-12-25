import React from "react";

type Props = {};

export default function Test({}: Props) {
  return (
    <div className="bg-slate-700 h-[100vh]">
      <p className="text-center">top</p>
      <p className="absolute bottom-0 text-center">bottom</p>
    </div>
  );
}
