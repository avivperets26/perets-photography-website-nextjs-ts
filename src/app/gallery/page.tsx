// src/app/gallery/page.tsx
import dynamic from "next/dynamic";
import React from "react";
import styles from "./galleryPage.module.css";
const GalleryMosaic = dynamic(
  () => import("@/components/GalleryMosaic/GalleryMosaic"),
  { ssr: false }
);

const GalleryPage = () => {
  return (
    <div className={styles.GalleryPageContainer}>
      <h1>Gallery</h1>
      <GalleryMosaic />
    </div>
  );
};

export default GalleryPage;
