// src/app/gallery/page.tsx
import dynamic from "next/dynamic";
import React from "react";

const GalleryMosaic = dynamic(
  () => import("@/components/GalleryMosaic/GalleryMosaic"),
  { ssr: false }
);

const GalleryPage = () => {
  return (
    <div>
      <h1>Gallery</h1>
      <GalleryMosaic />
    </div>
  );
};

export default GalleryPage;
