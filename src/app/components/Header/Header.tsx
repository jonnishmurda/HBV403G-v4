import Link from "next/link";

export default function Header() {
    return (
        <header>
            <Link href="/"><h1>Spurningalistasíðan</h1></Link>
            <nav>
                <ul>
                    <li><Link href="/">Heim</Link></li>
                    <li><Link href="/categories">Flokkar</Link></li>
                    <li><Link href="/">Senda inn spurningu</Link></li>
                </ul>
            </nav>
        </header>
    );
}