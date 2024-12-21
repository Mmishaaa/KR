import { Card, CardContent, Typography, Box } from "@mui/material";
import { FC } from "react";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Carousel from "../carousel/carousel";
import ActionButton from "../buttons/actionButton";
import { Profile } from "../../shared/interfaces/profiles";
import { AppDispatch, RootState } from "../../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { createLike } from "../../../state/likes/likesSlice";

interface ProfileCardProps {
  profile: Profile;
  onNextProfile: () => void;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile, onNextProfile }) => {
  const senderId = useSelector((state: RootState) => state.user.user?.id) 

  const dispatch = useDispatch<AppDispatch>();

  const handleLike = async () => {
    try {
      if(senderId) {
        dispatch(createLike({
          senderId,
          receiverId: profile.userId
        }))
        onNextProfile()
      }
    } catch (error) {
      console.error('Error while liking the profile:', error);
    }
  };

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
            <ActionButton icon={<FavoriteIcon fontSize="large" />} onClick={handleLike} />
            <ActionButton icon={<CloseIcon fontSize="large" />} onClick={onNextProfile} />
          </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
