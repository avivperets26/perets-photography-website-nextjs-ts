// src/components/GalleryMosaic/GalleryMosaic.tsx
"use client";

import React, { useEffect, useState, Suspense } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import styles from "./GalleryMosaic.module.css";
import { fetchImagesFromStorage } from "@/lib/imageService";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const GalleryMosaic = () => {
  const [images, setImages] = useState<
    { src: string; alt: string; background: string }[]
  >([]);

  useEffect(() => {
    const addImage = (image: {
      src: string;
      alt: string;
      background: string;
    }) => {
      setImages((prevImages) => [...prevImages, image]);
    };

    const fetchImages = async () => {
      const unsubscribe = await fetchImagesFromStorage(addImage);
      return unsubscribe;
    };

    const unsubscribePromise = fetchImages();

    return () => {
      unsubscribePromise.then((unsubscribe) => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, []);

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
      >
        {images.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <Image
              src={image.src}
              alt={image.alt}
              layout="responsive"
              width={500}
              height={300}
              loading="lazy"
              blurDataURL={image.background}
              placeholder="blur"
              className={styles.image}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default GalleryMosaic;
