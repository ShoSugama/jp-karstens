import Image from "next/image";
import type { Member } from "@/lib/data/types";
import { withBasePath } from "@/lib/basePath";
import Card from "./Card";
import styles from "./MemberCard.module.css";

export default function MemberCard({ member }: { member: Member }) {
  return (
    <Card>
      {member.photoUrl && (
        <Image
          src={withBasePath(member.photoUrl)}
          alt={member.name}
          width={160}
          height={160}
          className={styles.photo}
        />
      )}
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
