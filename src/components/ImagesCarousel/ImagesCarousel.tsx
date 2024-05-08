"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ImagesCarousel.module.css";

const ImagesCarousel: React.FC<{
  images: string[];
  direction: "right" | "left";
}> = ({ images, direction }) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (listRef.current) listRef.current.style.animationPlayState = "paused";
    };
    const handleMouseLeave = () => {
      if (listRef.current) listRef.current.style.animationPlayState = "running";
    };

    const currentListRef = listRef.current;
    currentListRef?.addEventListener("mouseenter", handleMouseEnter);
    currentListRef?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      currentListRef?.removeEventListener("mouseenter", handleMouseEnter);
      currentListRef?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const animationDirection = direction === "right" ? "normal" : "reverse";

  return (
    <div className={styles.carouselContainer}>
      <ul
        ref={listRef}
        className={styles.imagesCarousel}
        style={{ animationDirection }}
      >
        {images.concat(images).map((image, index) => (
          <li key={index}>
            <Image src={image} alt="Nature image" width={200} height={200} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImagesCarousel;
