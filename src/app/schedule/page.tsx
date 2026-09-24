import Container from "@/components/Container";
import ScheduleTable from "@/components/ScheduleTable";
import { getSchedule } from "@/lib/data/schedule";
import styles from "../page.module.css";

export const metadata = {
  title: "試合日程 | Karstens",
};

export default async function SchedulePage() {
  const games = await getSchedule();
  const upcoming = games.filter((g) => g.status === "upcoming");
  const finished = games.filter((g) => g.status === "finished");

  return (
    <Container>
      <h1 className={styles.sectionTitle}>試合日程</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>今後の試合</h2>
        <ScheduleTable games={upcoming} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>過去の試合</h2>
        <ScheduleTable games={finished} />
      </section>
    </Container>
  );
}
