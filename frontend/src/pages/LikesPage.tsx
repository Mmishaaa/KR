import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import GenericPage from "./GenericPage";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { fetchAllProfiles } from "../../state/profiles/profilesSlice";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { Photo } from "../shared/interfaces/photo";
import React from "react";


interface Profile {
  userId: string;
  userName: string;
  userLocation: string;
  userDescription: string;
  userAge: number;
  photos: { photoURL: string; isAvatar: boolean }[];
}

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

  const mutualLikes = likedProfiles.filter((profile) =>
    receivedLikes.some((like) => like.senderId === profile?.userId)
  );

  const [filter, setFilter] = useState<"sent" | "received" | "all" | "mutual">("all");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, [dispatch]);

  const handleFilterChange = (event: SelectChangeEvent<"sent" | "received" | "all" | "mutual">) => {
    const value = event.target.value as "sent" | "received" | "all" | "mutual";
    setFilter(value);
  };

  const handleOpenProfile = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(profilesToDisplay.map((profile) => ({
      Name: profile.userName,
      Location: profile.userLocation,
      Age: profile.userAge,
      Description: profile.userDescription,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Likes");
    XLSX.writeFile(workbook, "Likes.xlsx");
  };

  const exportToPDF = () => {
  const doc = new jsPDF();
  let y = 20;

  profilesToDisplay.forEach((profile) => {
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255);
    doc.text(`Name: ${profile.userName || "Unknown"}`, 10, y);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text(`Location: ${profile.userLocation || "Unknown"}`, 10, y + 10);
    doc.text(`Age: ${profile.userAge || "Unknown"}`, 10, y + 20);

    const description = `Description: ${profile.userDescription || "N/A"}`;
    const maxWidth = 180;
    const splitDescription = doc.splitTextToSize(description, maxWidth);

    splitDescription.forEach((line: string | string[], index: number) => {
      doc.text(line, 10, y + 30 + index * 10);
    });

    y += 40 + (splitDescription.length - 1) * 10;

    if (y > doc.internal.pageSize.height - 20) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("Likes.pdf");
};

  const exportToWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: profilesToDisplay.map((profile) =>
            new Paragraph({
              children: [
                new TextRun({ text: `Name: ${profile.userName}`, bold: true }),
                new TextRun(`\nLocation: ${profile.userLocation}`),
                new TextRun(`\nAge: ${profile.userAge}`),
                new TextRun(`\nDescription: ${profile.userDescription}\n`),
              ],
            })
          ),
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "Likes.docx");
  };

  if (isLoading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", marginTop: 5 }} />;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", marginTop: 3 }}>
        Error loading profiles: {error}
      </Typography>
    );
  }

  const profilesToDisplay = (() => {
    let combinedProfiles;
  
    if (filter === "sent") {
      combinedProfiles = likedProfiles.filter(profile => 
        !mutualLikes.some(mutual => mutual?.userId === profile?.userId)
      );
    } else if (filter === "received") {
      combinedProfiles = profilesWithReceivedLikes.filter(profile => 
        !mutualLikes.some(mutual => mutual?.userId === profile?.userId)
      );
    } else if (filter === "mutual") {
      combinedProfiles = mutualLikes;
    } else {
      combinedProfiles = [
        ...likedProfiles,
        ...profilesWithReceivedLikes
      ];
    }
  
    const uniqueProfilesMap = new Map();
    combinedProfiles.forEach((profile) => {
      if (profile) {
        uniqueProfilesMap.set(profile.userId, profile);
      }
    });
  
    return Array.from(uniqueProfilesMap.values());
  })();
  
  return (
    <GenericPage title="Likes">
      <Box sx={{ padding: 3 }}>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Filter Likes</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter Likes">
            <MenuItem value="sent">Sent Likes</MenuItem>
            <MenuItem value="received">Received Likes</MenuItem>
            <MenuItem value="mutual">Mutual Likes</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ marginBottom: 2, display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={exportToXLSX}>
            Export to XLSX
          </Button>
          <Button variant="contained" color="secondary" onClick={exportToPDF}>
            Export to PDF
          </Button>
          <Button variant="contained" color="success" onClick={exportToWord}>
            Export to Word
          </Button>
        </Box>
        
        {profilesToDisplay.length > 0 ? (
          <Grid container spacing={3}>
            {profilesToDisplay.map((profile) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={profile?.userId}
                onClick={() => handleOpenProfile(profile as Profile)}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxShadow: 3,
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      import.meta.env.VITE_PLANE_API_URI +
                      (profile?.photos?.find((photo: Photo) => photo.isAvatar)?.photoURL ||
                        profile?.photos[0]?.photoURL ||
                        "/default-profile.jpg")
                    }
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
                      {mutualLikes.some((mutual) => mutual?.userId === profile?.userId) ?   <Chip
                                label="Mutual"
                                color="success"
                                size="small"
                                sx={{ marginBottom: 1 }}
                              /> : (
                        <>
                          {(filter === "sent" || filter === "all") &&
                            sentLikes.some((like) => like.receiverId === profile?.userId) && (
                              <Chip
                                label="Liked by You"
                                color="primary"
                                size="small"
                                sx={{ marginRight: 1, marginBottom: 1 }}
                              />
                            )}
                          {(filter === "received" || filter === "all") &&
                            receivedLikes.some((like) => like.senderId === profile?.userId) && (
                              <Chip
                                label="Liked You"
                                color="secondary"
                                size="small"
                                sx={{ marginBottom: 1 }}
                              />
                            )}
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <Typography variant="h6" color="text.secondary">
              No profiles to display
            </Typography>
          </Box>
        )}
      </Box>

      <Dialog open={!!selectedProfile} onClose={handleCloseProfile} fullWidth maxWidth="sm">
        {selectedProfile && (
          <>
            <DialogTitle>{selectedProfile.userName}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                <strong>Location:</strong> {selectedProfile.userLocation}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Age:</strong> {selectedProfile.userAge}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Description:</strong> {selectedProfile.userDescription}
              </Typography>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {selectedProfile.photos.map((photo, index) => (
                  <Grid item xs={6} key={index}>
                    <img
                      src={import.meta.env.VITE_PLANE_API_URI + photo.photoURL}
                      alt={`Photo ${index + 1}`}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseProfile} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </GenericPage>
  );
};

export default LikesPage;

