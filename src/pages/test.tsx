import dynamic from "next/dynamic";
import React, { useEffect } from "react";

type Props = {};

const PDFVIEW = dynamic(() => import("@components/Admin/Test/PDFView"), {
  ssr: false,
});

export default function Test({}: Props) {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div id="Test" className="p-16 h-screen w-screen">
      HELLOOOW
      <PDFVIEW />
    </div>
  );
}
