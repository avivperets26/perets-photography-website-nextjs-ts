// Header.tsx
"use client";
// HeroHeader.tsx
import React, { useEffect, useRef } from "react";
import styles from "./HeroHeader.module.css";
import Link from "next/link";

const HeroHeader: React.FC = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY / window.innerHeight;
      if (headerRef.current) {
        (headerRef.current as HTMLDivElement).style.opacity = `${Math.max(
          0,
          1 - scrollPos
        )}`;
        (
          headerRef.current as HTMLDivElement
        ).style.transform = `scale(${Math.max(1, 1 + scrollPos)})`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={headerRef} className={styles.heroHeader}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Explore the World through My Lens</h1>
        <p className={styles.subtitle}>
          Nature, Landscapes, Animals, and Cities from around the world
        </p>
        <Link href="#feature" className={styles.cta}>
          See My Work
        </Link>
      </div>
    </header>
  );
};

export default HeroHeader;
