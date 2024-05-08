import styles from "./Feature.module.css";
import ImagesCarousel from "../ImagesCarousel/ImagesCarousel";

const Feature = () => {
  const natureImages = [
    "/images/834-Enhanced-SR.jpg",
    "/images/1928-Enhanced-SR.jpg",
    "/images/2444-Enhanced-SR.jpg",
    "/images/DJI_0077-Enhanced-SR.jpg",
    "/images/DJI_0135-Enhanced-SR.jpg",
    "/images/DJI_0337-aviv-Enhanced-SR.jpg",
    "/images/DJI_0359-Aviv-Enhanced-SR.jpg",
    "/images/DJI_0402-Aviv-Enhanced-SR.jpg",
    "/images/DJI_0586-Aviv-Enhanced-SR.jpg",
    "/images/DSC00394-Enhanced-SR.jpg",
    "/images/DSC05677-Aviv-Enhanced-SR.jpg",
    "/images/DSC04114.jpg",
    "/images/DSC07821-Enhanced-SR.jpg",
    "/images/zin.jpg",
  ];
  return (
    <section className={styles.feature}>
      <h2 className={styles.title}>Unique Photography Services</h2>
      <p className={styles.description}>
        Capturing the world&apos;s beauty with a unique perspective.
      </p>
      <ul className={styles.featuresList}>
        <li>
          <h1>Nature Photography</h1>
          <ImagesCarousel images={natureImages} direction="right" />
        </li>
        <li>
          <h1>Urban Photography</h1>
          <ImagesCarousel images={natureImages} direction="left" />
        </li>
      </ul>
    </section>
  );
};

export default Feature;
