import styles from "./Country.module.css";

interface CountryProps {
  countryName: string;
  path: string;
  onMouseEnter: (data: any) => any;
  onMouseLeave?: (data: any) => void;
  visited: boolean;
}

const Country: React.FC<CountryProps> = ({
  countryName,
  path,
  onMouseEnter,
  onMouseLeave,
  visited,
}) => {
  return (
    <g
      className={styles.countryGroup}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        id={countryName.toLowerCase()}
        className={`${styles.country} ${visited ? styles.visitedCountry : ""}`}
        d={path}
      />
    </g>
  );
};

export default Country;
