import Link from "next/link";
import Nav from "./Nav";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            ⚾
          </span>
          Karstens(カーステンズ)
        </Link>
        <Nav />
      </div>
    </header>
  );
}
