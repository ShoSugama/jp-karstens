import photosJson from "@/lib/mock/photos.json";
import type { Photo } from "./types";

interface PhotoRecord {
  id: string;
  fileName: string;
  caption?: string;
  date?: string;
}

export async function getPhotos(): Promise<Photo[]> {
  const list = photosJson as PhotoRecord[];
  const photos = list.map(
    (item): Photo => ({
      id: item.id,
      fileName: item.fileName,
      url: `/images/gallery/${item.fileName}`,
      caption: item.caption,
      date: item.date,
    }),
  );

  return photos.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}
