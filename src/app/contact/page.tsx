import Container from "@/components/Container";
import sectionStyles from "../page.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "部員募集 / お問い合わせ | Karstens",
};

export default function ContactPage() {
  return (
    <Container>
      <h1 className={sectionStyles.sectionTitle}>部員募集 / お問い合わせ</h1>
      <p className={styles.lead}>
        Karstensでは、一緒にプレーする仲間を募集しています。
        野球経験の有無は問いません。まずはお気軽にご連絡ください。
      </p>

      <p className={styles.notice}>
        ※本サイトはモックです。以下のフォームから実際に送信することはできません。
      </p>

      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">お名前</label>
          <input id="name" type="text" placeholder="山田 太郎" disabled />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            placeholder="taro.yamada@example.com"
            disabled
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="message">メッセージ</label>
          <textarea id="message" rows={4} disabled />
        </div>
        <button type="submit" className={styles.submit} disabled>
          送信する(モック)
        </button>
      </form>
    </Container>
  );
}
