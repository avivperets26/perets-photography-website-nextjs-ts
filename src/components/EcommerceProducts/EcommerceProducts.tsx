import styles from "./EcommerceProducts.module.css";
import Image from "next/image";
const EcommerceProducts = () => {
  const products = [
    {
      id: "1",
      name: "Nature Photo Pack",
      price: "$29.99",
      image: "/images/1928-Enhanced-SR.jpg",
    },
    {
      id: "2",
      name: "Sunset Preset Pack",
      price: "$19.99",
      image: "/images/1928-Enhanced-SR.jpg",
    },
    {
      id: "3",
      name: "Wildlife Photo Pack",
      price: "$39.99",
      image: "/images/1928-Enhanced-SR.jpg",
    },
  ];

  return (
    <section className={styles.ecommerce}>
      <h2 className={styles.title}>Popular Products</h2>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.product}>
            <Image
              width={300}
              height={300}
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EcommerceProducts;
