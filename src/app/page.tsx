import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <h1>Forsíðan</h1>
    </div>
  );
}
