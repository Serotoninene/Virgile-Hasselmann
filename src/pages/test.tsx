import React from "react";

type Props = {};

export default function Test({}: Props) {
  return (
    <div id="Test">
      <p className="text-center">top</p>
      <p className="fixed bottom-0 text-center">bottom</p>
    </div>
  );
}
