import css from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={css.page}>
      <main className={css.main}>
       <div className={css.heroText}>
        <h1 className={css.heroTitle}>Find your perfect rental car</h1>
        <span className={css.heroSubtext}>Reliable and budget-friendly rentals for any journey</span>
        <Link  href="/catalog" className={css.heroButton}>View Catalog</Link>
       </div>
      </main>
    </div>
  );
}
