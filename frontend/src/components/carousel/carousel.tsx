import { FC, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Photo } from "../../shared/interfaces/photo";

interface CarouselProps {
  photos: Photo[];
}

const Carousel: FC<CarouselProps> = ({ photos }) => {
  const sortedPhotos = [...photos]?.sort((a, b) => (b.isAvatar ? 1 : 0) - (a.isAvatar ? 1 : 0));

  const [currentIndex, setCurrentIndex] = useState(0);

  const firstPhoto = sortedPhotos?.length > 0 ? sortedPhotos[0] : null;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sortedPhotos.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === sortedPhotos.length - 1 ? 0 : prevIndex + 1));
  };

  console.log(photos);

  return (
    <Box sx={{ position: "relative" }}>
      {firstPhoto && sortedPhotos[currentIndex] ? (
        <>
          <Box
            component="img"
            src={import.meta.env.VITE_PLANE_API_URI + photos[currentIndex]?.photoURL}
            alt={`Profile Photo ${currentIndex + 1}`}
            sx={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              borderRadius: "8px 8px 0 0"
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              color: "white",
            }}
            onClick={handlePrev}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              color: "white",
            }}
            onClick={handleNext}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      ) : (
        <Box
          component="section"
          sx={{
            width: "100%",
            height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          Profile Photo was not found
        </Box>
      )}
    </Box>
  );
};

export default Carousel;
