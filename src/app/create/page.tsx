import style from '../page.module.css';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Create from '../components/Create/Create';

export default function Home() {
    return (
        <div className={style.page}>
            <Header />
            <Create />
            <Footer />
        </div>
    );
}