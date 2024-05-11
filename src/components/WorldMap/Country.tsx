import styles from "./Country.module.css";

interface CountryProps {
  country: {
    visited: boolean;
    name: string;
    path: string;
  };
  onHover: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onLeave: () => void;
}

const Country: React.FC<CountryProps> = ({ country, onHover, onLeave }) => {
  return (
    <g
      className={styles.countryGroup}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <path
        id={country.name.toLowerCase()}
        className={`${styles.country} ${
          country.visited ? styles.visitedCountry : ""
        }`}
        d={country.path}
      />
    </g>
  );
};

export default Country;
