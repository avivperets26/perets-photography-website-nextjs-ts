"use client";

import { useRef, useState } from "react";

import styles from "./WorldMap.module.css";
import PreviewBox from "./PreviewBox";
import countries from "./countries.json";
import Country from "./Country";

interface CountryProps {
  visited: boolean;
  name: string;
  path: string;
}

const WorldMap: React.FC = () => {
  const [hoveredCountry, setHoveredCountry] = useState<CountryProps | null>(
    null
  );
  const [previewPos, setPreviewPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const svgRef = useRef<SVGSVGElement>(null);
  const [lineCoords, setLineCoords] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);

  const handleMouseEnter = (
    country: CountryProps,
    event: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    if (country.visited) {
      const svgRect = svgRef.current?.getBoundingClientRect();
      const bbox = (event.target as SVGPathElement).getBBox();
      const previewWidth = 200; // Assuming a fixed width of the PreviewBox
      const previewHeight = 150; // Assuming a fixed height of the PreviewBox

      // Default position calculations
      let posX = Math.round(
        bbox.x + bbox.width / 2 + (svgRect?.left ?? 0) - previewWidth / 2
      );
      let posY = Math.round(
        bbox.y - bbox.height + (svgRect?.top ?? 0) - previewHeight
      ); // Adjust Y position calculation as needed

      const midX = bbox.x + bbox.width / 2;
      const midY = bbox.y + bbox.height / 2;

      // Adjust if out of viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      console.log(`posX: ${posX}, posY: ${posY}`);
      console.log(
        `viewportWidth: ${viewportWidth}, viewportHeight: ${viewportHeight}`
      );

      // Horizontal adjustments
      if (posX < 100) posX = 200; // Adjust to right if too left
      if (posX + previewWidth > viewportWidth - 100) {
        posX = viewportWidth - previewWidth - 100; // Adjust to left if too right
      }

      // Vertical adjustments
      if (posY < 100) posY = 200; // Adjust below if too high
      if (posY + previewHeight > viewportHeight - 100) {
        posY = viewportHeight - previewHeight - 100; // Adjust above if too low
      }

      const lineX1 = midX + (svgRect?.left ?? 0);
      const lineY1 = midY + (svgRect?.top ?? 0);
      const lineX2 = posX / 2; // Center point of the PreviewBox
      const lineY2 = posY + 75; // Middle of the PreviewBox height

      setLineCoords({ x1: lineX1, y1: lineY1, x2: lineX2, y2: lineY2 });
      setPreviewPos({ x: posX, y: posY });
      setHoveredCountry(country);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
    setLineCoords(null);
  };

  return (
    <section className={styles.worldMap}>
      <h2 className={styles.title}>Explore the World</h2>
      <div className={styles.mapContainer}>
        <svg
          className={styles.mapSvg}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="0 0 1008 651"
        >
          {countries.map((country) => (
            <Country
              key={country.name}
              country={country}
              onHover={(e) => handleMouseEnter(country, e)}
              onLeave={handleMouseLeave}
            />
          ))}
          {lineCoords && (
            <line
              x1={lineCoords.x1}
              y1={lineCoords.y1}
              x2={lineCoords.x2}
              y2={lineCoords.y2}
              stroke="white"
              strokeWidth="1"
            />
          )}
        </svg>
        {hoveredCountry && (
          <PreviewBox
            name={hoveredCountry.name}
            photos={[
              "/images/1928-Enhanced-SR.jpg",
              "/images/834-Enhanced-SR.jpg",
              "/images/2444-Enhanced-SR.jpg",
            ]}
            position={previewPos}
          />
        )}
      </div>
    </section>
  );
};

export default WorldMap;
