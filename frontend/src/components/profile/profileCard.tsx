import { Card, CardContent, Typography, Box } from "@mui/material";
import { FC } from "react";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Carousel from "../carousel/carousel";
import { User } from "../../shared/interfaces/user";
import ActionButton from "../buttons/actionButton";

interface ProfileCardProps {
  user: User;
  onNextProfile: () => void;
}

const ProfileCard: FC<ProfileCardProps> = ({ user, onNextProfile }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
      <Box sx={{ position: "relative" }}>
        <Carousel photos={user.photos} />
      </Box>
      <CardContent sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }
      }>
        <Typography variant="h5" component="div" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {user.city}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {user.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {user.age}
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
