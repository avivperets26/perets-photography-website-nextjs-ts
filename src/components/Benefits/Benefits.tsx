import styles from "./Benefits.module.css";

const Benefits = () => {
  return (
    <section className={styles.benefits}>
      <h2 className={styles.title}>Why Choose My Photography?</h2>
      <ul className={styles.benefitsList}>
        <li>Unique Perspective</li>
        <li>Professional Editing</li>
        <li>High-Quality Prints</li>
        <li>Exclusive Lightroom Presets</li>
      </ul>
    </section>
  );
};

export default Benefits;
