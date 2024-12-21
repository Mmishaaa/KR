import { Box, Container, Typography, Button } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import GenericPage from "./GenericPage";
import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/profile/profileCard";
import { AppDispatch, RootState } from "../../state/store";
import { fetchAllProfiles, setProfiles } from "../../state/profiles/profilesSlice";

const HitOrMissPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const { profiles, isLoading, error: profilesError } = useSelector((state: RootState) => state.profiles);
  const { error: likesError } = useSelector((state: RootState) => state.likes);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, [dispatch]);

  console.log("error: " + profilesError)

  const profilesWithoutUser = profiles?.filter((p) => p.userId !== user?.id);

  const unlikedProfiles = profilesWithoutUser//profilesWithoutUser?.filter((profile) => !profile?.receivedLikes?.some((like) => like.senderId === user?.id));

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (profilesError || likesError) {
    return (
      <Typography>Error: {profilesError || likesError}</Typography>
    );
  }

  const reloadProfiles = () => {
    dispatch(fetchAllProfiles());
    setCurrentIndex(0);
  };

  if (!unlikedProfiles  || unlikedProfiles .length === 0) {
    return (
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 2,
        backgroundColor: '#f8f9fa',
        borderRadius: 2,
        boxShadow: 3,
      }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: '#6c757d',
            textAlign: 'center',
            marginBottom: 2,
          }}
        >
          You've seen all the profiles!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={reloadProfiles}
          sx={{
            backgroundColor: '#007bff',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: 3,
            boxShadow: 3,                
          }}
        >
          Reload Profiles
        </Button>
      </Box>
    );
  }

  const showNextProfile = () => {
    if (unlikedProfiles .length > 0) {
      unlikedProfiles .splice(currentIndex, 1);
      dispatch(setProfiles(unlikedProfiles ));

      if (currentIndex < unlikedProfiles .length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    } else {
      console.warn("Filtered profiles are empty");
    }
  };

  return (
    <GenericPage title="Hit or Miss" icons={[<TuneIcon />]}>
      <Container maxWidth="sm" sx={{ margin: "32px 0", '@media (min-width:600px)': { padding: 0 } }}>
        <Box sx={{ backgroundColor: '#fff', padding: 2, borderRadius: "24px", boxShadow: 3 }}>
          {unlikedProfiles .length > 0 ? (
            <ProfileCard profile={unlikedProfiles [currentIndex]} onNextProfile={showNextProfile} />
          ) : (
            <Box sx={{ textAlign: 'center', padding: 2 }}>
              <Typography variant="h6">No profiles available</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </GenericPage>
  );
};

export default HitOrMissPage;
