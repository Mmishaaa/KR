import GenericPage from "./GenericPage";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../state/store";
import { fetchAllProfiles, removeProfile } from "../../state/profiles/profilesSlice";
import { updateSubscriptionAsync } from "../../state/subscription/subscriptionSlice";
import { updateRoleAsync } from "../../state/user/userSlice";
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
import { UserRole } from "../shared/enums/userRole";
import { RoleViewModel } from "../shared/interfaces/role";

const AdminPage: FC = () => {
  const { profiles, isLoading, error } = useSelector((state: RootState) => state.profiles);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newSubscriptionType, setNewSubscriptionType] = useState<SubscriptionType>(SubscriptionType.BASIC);
  const [newRole, setNewRole] = useState<UserRole>(UserRole.USER);

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, [dispatch]);

  const handleRemoveUser = (userId: string) => {
    dispatch(removeProfile(userId));
  };

  const handleDialogOpen = (userId: string, currentSubscriptionType: SubscriptionType) => {
    setSelectedUserId(userId);
    setNewSubscriptionType(currentSubscriptionType);
    setIsDialogOpen(true);
  };

  const handleDialogOpenRole = (userId: string, currentRole: UserRole) => {
    setSelectedUserId(userId);
    setNewRole(currentRole);
    setIsRoleDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsRoleDialogOpen(false);
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

  const handleUpdateRole = () => {
    if (selectedUserId) {
      const roleViewModel: RoleViewModel = {
        userId: selectedUserId,
        role: newRole,
      };

      dispatch(updateRoleAsync(roleViewModel)).then(() => {
        dispatch(fetchAllProfiles());
      });

      setIsRoleDialogOpen(false);
    }
  };

  const sortedProfiles = [...profiles]?.sort((a, b) => {
    if (user && a.userId === user.id) return -1;
    if (user && b.userId === user.id) return 1;
    return 0;
  });

  return (
    <GenericPage title="Admin">
      {isLoading && <Typography>Loading profiles...</Typography>}
      {error && <Typography>Error: {error}</Typography>}
      {!isLoading && !error && profiles && profiles?.length > 0 && (
        <Box sx={{ padding: 2, backgroundColor: "#f7f7f7" }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
            User Profiles
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sortedProfiles?.map((profile) => {
              const isCurrentUser = user?.id === profile.userId;
              return (
                <Card
                  key={profile.userId}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    position: "relative",
                    backgroundColor: isCurrentUser ? "#e1f5fe" : "#ffffff",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {isCurrentUser && (
                    <Typography
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      It's your profile
                    </Typography>
                  )}

                  <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="h6" sx={{ color: "#333", fontWeight: isCurrentUser ? "bold" : "normal" }}>
                      {profile?.userName}
                    </Typography>
                    <Typography sx={{ color: "#555" }}>Subscription Type: {profile?.subscription.subscriptionType}</Typography>
                    <Typography sx={{ color: "#555" }}>Role: {profile?.userRole}</Typography>
                    <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => handleDialogOpen(profile.userId, profile.subscription.subscriptionType)}
                        sx={{
                          backgroundColor: "#9c27b0",
                          "&:hover": { backgroundColor: "#7b1fa2" },
                          minWidth: "120px",
                          padding: "8px 16px",
                        }}
                      >
                        Change Subscription
                      </Button>

                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleDialogOpenRole(profile.userId, profile?.userRole)}
                        sx={{
                          backgroundColor: "#5c6bc0",
                          "&:hover": { backgroundColor: "#3f51b5" },
                          minWidth: "120px",
                          padding: "8px 16px",
                        }}
                      >
                        Change Role
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleRemoveUser(profile.userId)}
                        sx={{
                          backgroundColor: "#f06292",
                          "&:hover": { backgroundColor: "#ec407a" },
                          minWidth: "120px",
                          padding: "8px 16px",
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>
      )}
      {!isLoading && profiles?.length === 0 && <Typography>No profiles found.</Typography>}

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold", color: "#333" }}>
          Update Subscription
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#f7f7f7" }}>
          <Select
            value={newSubscriptionType}
            onChange={(e) => setNewSubscriptionType(e.target.value as SubscriptionType)}
            fullWidth
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              padding: "8px",
              color: "#333",
            }}
          >
            <MenuItem value={SubscriptionType.BASIC}>Basic</MenuItem>
            <MenuItem value={SubscriptionType.PREMIUM}>Premium</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#f7f7f7" }}>
          <Button onClick={handleDialogClose} sx={{ color: "#757575" }}>Cancel</Button>
          <Button
            onClick={handleUpdateSubscription}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#03a9f4", "&:hover": { backgroundColor: "#0288d1" } }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isRoleDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold", color: "#333" }}>
          Update Role
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#f7f7f7" }}>
          <Select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as UserRole)}
            fullWidth
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              padding: "8px",
              color: "#333",
            }}
          >
            <MenuItem value={UserRole.USER}>User</MenuItem>
            <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#f7f7f7" }}>
          <Button onClick={handleDialogClose} sx={{ color: "#757575" }}>Cancel</Button>
          <Button
            onClick={handleUpdateRole}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#03a9f4", "&:hover": { backgroundColor: "#0288d1" } }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </GenericPage>
  );
};

export default AdminPage;
