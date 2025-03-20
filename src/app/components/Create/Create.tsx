'use client'

import { useState } from "react";
import axios from "axios";
import style from "./Create.module.css";

const URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function Create() {
    const [categoryName, setCategoryName] = useState("");
    const [questions, setQuestions] = useState([
        { text: "", answers: [{ text: "", correct: false }, { text: "", correct: false }] }
    ]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({ categoryName: "", questions: [] });

    function validateForm() {
        let isValid = true;
        let newErrors: any = { categoryName: "", questions: [] };

        // Validate category name (min 3 chars, max 1024)
        if (categoryName.trim().length < 3 || categoryName.trim().length > 1024) {
            newErrors.categoryName = "Titill verður að hafa 3-1024 stafi.";
            isValid = false;
        }

        // Validate each question
        questions.forEach((question, qIndex) => {
            let questionErrors: any = { text: "", answers: "", correctAnswer: "" };

            // Question text validation (min 5 chars, max 1024)
            if (question.text.trim().length < 5 || question.text.trim().length > 1024) {
                questionErrors.text = "Spurning verður að hafa 5-1024 stafi.";
                isValid = false;
            }

            // At least 2 answers required, max 4
            if (question.answers.length < 2 || question.answers.length > 4) {
                questionErrors.answers = "Spurning verður að hafa 2-4 svör.";
                isValid = false;
            }

            // Each answer must be at least 1 character and max 1024 characters
            question.answers.forEach((answer, aIndex) => {
                if (answer.text.trim().length < 1 || answer.text.trim().length > 1024) {
                    questionErrors.answers = "Svar verður að hafa 1-1024 stafi.";
                    isValid = false;
                }
            });

            // At least one correct answer required
            if (!question.answers.some((answer) => answer.correct)) {
                questionErrors.correctAnswer = "Veldu að minnsta kosti eitt rétt svar.";
                isValid = false;
            }

            newErrors.questions[qIndex] = questionErrors;
        });

        setErrors(newErrors);
        return isValid;
    }

    function addQuestion() {
        setQuestions([...questions, { text: "", answers: [{ text: "", correct: false }, { text: "", correct: false }] }]);
    }

    function updateQuestion(index, value) {
        const newQuestions = [...questions];
        newQuestions[index].text = value;
        setQuestions(newQuestions);
    }

    function addAnswer(questionIndex) {
        const newQuestions = [...questions];
        if (newQuestions[questionIndex].answers.length < 4) {
            newQuestions[questionIndex].answers.push({ text: "", correct: false });
            setQuestions(newQuestions);
        }
    }

    function updateAnswer(questionIndex, answerIndex, value) {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers[answerIndex].text = value;
        setQuestions(newQuestions);
    }

    function toggleCorrect(questionIndex, answerIndex) {
        const newQuestions = [...questions];

        newQuestions[questionIndex].answers = newQuestions[questionIndex].answers.map((answer, idx) => ({
            ...answer,
            correct: idx === answerIndex,
        }));

        setQuestions(newQuestions);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const categoryResponse = await axios.post(`${URL}/category`, { name: categoryName });
            const categorySlug = categoryResponse.data.slug;

            for (const question of questions) {
                if (!question.text || question.answers.length < 2) continue;

                const questionResponse = await axios.post(`${URL}/categories/${categorySlug}/question`, { text: question.text });
                const questionId = questionResponse.data.id;

                for (const answer of question.answers) {
                    if (!answer.text) continue;

                    await axios.post(`${URL}/questions/${questionId}/answer`, {
                        text: answer.text,
                        correct: answer.correct,
                    });
                }
            }

            setMessage("Flokkur búinn til!");
            setCategoryName("");
            setQuestions([{ text: "", answers: [{ text: "", correct: false }, { text: "", correct: false }] }]);
        } catch (error) {
            console.error("❌ Error creating quiz", error.response?.data || error.message);
            if (error.response?.data?.error === "Category name already exists!") {
                setErrors((prev) => ({ ...prev, categoryName: "Flokkur með þessu nafni er þegar til!" }));
            } else {
                setMessage("Ekki tókst að búa til flokk.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={style.content}>
            <h2>Búa til flokk</h2>
            <section className={style.form}>
                <form onSubmit={handleSubmit}>
                    <div className={style.formGroup}>
                        <label>Titill flokks</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className={style.input}
                            placeholder="Titill flokks"
                            required
                        />
                        {errors.categoryName && <p className={style.error}>{errors.categoryName}</p>}
                    </div>

                    {questions.map((question, qIndex) => (
                        <div key={qIndex} className={style.questionBlock}>
                            <label>Spurning {qIndex + 1}</label>
                            <input
                                type="text"
                                value={question.text}
                                onChange={(e) => updateQuestion(qIndex, e.target.value)}
                                className={style.input}
                                placeholder="Spurning"
                                required
                            />
                            {errors.questions[qIndex]?.text && <p className={style.error}>{errors.questions[qIndex].text}</p>}

                            <div className={style.answersSection}>
                                {question.answers.map((answer, aIndex) => (
                                    <div key={aIndex} className={style.answerBlock}>
                                        <input
                                            type="text"
                                            value={answer.text}
                                            onChange={(e) => updateAnswer(qIndex, aIndex, e.target.value)}
                                            className={style.input}
                                            placeholder={`Svar ${aIndex + 1}`}
                                            required
                                        />
                                        <label className={style.correct}>
                                            <input
                                                className={style.radio}
                                                type="radio"
                                                checked={answer.correct}
                                                onChange={() => toggleCorrect(qIndex, aIndex)}
                                            />
                                            <span className={style.radioCustom}></span>Rétt
                                        </label>
                                    </div>
                                ))}
                                {errors.questions[qIndex]?.answers && <p className={style.error}>{errors.questions[qIndex].answers}</p>}
                                {errors.questions[qIndex]?.correctAnswer && <p className={style.error}>{errors.questions[qIndex].correctAnswer}</p>}
                                {question.answers.length < 4 && (
                                    <button type="button" onClick={() => addAnswer(qIndex)} className={style.addButton}>
                                        + Bæta við svari
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    <button type="submit" className={style.submitButton} disabled={loading}>
                        {loading ? "Býr til..." : "Búa til flokk"}
                    </button>

                    {message && <p className={style.message}>{message}</p>}
                </form>
            </section>
        </div>
    );
}
