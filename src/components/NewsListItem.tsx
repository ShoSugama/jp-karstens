import Link from "next/link";
import type { NewsItem } from "@/lib/data/types";
import styles from "./NewsListItem.module.css";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsListItem({ item }: { item: NewsItem }) {
  return (
    <li className={styles.item}>
      <Link href={`/news/${item.slug}`} className={styles.link}>
        <p className={styles.date}>{formatDate(item.date)}</p>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.excerpt}>{item.excerpt}</p>
      </Link>
    </li>
  );
}
