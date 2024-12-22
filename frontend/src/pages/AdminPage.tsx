import GenericPage from "./GenericPage";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../state/store";
import { fetchAllProfiles, removeProfile } from "../../state/profiles/profilesSlice";
import { updateSubscriptionAsync } from "../../state/subscription/subscriptionSlice";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { SubscriptionType } from "../shared/enums/subscriptionType";

const AdminPage: FC = () => {
  const { profiles, isLoading, error } = useSelector((state: RootState) => state.profiles);
  const dispatch = useDispatch<AppDispatch>();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newSubscriptionType, setNewSubscriptionType] = useState<SubscriptionType>(SubscriptionType.BASIC);

  useEffect(() => {
    dispatch(fetchAllProfiles()); // Fetch profiles on component mount
  }, [dispatch]);

  const handleRemoveUser = (userId: string) => {
    dispatch(removeProfile(userId));
  };

  const handleDialogOpen = (userId: string, currentSubscriptionType: SubscriptionType) => {
    setSelectedUserId(userId);
    setNewSubscriptionType(currentSubscriptionType);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleUpdateSubscription = () => {
    if (selectedUserId) {
      const subscriptionViewModel = {
        userId: selectedUserId,
        subscriptionType: newSubscriptionType,
      };

      dispatch(updateSubscriptionAsync(subscriptionViewModel)).then(() => {
        dispatch(fetchAllProfiles());
      });

      setIsDialogOpen(false);
    }
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
              <Card
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
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="h6">{profile?.userName}</Typography>
                  <Typography>Subscription Type: {profile?.subscription.subscriptionType}</Typography>
                  <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleDialogOpen(profile.userId, profile.subscription.subscriptionType)}
                    >
                      Change Subscription
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveUser(profile.userId)}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
      {!isLoading && profiles?.length === 0 && <Typography>No profiles found.</Typography>}

      {/* Subscription Change Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Subscription</DialogTitle>
        <DialogContent>
          <Select
            value={newSubscriptionType}
            onChange={(e) => setNewSubscriptionType(e.target.value as SubscriptionType)}
            fullWidth
          >
            <MenuItem value={SubscriptionType.BASIC}>Basic</MenuItem>
            <MenuItem value={SubscriptionType.PREMIUM}>Premium</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleUpdateSubscription}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </GenericPage>
  );
};

export default AdminPage;
