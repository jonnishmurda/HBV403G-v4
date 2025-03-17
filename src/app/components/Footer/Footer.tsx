import style from './Footer.module.css'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className={style.footer}>
            <section>
                <h2>Spurningalistasíðan</h2>
                <p>Lærðu eitthvað nýtt eða birtu eigin spurningar! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ullam animi provident obcaecati ad at accusamus eaque rem minus quibusdam ipsam, ipsa praesentium quo dolor repellendus dicta dolorum! Dignissimos, nostrum.</p>
            </section>
            <section>
                <h2>Tenglar</h2>
                <Link target='#' href="https://github.com/jonnishmurda">GitHub</Link>
            </section>
        </footer>
    )
}