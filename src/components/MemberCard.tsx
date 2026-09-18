import type { Member } from "@/lib/data/types";
import Card from "./Card";
import styles from "./MemberCard.module.css";

export default function MemberCard({ member }: { member: Member }) {
  return (
    <Card>
      <div className={styles.header}>
        <span className={styles.number}>#{member.number}</span>
        <div>
          <p className={styles.name}>{member.name}</p>
          <p className={styles.position}>{member.position}</p>
        </div>
      </div>
      {member.department && (
        <p className={styles.department}>{member.department}</p>
      )}
      {member.comment && <p className={styles.comment}>{member.comment}</p>}
    </Card>
  );
}
