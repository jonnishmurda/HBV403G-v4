'use client'

import Link from "next/link";
import style from './Categories.module.css'
import { useState, useEffect } from "react";

type Category = {
    id: string;
    slug: string;
    name: string;
};

type Props = {
    title: string;
};

export default function Categories({ title }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://hbv403g-v3.onrender.com/categories');
                const data: Category[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <section className={style.loading}>
                <h1>Sækir flokka</h1>
                <span>.</span><span>.</span><span>.</span>
            </section>
        );
    }

    return (
        <section className={style.categories}>
            <h2>{title}</h2>
            <ul className={style.cards}>
                {categories.map((category) => (
                    <Link key={category.id} className={style.card} href={`/categories/${category.slug}`}>
                        <h3>{category.name}</h3>
                    </Link>
                ))}
            </ul>
        </section>
    );
}
