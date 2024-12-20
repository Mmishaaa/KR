import { Card, CardContent, Typography, Box } from "@mui/material";
import { FC } from "react";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Carousel from "../carousel/carousel";
import ActionButton from "../buttons/actionButton";
import { Profile } from "../../shared/interfaces/profiles";

interface ProfileCardProps {
  profile: Profile;
  onNextProfile: () => void;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile, onNextProfile }) => {
  console.log("profile: " + profile.photos)

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
      <Box sx={{ position: "relative" }}>
        <Carousel photos={profile?.photos} />
      </Box>
      <CardContent sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }
      }>
        <Typography variant="h5" component="div" gutterBottom>
          {profile.userName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {profile.userLocation}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {profile.userDescription}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {profile.userAge}
        </Typography>
          <Box display="flex" gap={2} justifyContent="center">
            <ActionButton icon={<FavoriteIcon fontSize="large" />} onClick={onNextProfile} />
            <ActionButton icon={<CloseIcon fontSize="large" />} onClick={onNextProfile} />
          </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
