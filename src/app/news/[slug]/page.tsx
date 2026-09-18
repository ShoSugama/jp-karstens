import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { getNewsBySlug, getNewsList } from "@/lib/data/news";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const list = await getNewsList();
  return list.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  return { title: item ? `${item.title} | 社内野球部` : "社内野球部" };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <Container>
      <p className={styles.date}>{formatDate(item.date)}</p>
      <h1 className={styles.title}>{item.title}</h1>
      {item.photoUrl && (
        <Image
          src={item.photoUrl}
          alt={item.title}
          width={800}
          height={450}
          className={styles.photo}
        />
      )}
      <p className={styles.body}>{item.body}</p>
    </Container>
  );
}
