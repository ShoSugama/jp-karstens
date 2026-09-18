import newsJson from "@/lib/mock/news.json";
import type { NewsItem } from "./types";

export async function getNewsList(): Promise<NewsItem[]> {
  const list = newsJson as NewsItem[];
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const list = await getNewsList();
  return list.find((n) => n.slug === slug) ?? null;
}
