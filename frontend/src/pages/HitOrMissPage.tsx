import { Box, Container, Grid, Typography } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import GenericPage from "./GenericPage";
import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/profile/profileCard";
import { AppDispatch, RootState } from "../../state/store";
import { fetchAllProfiles } from "../../state/profiles/profilesSlice";

const HitOrMissPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const { profiles, isLoading, error } = useSelector((state: RootState) => state.profiles);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, [dispatch]);

  const filteredProfiles = profiles?.filter((profile) => profile.userId !== user?.id);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!filteredProfiles || filteredProfiles.length === 0) {
    return <Typography>No profiles found.</Typography>;
  }

  const showNextProfile = () => {
    if (filteredProfiles.length > 0) {
      if (currentIndex < filteredProfiles.length - 1) {
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
          {filteredProfiles.length > 0 ? (
            <ProfileCard profile={filteredProfiles[currentIndex]} onNextProfile={showNextProfile} />
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
