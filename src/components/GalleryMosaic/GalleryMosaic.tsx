"use client";

import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import styles from "./GalleryMosaic.module.css";
import { fetchImagesFromStorage } from "@/lib/imageService";
import { useInView } from "react-intersection-observer";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const GalleryMosaic = () => {
  const [images, setImages] = useState<
    {
      src: string;
      alt: string;
      background: string;
      width: number;
      height: number;
      loaded: boolean;
    }[]
  >([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView(); // Add 'inView' to the destructured array
  const addImage = (newImage: {
    src: string;
    alt: string;
    background: string;
    width: number;
    height: number;
    loaded: boolean;
  }) => {
    setImages((prevImages) => [...prevImages, { ...newImage, loaded: false }]);
  };

  const fetchImages = async (page: number) => {
    const newImages = await fetchImagesFromStorage(page);
    if (newImages.length > 0) {
      newImages.forEach((newImage) => {
        const imageWithLoaded = { ...newImage, loaded: false };
        addImage(imageWithLoaded);
      });
    } else {
      setHasMore(false);
    }
  };

  // ...

  useEffect(() => {
    if (inView && hasMore) {
      fetchImages(page);
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  const handleImageLoad = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index].loaded = true;
      return newImages;
    });
  };

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.imageWrapper}
            style={{
              backgroundColor: image.loaded ? "transparent" : image.background,
              paddingBottom: `${(image.height / image.width) * 100}%`,
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              className={styles.image}
              onLoad={() => handleImageLoad(index)}
              priority={index < 6} // Adding priority to the first 6 images
              style={{ opacity: image.loaded ? 1 : 0 }}
            />
          </div>
        ))}
      </Masonry>
      <div ref={ref} />
    </div>
  );
};

export default GalleryMosaic;
