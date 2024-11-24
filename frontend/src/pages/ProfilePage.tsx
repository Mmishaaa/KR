import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import GenericPage from "./GenericPage";
import { FC, useEffect } from "react";
import ProfileHeader from "../components/profile/profileHeader";
import { Box, Container, Typography } from '@mui/material';
import { UserWithSubscription } from '../shared/interfaces/user';
import ProfileDescription from '../components/profile/profileDescription';
import ProfileGallery from '../components/profile/profileGallery';
import ProfileSubscription from '../components/profile/profileSubscription';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { fetchUserFailure, fetchUserStart, fetchUserSuccess } from '../../state/user/userSlice';

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(fetchUserStart());
      try {
        const response = await fetch("http://localhost:5000/api/users/1");
        const userData: UserWithSubscription = await response.json();
        
        dispatch(fetchUserSuccess(userData))
      } catch(error) {
        dispatch(fetchUserFailure("Failed to load user data"))
      }
    };

    fetchUser();
  }, [dispatch])

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
            <ProfileHeader firstName={user.firstName} email={user.email} photos={user.photos} />
            <ProfileGallery photos={user.photos} />
            <ProfileDescription description={user.description} city={user.city} age={user.age} email={user.email} gender={user.gender} />
            <ProfileSubscription subscription={user.subscription}/>
          </Box>
      </Container>
    </GenericPage>
  );
};

export default ProfilePage;