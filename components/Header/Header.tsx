import css from "@/components/Header/Header.module.css"
import Image from "next/image"
import Link from "next/link"

export default function Header(){

    return(
        <header className={css.header}>
            <Link href={"/"} aria-label="Home" className={css.headerLink}>
            <Image 
            src="/Logo.svg"
            alt="Home page"
            width={104}
            height={16}
            loading="eager"
            />
            </Link>
            <ul className={css.headerList}>
                <li className={css.listItem}>
                     <Link href="/"> Home</Link>
                    </li>
                <li className={css.listItem}>
                    <Link href="/catalog"> Catalog</Link>
                    </li>
            </ul>
        </header>
    )
}