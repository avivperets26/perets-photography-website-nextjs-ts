"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.scrollY / (document.body.offsetHeight - window.innerHeight);
      if (navbarRef.current) {
        navbarRef.current.style.backgroundColor = `rgba(0, 0, 0, ${
          0.4 + (0.6 - scrollPos)
        })`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={navbarRef} className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/gallery">Gallery</Link>
      <Link href="/products">Products</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/about">About</Link>
    </div>
  );
};

export default Navbar;
