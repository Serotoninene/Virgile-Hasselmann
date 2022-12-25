import React from "react";

type Props = {};

export default function Test({}: Props) {
  return (
    <div id="Test" className="bg-slate-800 h-screen">
      <p className="text-center">top</p>
      <p className="fixed bottom-0 text-center">bottom</p>
    </div>
  );
}
