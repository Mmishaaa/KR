import GenericPage from "./GenericPage";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";
import { RootState, AppDispatch } from "../../state/store";
import {
  fetchAllProfiles,
  removeProfile,
} from "../../state/profiles/profilesSlice";
import { Button, Typography, Box } from "@mui/material";

const AdminPage: FC = () => {
  const { profiles, isLoading, error } = useSelector((state: RootState) => state.profiles);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, [dispatch]);

  const handleRemoveUser = (userId: string) => {
    dispatch(removeProfile(userId));
  };

  return (
    <GenericPage title="Admin">
      {isLoading && <Typography>Loading profiles...</Typography>}
      {error && <Typography>Error: {error}</Typography>}
      {!isLoading && !error && profiles && profiles?.length > 0 && (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            User Profiles
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {profiles?.map((profile) => (
              <Box
                key={profile.userId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 2,
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              >
                <Typography>{profile?.userName}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveUser(profile.userId)}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      {!isLoading && profiles?.length === 0 && (
        <Typography>No profiles found.</Typography>
      )}
    </GenericPage>
  );
};

export default AdminPage;
