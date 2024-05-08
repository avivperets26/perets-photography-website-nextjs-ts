// Header.tsx
"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.scrollY / (document.body.offsetHeight - window.innerHeight);
      if (headerRef.current) {
        (headerRef.current as HTMLDivElement).style.opacity = `${
          1 - scrollPos
        }`;
        (headerRef.current as HTMLDivElement).style.transform = `scale(${
          1 + scrollPos
        })`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={headerRef} className={styles.header}>
      <h1>CSS-only scroll-driver animation are</h1>
      <p>asdasdasdasdasdadasdasd sdasfaafdasfasfas asdasdasdasd</p>
      <p>asdasdasdasdasdadasdasd sdasfaafdasfasfas asdasdasdasd</p>
    </div>
  );
};

export default Header;
