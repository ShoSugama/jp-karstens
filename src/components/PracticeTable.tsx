import type { PracticeSession } from "@/lib/data/types";
import styles from "./ScheduleTable.module.css";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PracticeTable({
  sessions,
}: {
  sessions: PracticeSession[];
}) {
  if (sessions.length === 0) {
    return <p>該当する練習会はありません。</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>日付</th>
          <th>時間</th>
          <th>場所</th>
          <th>備考</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((session) => (
          <tr key={session.id}>
            <td>{formatDate(session.date)}</td>
            <td>
              {session.startTime} - {session.endTime}
            </td>
            <td>{session.venue}</td>
            <td>{session.note ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
