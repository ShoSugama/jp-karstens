import Container from "@/components/Container";
import MemberCard from "@/components/MemberCard";
import { getMembers } from "@/lib/data/members";
import sectionStyles from "../page.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "メンバー紹介 | Karstens",
};

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <Container>
      <h1 className={sectionStyles.sectionTitle}>メンバー紹介</h1>
      <div className={styles.grid}>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </Container>
  );
}
