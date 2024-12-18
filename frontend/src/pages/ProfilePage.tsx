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
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../state/user/userSlice';
import ProfileSubscription from '../components/profile/profileSubscription';

const ProfilePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { user, isLoading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [id, dispatch])

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  return (
    <GenericPage title="Profile" icons={[<SettingsOutlinedIcon/>, <CreateOutlinedIcon/>]}>
      <Container maxWidth="sm" sx={{ margin:"32px 0",
            '@media (min-width:600px)': {
            padding: 0
        }}}>
          <Box sx={{ backgroundColor: '#fff', padding: 2, borderRadius: "24px", boxShadow: 3 }}>
            <ProfileHeader />
            <ProfileGallery />
            <ProfileDescription />
            <ProfileSubscription />
          </Box>
      </Container>
    </GenericPage>
  );
};

export default ProfilePage;