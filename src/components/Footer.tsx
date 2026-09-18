import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>社内野球部(モックサイト)</p>
        <p className={styles.contact}>お問い合わせ: baseball-club@example.com</p>
        <p className={styles.copyright}>&copy; 2026 社内野球部</p>
      </div>
    </footer>
  );
}
