import styles from "./Stats.module.css";

const Stats = () => {
  return (
    <section className={styles.stats}>
      <div className={styles.stat}>
        <span className={styles.number}>30+</span>
        <span className={styles.label}>Countries Visited</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.number}>500+</span>
        <span className={styles.label}>Projects Completed</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.number}>1000+</span>
        <span className={styles.label}>Photos Sold</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.number}>50+</span>
        <span className={styles.label}>Lightroom Presets</span>
      </div>
    </section>
  );
};

export default Stats;
