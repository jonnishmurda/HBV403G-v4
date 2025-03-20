'use client';

import style from './Quiz.module.css';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from 'next/link';

const URL = process.env.NEXT_PUBLIC_API_URL || "";

type Category = {
    id: string;
    slug: string;
    name: string;
};

type Answer = {
    id: string;
    text: string;
    correct: boolean;
};

type Question = {
    id: string;
    text: string;
    categoryId: string;
    answers: Answer[];
};

export default function Quiz() {
    const params = useParams();
    const slug = params?.slug as string;

    const [category, setCategory] = useState<Category | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({});

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`${URL}/categories/${slug}`);
                const data = await fetch(`${URL}/categories/${slug}/questions`);

                if (!res.ok || !data.ok) {
                    throw new Error("Data not found");
                }

                setCategory(await res.json());
                setQuestions(await data.json());
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const handleAnswerClick = (questionId: string, answerId: string, isCorrect: boolean) => {
        if (selectedAnswers[questionId]) return; // Prevent multiple selections

        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answerId, // Store selected answer ID
        }));
    };

    if (!slug) return (
        <section className={style.loading}>
            <h1>Sækir spurningar</h1>
            <span>.</span><span>.</span><span>.</span>
        </section>
    );

    if (loading) return (
        <section className={style.loading}>
            <h1>Sækir spurningar</h1>
            <span>.</span><span>.</span><span>.</span>
        </section>
    );

    return (
        <section className={style.quiz}>
            <h1>{category?.name}</h1>
            {questions.length > 0 ? (
                questions.map((question) => (
                    <div key={question.id}>
                        <h3>{question.text}</h3>
                        <div className={style.answers}>
                            {question.answers.map((answer) => (
                                <button
                                    key={answer.id}
                                    className={`${style.answer} ${selectedAnswers[question.id] === answer.id
                                        ? answer.correct
                                            ? style.correct
                                            : style.incorrect
                                        : ""}`}
                                    onClick={() => handleAnswerClick(question.id, answer.id, answer.correct)}
                                    disabled={!!selectedAnswers[question.id]}
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>Engar spurningar fundust.</p>
            )}

            <Link className={style.backBtn} href="/categories">Til baka</Link>
        </section>
    );
}
