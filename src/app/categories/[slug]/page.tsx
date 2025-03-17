import Header from "@/app/components/Header/Header";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer/Footer";

type Category = {
    id: string;
    slug: string;
    name: string;
};

type Question = {
    id: string
    text: string
    categoryId: string
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    try {
        const res = await fetch(`https://hbv403g-v3.onrender.com/categories/${params.slug}`);

        let data = await fetch(`https://hbv403g-v3.onrender.com/categories/${params.slug}/questions`)

        if (!res.ok) {
            return notFound();
        }

        const category: Category = await res.json();
        const questions: Array<Question> = await data.json();

        return (
            <>
                <Header />
                <section>
                    <h1>{category.name}</h1>
                    {
                        questions.map((i) => (
                            <div key={i.id}>
                                <h3>{i.text}</h3>
                                <p>wha</p>
                            </div>
                        ))
                    }
                    <Link href="/categories">← Back to categories</Link>
                </section>
                <Footer />
            </>
        );
    } catch (error) {
        return notFound();
    }
}
