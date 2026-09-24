import Container from "@/components/Container";
import PhotoGrid from "@/components/PhotoGrid";
import { getPhotos } from "@/lib/data/photos";
import sectionStyles from "../page.module.css";

export const metadata = {
  title: "フォトギャラリー | Karstens",
};

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <Container>
      <h1 className={sectionStyles.sectionTitle}>フォトギャラリー</h1>
      <PhotoGrid photos={photos} />
    </Container>
  );
}
