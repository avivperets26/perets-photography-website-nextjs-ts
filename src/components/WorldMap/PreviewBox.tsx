import Image from "next/image";
import styles from "./PreviewBox.module.css";

interface PreviewBoxProps {
  countryName: string;
  photos: string[];
  positionClass: string;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({
  countryName,
  photos,
  positionClass,
}) => {
  return (
    <div className={`${styles.previewBoxContainer} ${positionClass}`}>
      <div className={styles.arrow}></div>
      <div className={styles.previewBox}>
        <h3 className={styles.title}>{countryName}</h3>
        <div className={styles.photos}>
          {photos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`${countryName} photo ${index + 1}`}
              width={100}
              height={100}
              className={styles.photo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewBox;
