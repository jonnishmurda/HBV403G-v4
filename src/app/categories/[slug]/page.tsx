import style from '../../page.module.css'
import Header from "@/app/components/Header/Header";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer/Footer";
import Quiz from "@/app/components/Quiz/Quiz";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    try {
        return (
            <div className={style.page}>
                <Header />
                <Quiz params={params} />
                <Footer />
            </div>
        );
    } catch (error) {
        return notFound();
    }
}
