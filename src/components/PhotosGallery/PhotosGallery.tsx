import Grid from "../Grid/Grid";

import type { Photo } from "../../types/photo";

import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  photos: Photo[];
  onOpenModal: (src: string) => void;
}

export default function PhotosGallery({
  photos,
  onOpenModal,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => (
        <PhotosGalleryItem
          key={photo.id}
          photo={photo}
          onOpenModal={onOpenModal}
        />
      ))}
    </Grid>
  );
}
