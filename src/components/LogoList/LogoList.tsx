import styles from "./LogoList.module.css";

const logos = [
  {
    id: "1",
    name: "Photography Co",
    src: "/assets/partners/photography-co.png",
  },
  { id: "2", name: "Travel Gear", src: "/assets/partners/travel-gear.png" },
  {
    id: "3",
    name: "Accommodations",
    src: "/assets/partners/accommodations.png",
  },
  { id: "4", name: "Trip Agency", src: "/assets/partners/trip-agency.png" },
];

const LogoList = () => {
  return (
    <section className={styles.logoList}>
      <h2 className={styles.title}>Our Partners</h2>
      <div className={styles.logos}>
        {logos.map((logo) => (
          <img
            key={logo.id}
            src={logo.src}
            alt={logo.name}
            className={styles.logo}
          />
        ))}
      </div>
    </section>
  );
};

export default LogoList;
