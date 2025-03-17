import Link from "next/link";
import style from './Header.module.css'

export default function Header() {
    return (
        <header className={style.header} >
            <Link href="/"><h1>Spurningalistasíðan</h1></Link>
            <nav>
                <ul>
                    <li><Link href="/">Heim</Link></li>
                    <li><Link href="/categories">Flokkar</Link></li>
                    <li><Link href="/create">Búa til flokk</Link></li>
                </ul>
            </nav>
        </header>
    );
}