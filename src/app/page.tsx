import Benefits from "@/components/Benefits/Benefits";
import EcommerceProducts from "@/components/EcommerceProducts/EcommerceProducts";
import Feature from "@/components/Feature/Feature";
import HeroHeader from "@/components/HeroHeader/HeroHeader";
import LogoList from "@/components/LogoList/LogoList";
import Stats from "@/components/Stats/Stats";
import WorldMap from "@/components/WorldMap/WorldMap";
import styles from "@/styles/page.module.css";
export default function Home() {
  return (
    <main>
      <div className={styles.description}>
        <HeroHeader />
        <div className={styles.content}>
          <Feature />
          <WorldMap />
          <Stats />
          <EcommerceProducts />
          <Benefits />
          <LogoList />
          {/* <CTA /> */}
          {/* <Contact /> */}
          {/* <Locations /> */}
          {/* <Newsletter /> */}
        </div>
      </div>
    </main>
  );
}
