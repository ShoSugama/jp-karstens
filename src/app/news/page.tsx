import Container from "@/components/Container";
import NewsListItem from "@/components/NewsListItem";
import { getNewsList } from "@/lib/data/news";
import styles from "../page.module.css";

export const metadata = {
  title: "ニュース | Karstens",
};

export default async function NewsPage() {
  const newsList = await getNewsList();

  return (
    <Container>
      <h1 className={styles.sectionTitle}>ニュース / 活動記録</h1>
      <ul className={styles.newsList}>
        {newsList.map((item) => (
          <NewsListItem key={item.slug} item={item} />
        ))}
      </ul>
    </Container>
  );
}
