import type { Game } from "@/lib/data/types";
import styles from "./ScheduleTable.module.css";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ScheduleTable({ games }: { games: Game[] }) {
  if (games.length === 0) {
    return <p>該当する試合はありません。</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>日付</th>
          <th>対戦相手</th>
          <th>会場</th>
          <th>ホーム/アウェイ</th>
          <th>結果</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => (
          <tr key={game.id}>
            <td>{formatDate(game.date)}</td>
            <td>{game.opponent}</td>
            <td>{game.venue}</td>
            <td>{game.homeAway === "home" ? "ホーム" : "アウェイ"}</td>
            <td>
              {game.status === "upcoming"
                ? "予定"
                : game.result
                ? `${game.result.teamScore} - ${game.result.opponentScore}`
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
