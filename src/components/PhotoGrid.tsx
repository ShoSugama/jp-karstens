import Image from "next/image";
import type { Photo } from "@/lib/data/types";
import { withBasePath } from "@/lib/basePath";
import styles from "./PhotoGrid.module.css";

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) {
    return <p>写真はまだありません。</p>;
  }

  return (
    <div className={styles.grid}>
      {photos.map((photo) => (
        <figure key={photo.id} className={styles.item}>
          <Image
            src={withBasePath(photo.url)}
            alt={photo.caption ?? ""}
            width={400}
            height={300}
            className={styles.photo}
          />
          {photo.caption && (
            <figcaption className={styles.caption}>
              {photo.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
