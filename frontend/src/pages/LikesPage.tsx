import { Box, Typography, Grid, Card, CardContent, CardMedia, CircularProgress, Select, MenuItem, InputLabel, FormControl, Chip, SelectChangeEvent } from "@mui/material";
import GenericPage from "./GenericPage";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { fetchAllProfiles } from "../../state/profiles/profilesSlice";

const LikesPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profiles, isLoading, error } = useSelector((state: RootState) => state.profiles);
  const { user } = useSelector((state: RootState) => state.user);

  const currentUserProfile = profiles?.find((profile) => profile.userId === user?.id);

  const sentLikes = currentUserProfile?.sentLikes || [];
  const receivedLikes = currentUserProfile?.receivedLikes || [];

  const likedProfiles = sentLikes
    .map((like) => profiles?.find((profile) => profile.userId === like.receiverId))
    .filter((profile) => profile);

  const profilesWithReceivedLikes = receivedLikes
    .map((like) => profiles?.find((profile) => profile.userId === like.senderId))
    .filter((profile) => profile);

  const [filter, setFilter] = useState<"sent" | "received" | "all">("all");

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, [dispatch]);

  const handleFilterChange = (event: SelectChangeEvent<"sent" | "received" | "all">) => {
    const value = event.target.value as "sent" | "received" | "all";
    setFilter(value);
  };

  if (isLoading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", marginTop: 5 }} />;
  }

  if (error) {
    return <Typography color="error" sx={{ textAlign: "center", marginTop: 3 }}>Error loading profiles: {error}</Typography>;
  }

  const profilesToDisplay = filter === "sent"
    ? likedProfiles
    : filter === "received"
    ? profilesWithReceivedLikes
    : [...likedProfiles, ...profilesWithReceivedLikes];

  return (
    <GenericPage title="Likes">
      <Box sx={{ padding: 3 }}>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Filter Likes</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter Likes">
            <MenuItem value="sent">Sent Likes</MenuItem>
            <MenuItem value="received">Received Likes</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </Select>
        </FormControl>

        {profilesToDisplay.length > 0 ? (
          <Grid container spacing={3}>
            {profilesToDisplay.map((profile) => (
              <Grid item xs={12} sm={6} md={4} key={profile?.userId}>
                <Card sx={{ display: "flex", flexDirection: "column", height: "100%", boxShadow: 3, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={import.meta.env.VITE_PLANE_API_URI + (profile?.photos?.find((photo) => photo.isAvatar)?.photoURL || profile?.photos[0].photoURL || "/default-profile.jpg")}
                    alt={`${profile?.userName}`}
                    sx={{ objectFit: "cover", borderRadius: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {profile?.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {profile?.userDescription || "No description available"}
                    </Typography>
                    <Box sx={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
                      {filter === "sent" || filter === "all" ? (
                        sentLikes.some((like) => like.receiverId === profile?.userId) && (
                          <Chip label="Liked by You" color="primary" size="small" sx={{ marginRight: 1, marginBottom: 1 }} />
                        )
                      ) : null}
                      {filter === "received" || filter === "all" ? (
                        receivedLikes.some((like) => like.senderId === profile?.userId) && (
                          <Chip label="Liked You" color="secondary" size="small" sx={{ marginBottom: 1 }} />
                        )
                      ) : null}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <Typography variant="h6" color="text.secondary">No profiles to display</Typography>
          </Box>
        )}
      </Box>
    </GenericPage>
  );
};

export default LikesPage;
