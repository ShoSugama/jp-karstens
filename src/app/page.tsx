import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Card from "@/components/Card";
import NewsListItem from "@/components/NewsListItem";
import { getUpcomingGame } from "@/lib/data/schedule";
import { getNewsList } from "@/lib/data/news";
import { withBasePath } from "@/lib/basePath";
import styles from "./page.module.css";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Home() {
  const [upcomingGame, newsList] = await Promise.all([
    getUpcomingGame(),
    getNewsList(),
  ]);
  const latestNews = newsList.slice(0, 3);

  return (
    <Container>
      <section className={styles.hero}>
        <Image
          src={withBasePath("/images/hero.jpg")}
          alt="Karstens"
          width={960}
          height={480}
          priority
          className={styles.heroImage}
        />
        <p className={styles.heroTitle}>Karstens 公式サイト</p>
        <p className={styles.heroLead}>
          楽しく、真剣に。仕事の合間に白球を追いかけるKarstensです。
          未経験者から経験者まで、一緒にプレーする仲間を募集しています。
        </p>
        <Link href="/contact" className={styles.cta}>
          部員募集の詳細を見る
        </Link>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>次の試合</h2>
        {upcomingGame ? (
          <Card>
            <p>{formatDate(upcomingGame.date)}</p>
            <p>
              対戦相手: {upcomingGame.opponent} / 会場: {upcomingGame.venue} (
              {upcomingGame.homeAway === "home" ? "ホーム" : "アウェイ"})
            </p>
          </Card>
        ) : (
          <p className={styles.emptyText}>予定されている試合はありません。</p>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>お知らせ</h2>
        <ul className={styles.newsList}>
          {latestNews.map((item) => (
            <NewsListItem key={item.slug} item={item} />
          ))}
        </ul>
      </section>
    </Container>
  );
}
