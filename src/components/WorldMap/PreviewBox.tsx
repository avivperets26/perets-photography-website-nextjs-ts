import Image from "next/image";
import styles from "./PreviewBox.module.css";

interface PreviewBoxProps {
  name: string;
  photos: string[];
  position: { x: number; y: number };
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ name, photos, position }) => {
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: 1, // Ensure visibility
    visibility: "visible" as "visible",
  };

  return (
    <div className={styles.previewBoxContainer} style={style}>
      <div className={styles.previewBox}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.photos}>
          {photos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`${name} photo ${index + 1}`}
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
