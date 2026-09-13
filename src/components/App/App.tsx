import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import toast, { Toaster } from "react-hot-toast";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

export default function App() {
  const[photos, setPhotos] = useState<Photo[]>([]);
  const[isLoading, setIsLoading] = useState(false)
  const[selectPhoto, setSelectPhoto] = useState<Photo | null>(null)
  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      const data = await getPhotos(query);
      setPhotos(data)
    } catch {
      toast.error("Somthing wrongs ... Try again");
    } finally{
      setIsLoading(false)
    }
  };
  return (
    <>
      <Section>
        <Container>
          <Toaster position="top-center" />
          <Form onSubmit={handleSearch} />
          {isLoading && <Loader />}
          <PhotosGallery photos={photos} onSelect={setSelectPhoto}/>
          {selectPhoto && <Modal onClose={() => setSelectPhoto(null)}>
            <div
              style={{
                backgroundColor: selectPhoto.avg_color,
                borderColor: selectPhoto.avg_color,
              }}
            >
              <img src={selectPhoto.src.original} alt={selectPhoto.alt} />
            </div>
          </Modal>}
        </Container>
      </Section>
    </>
  );
}
