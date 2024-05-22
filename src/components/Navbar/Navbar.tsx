"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebaseConfig";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.scrollY / (document.body.offsetHeight - window.innerHeight);
      const opacity = 0.5 + (0.5 - scrollPos);
      if (navbarRef.current) {
        navbarRef.current.style.backgroundColor = `rgba(0, 0, 0, ${Math.max(
          opacity,
          0.5
        )})`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navbarRef} className={styles.navbar}>
      <div className={styles.navbarLinks}>
        <Link href="/">Home</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/about">About</Link>
      </div>
      <div className={styles.navbarActions}>
        {user ? (
          <button onClick={handleSignOut} className={styles.signoutButton}>
            Sign Out
          </button>
        ) : (
          <Link href="/auth" className={styles.signinButton}>
            Sign In
          </Link>
        )}
        <div className={styles.cartIcon}>
          <Link href="/cart">
            <Image src="/icons/cartSvg.svg" alt="Cart" width={30} height={30} />
            <span className={styles.cartcount}>0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
