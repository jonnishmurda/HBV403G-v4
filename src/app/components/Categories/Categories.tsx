import Link from "next/link";
import style from './Categories.module.css'

type Category = {
    id: string
    slug: string
    name: string
}

type Props = {
    title: string;
}

export default async function Categories({ title }: Props) {
    try {
        let data = await fetch('https://hbv403g-v3.onrender.com/categories');
        const categories: Array<Category> = await data.json();


        return (
            <section className={style.categories}>
                <h2>{title}</h2>
                <ul className={style.cards}>
                    {
                        categories.map((i) => (
                            <Link key={i.id} className={style.card} href={`/categories/${i.slug}`}>
                                <h3>{i.name}</h3>
                            </Link>
                        ))
                    }
                </ul>
            </section>
        );
    } catch (error) {
        return (
            <section>
                <h2>loading</h2>
            </section>
        )
    }


}