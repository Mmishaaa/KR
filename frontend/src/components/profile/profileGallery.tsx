import { Box, Button, Typography, Modal, Grid, FormControlLabel, Checkbox, Card, CardMedia, TextField, IconButton } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDispatch, useSelector } from "react-redux";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { AppDispatch, RootState } from "../../../state/store";
import { addPhoto, removePhoto } from "../../../state/photo/photoSlice";
import { Photo } from "../../shared/interfaces/photo";

const ProfileGallery: FC = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const photos = useSelector((state: RootState) => state.photo.photos);

  const dispatch = useDispatch<AppDispatch>();

  let photosToShow: Photo[] = [];
  let hasMorePhotos = false;
  if(photos !== null && photos?.length > 0) {
    photosToShow = photos?.slice(0, 6) || [];
    hasMorePhotos = photos?.length > photosToShow.length;
  }

  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAvatar, setIsAvatar] = useState(false);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvatar(event.target.checked);
  };

  const handleSave = () => {
    if (userId && selectedFile) {
      dispatch(addPhoto({
        img: selectedFile,
        isAvatar,
        userId
      }));
      handleModalClose();
    }
  };

  const handleDelete = (id: string) => {
    dispatch(removePhoto(id));
  }

  useEffect(() => {

  }, [])

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Button
          onClick={handleModalOpen}
          sx={{
            flex: '1 1 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50px',
            backgroundColor: 'transparent',
            border: '1px dashed #ccc',
            textTransform: 'none',
            color: '#000',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            }
          }}
        >
          <CameraAltIcon sx={{ mr: 1 }} />
          <Typography sx={{ fontSize: '1rem' }}>
            Click to add a photo
          </Typography>
        </Button>
      </Box>

      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Upload Photo
          </Typography>

          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleFileChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox checked={isAvatar} onChange={handleCheckboxChange} color="primary" />}
            label="Set as Avatar"
          />

          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" color="secondary" onClick={handleModalClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Grid container spacing={2}>
        {photosToShow.map((photo, index) => (
          <Grid item xs={6} sm={4} md={4} lg={4} key={index}>
            <Card sx={{ position: 'relative', paddingBottom: '100%', borderRadius: 5 }}>
              <CardMedia
                component="img"
                image={import.meta.env.VITE_PLANE_API_URI + photo.photoURL}
                alt={`Photo ${index + 1}`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
              <IconButton
                  onClick={() => handleDelete(photo.id)}                  
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    borderRadius: '50%', 
                    padding: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <ClearOutlinedIcon />
              </IconButton>
              {index === (photosToShow.length - 1) && hasMorePhotos && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'rgb(255, 255, 255)',
                  }}
                  onClick={() => alert('There will be gallery')}
                >
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    {photos !== null && photos.length - photosToShow.length} more photos
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileGallery;
