"use client";

import { useState } from "react";
import Country from "./Country";
import styles from "./WorldMap.module.css";
import PreviewBox from "./PreviewBox";
import countries from "./countries.json";
interface CountryProps {
  countryName: string;
  photos: string[];
  path: string;
  onMouseEnter: (data: any) => any;
  onMouseLeave?: (data: any) => any;
}

const WorldMap = () => {
  const [hovered, setHovered] = useState(false);
  const [visitedCountry, setVisitedCountry] = useState(null);

  const handleMouseEnter = (data: any) => {
    setHovered(true);
    console.log(data);
    if (data.visited) {
      setVisitedCountry(data);
    }
  };

  const handleMouseLeave = (data: any) => {
    setHovered(false);
    if (data.visited) {
      setVisitedCountry(null);
    }
  };

  return (
    <section className={styles.worldMap}>
      <h2 className={styles.title}>Explore the World</h2>
      <div className={styles.mapContainer}>
        {hovered && visitedCountry && (
          <PreviewBox
            countryName={visitedCountry}
            photos={[
              "/images/1928-Enhanced-SR.jpg",
              "/images/834-Enhanced-SR.jpg",
              "/images/2444-Enhanced-SR.jpg",
            ]}
            positionClass={styles.previewPosition}
          />
        )}

        <svg
          className={styles.mapSvg}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="0 0 1008 651"
        >
          {countries.map((country) => (
            <Country
              key={country.countryName}
              onMouseEnter={(data) => handleMouseEnter(data)}
              onMouseLeave={(data) => handleMouseLeave(data)}
              {...country}
            />
          ))}
        </svg>
      </div>
    </section>
  );
};

export default WorldMap;
