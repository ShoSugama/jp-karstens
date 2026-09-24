import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>Karstens(モックサイト)</p>
        <p className={styles.contact}>お問い合わせ: ssugama@ping.com</p>
        <p className={styles.copyright}>&copy; 2026 PING GOLF JAPAN</p>
      </div>
    </footer>
  );
}
