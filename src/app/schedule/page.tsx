import Container from "@/components/Container";
import ScheduleTable from "@/components/ScheduleTable";
import PracticeTable from "@/components/PracticeTable";
import { getSchedule } from "@/lib/data/schedule";
import { getPracticeSessions } from "@/lib/data/practice";
import styles from "../page.module.css";

export const metadata = {
  title: "試合日程 | Karstens",
};

export default async function SchedulePage() {
  const [games, practiceSessions] = await Promise.all([
    getSchedule(),
    getPracticeSessions(),
  ]);
  const upcoming = games.filter((g) => g.status === "upcoming");
  const finished = games.filter((g) => g.status === "finished");

  const todayIso = new Date().toISOString().slice(0, 10);
  const upcomingPractice = practiceSessions.filter(
    (s) => s.date >= todayIso,
  );
  const finishedPractice = practiceSessions
    .filter((s) => s.date < todayIso)
    .reverse();

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

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>今後の練習会</h2>
        <PracticeTable sessions={upcomingPractice} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>過去の練習会</h2>
        <PracticeTable sessions={finishedPractice} />
      </section>
    </Container>
  );
}
