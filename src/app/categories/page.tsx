import Image from "next/image";
import style from '../page.module.css';
import Header from "../components/Header/Header";
import CategoriesPage from "../components/CategoryPage/CategoryPage";
import Footer from "../components/Footer/Footer";

export default function Home() {
    return (
        <div className={style.page}>
            <Header />
            <CategoriesPage />
            <Footer />
        </div>
    );
}

