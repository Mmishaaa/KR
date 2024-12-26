import {
  Box,
  Container,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import GenericPage from "./GenericPage";
import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/profile/profileCard";
import { AppDispatch, RootState } from "../../state/store";
import { fetchAllProfiles, setProfiles } from "../../state/profiles/profilesSlice";

const HitOrMissPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<"ALL" | "Male" | "Female">("ALL");
  const [sortOrder, setSortOrder] = useState<"Ascending" | "Descending">(
    "Ascending"
  );

  const { profiles, isLoading, error: profilesError } = useSelector(
    (state: RootState) => state.profiles
  );
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, [dispatch]);

  const profilesWithoutUser = profiles?.filter((p) => p.userId !== user?.id) || [];

  const unlikedProfiles = profilesWithoutUser.filter(
    (profile) =>
      !profile?.receivedLikes?.some((like) => like.senderId === user?.id)
  );

  const filteredProfiles = unlikedProfiles
    ?.filter((profile) => {
      if (filter === "Male") return profile.gender === "Male";
      if (filter === "Female") return profile.gender === "Female";
      return true;
    })
    ?.sort((a, b) => {
      if (!a.userAge || !b.userAge) return 0; // Avoid undefined exception
      return sortOrder === "Ascending" ? a.userAge - b.userAge : b.userAge - a.userAge;
    });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (profilesError) {
    return <Typography>Error: {profilesError}</Typography>;
  }

  const reloadProfiles = () => {
    dispatch(fetchAllProfiles());
    setCurrentIndex(0);
  };

  if (!filteredProfiles || filteredProfiles.length === 0) {
    return (
      <GenericPage title="HitOrMiss">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            padding: 2,
            backgroundColor: "#f8f9fa",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "#6c757d",
              textAlign: "center",
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
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            Reload Profiles
          </Button>
        </Box>
      </GenericPage>
    );
  }

  const showNextProfile = () => {
    if (filteredProfiles.length > 0) {
      filteredProfiles.splice(currentIndex, 1);
      dispatch(setProfiles(filteredProfiles ));

      if (currentIndex < filteredProfiles .length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      //setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredProfiles.length);
    } else {
      console.warn("Filtered profiles are empty");
    }
  };

  return (
    <GenericPage title="Hit or Miss" icons={[<TuneIcon />]}>
      <Container
        maxWidth="sm"
        sx={{ margin: "32px 0", "@media (min-width:600px)": { padding: 0 } }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, newFilter) => setFilter(newFilter || "ALL")}
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <ToggleButton value="ALL">All</ToggleButton>
            <ToggleButton value="Male">Male</ToggleButton>
            <ToggleButton value="Female">Female</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={sortOrder}
            exclusive
            onChange={(e, newSortOrder) => setSortOrder(newSortOrder || "Ascending")}
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <ToggleButton value="Ascending">Age: Ascending</ToggleButton>
            <ToggleButton value="Descending">Age: Descending</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {
          console.log("filteredProfiles: ", filteredProfiles)
        }
        {
          console.log("currentIndex: ", currentIndex)
        }
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: 2,
            borderRadius: "24px",
            boxShadow: 3,
          }}
        >
          {filteredProfiles.length > 0 ? (
            <ProfileCard
              profile={filteredProfiles[currentIndex]}
              onNextProfile={showNextProfile}
            />
          ) : (
            <Box sx={{ textAlign: "center", padding: 2 }}>
              <Typography variant="h6">No profiles available</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </GenericPage>
  );
};

export default HitOrMissPage;
