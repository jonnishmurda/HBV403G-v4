import style from './CategoriesPage.module.css'
import Categories from '../Categories/Categories'

export default function CategoriesPage(){


    return (
        <section className={style.categoryPage}>
            <Categories title="Allir flokkar" />
        </section>
    )
}