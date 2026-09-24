import Link from "next/link";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/", label: "トップ" },
  { href: "/schedule", label: "試合日程" },
  { href: "/members", label: "メンバー紹介" },
  { href: "/gallery", label: "フォトギャラリー" },
  { href: "/news", label: "ニュース" },
  { href: "/contact", label: "部員募集" },
];

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.link}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
