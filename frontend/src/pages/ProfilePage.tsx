import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import GenericPage from "./GenericPage";
import { FC, useEffect } from "react";
import ProfileHeader from "../components/profile/profileHeader";
import { Box, Container, Typography } from '@mui/material';
import ProfileDescription from '../components/profile/profileDescription';
import ProfileGallery from '../components/profile/profileGallery';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById } from '../../state/user/userSlice';
import ProfileSubscription from '../components/profile/profileSubscription';
import ProfileLocation from '../components/profile/profileLocation';
import { fetchCoordinatedByUserId as fetchCoordinatesByUserId } from '../../state/coordinates/coordinatesSlice';
import React from 'react';

const ProfilePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { user, isLoading: userLoading, error } = useSelector((state: RootState) => state.user);
  const { coordinates, isLoading: coordinatesLoading } = useSelector((state: RootState) => state.coordinates);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
      dispatch(fetchCoordinatesByUserId(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    console.log("coordinates: " + coordinates)

    if (!userLoading && !coordinatesLoading && !coordinates) {
      navigate("/map");
    }
  }, [userLoading, coordinatesLoading, coordinates, navigate]);

  if (userLoading || coordinatesLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  return (
    <GenericPage title="Profile" icons={[<SettingsOutlinedIcon />, <CreateOutlinedIcon />]}>
      <Container
        maxWidth="sm"
        sx={{
          margin: "32px 0",
          "@media (min-width:600px)": {
            padding: 0,
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: 2,
            borderRadius: "24px",
            boxShadow: 3,
          }}
        >
          <ProfileHeader />
          <ProfileGallery />
          <ProfileDescription />
          <ProfileSubscription />
          <ProfileLocation />
        </Box>
      </Container>
    </GenericPage>
  );
};

export default ProfilePage;
