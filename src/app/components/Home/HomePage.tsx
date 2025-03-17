import Link from "next/link";
import style from './HomePage.module.css'

export default function HomePage() {
    return (
        <section className={style.homepage}>
            <div className={style.content}>
                <h2>Spurningalistasíðan</h2>
                <p>Velkomin á heimasíðu spurninga. Hér geturu lært ýmislegt Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt blanditiis tenetur sapiente provident possimus autem reiciendis voluptates ratione aliquam itaque quidem, odit sit nisi ipsam et assumenda ipsa libero exercitationem!</p>
            </div>
            <div className={style.cards}>
                <Link className={style.card} href={"/categories"}>Flokkar</Link>
                <Link className={style.card} href={"/"}>Senda inn spurningu</Link>
            </div>
        </section>
    );
}