import GridItem from "../GridItem/GridItem";

import styles from "./PhotosGalleryItem.module.css";

import type { Photo } from "../../types/photo";

interface PhotosGalleryItemProps {
  photo: Photo;
  onOpenModal: (src: string) => void;
}

export default function PhotosGalleryItem({
  photo,
  onOpenModal,
}: PhotosGalleryItemProps) {
  return (
    <GridItem>
      <div
        onClick={() => onOpenModal(photo.src.original)}
        className={styles.thumb}
        style={{
          backgroundColor: photo.avg_color,
          borderColor: photo.avg_color,
        }}
      >
        <img src={photo.src.large} alt={photo.alt} />
      </div>
    </GridItem>
  );
}
