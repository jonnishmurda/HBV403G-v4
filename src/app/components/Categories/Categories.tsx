import Link from "next/link";

const URL = ''

type Category = {
    id: string
    slug: string
    name: string
}

type Props = {
    title: string;
}

export default function Categories({ title }: Props) {

    const categories: Array<Category> = [
        {
            id: '1',
            slug: 'html',
            name: 'html'
        }, {
            id: '2',
            slug: 'css',
            name: 'css'
        }, {
            id: '3',
            slug: 'js',
            name: 'js'
        }
    ]

   


    return (
        <section>
            <h2>{title}</h2>
            <p>Hérna koma flokkarnir</p>
            <ul>
                {
                    categories.map((category, i) => (
                        <li key={i}>
                            <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}