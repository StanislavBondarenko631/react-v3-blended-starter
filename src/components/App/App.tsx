import Section from "../Section/Section";
import Container from "../Container/Container";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import Form from "../Form/Form";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import { getPhotos } from "../../services/photos";
import { Toaster } from "react-hot-toast";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [largeImage, setLargeImage] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await getPhotos(query);

      setPhotos(data);
    } catch (error) {
      setIsError(true);
      console.log("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {photos.length > 0 && (
            <PhotosGallery
              photos={photos}
              onOpenModal={(src) => setLargeImage(src)}
            />
          )}

          {largeImage && (
            <Modal onClose={() => setLargeImage(null)}>
              <img src={largeImage} alt="Large" />
            </Modal>
          )}

          {isLoading && <Loader />}

          {isError && <Text> Something went wrong...</Text>}
        </Container>
        Home page
      </Section>
      <Toaster />
    </>
  );
}
