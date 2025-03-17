import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";

export default function Home() {
    return (
        <>
            <Header />
            <Categories title="Vinsælir flokkar" />
        </>
    );
}

