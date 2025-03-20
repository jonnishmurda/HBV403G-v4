'use client'

import style from '../../page.module.css';
import Header from "@/app/components/Header/Header";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer/Footer";
import Quiz from "@/app/components/Quiz/Quiz";
import React, { use } from 'react';


type tParams = Promise<{ slug: string }>;

export default function CategoryPage({ params }: { params: tParams }) {
    const { slug }: { slug: string } = use(params); 

    if (!slug) {
        return notFound();
    }

    return (
        <div className={style.page}>
            <Header />
            <Quiz slug={slug} />
            <Footer />
        </div>
    );
}
