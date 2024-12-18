import { FC } from "react";
import { Box, Grid, Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

const ProfileHeader: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const avatar = useSelector((state: RootState) => state.photo.photos?.filter(photo => photo.isAvatar === true)[0]);

  const commonTypographyStyles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    textAlign: { xs: 'center', sm: 'left' },
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={3} container justifyContent={{ xs: 'center', sm: 'flex-start' }}>
          <Avatar
            sx={{
              width: { xs: 100, sm: 80 },
              height: { xs: 100, sm: 80 },
              mr: { xs: 0, sm: 2 },
              mb: { xs: 2, sm: 0 },
            }}
            src={import.meta.env.VITE_PLANE_API_URI + avatar?.photoURL}
          />
        </Grid>
        <Grid item xs={12} sm={9} container direction="column" alignItems="center">
          <Typography variant="h5" sx={{ ...commonTypographyStyles, fontWeight: 'bold' }}>
            {user?.firstName}
          </Typography>
          <Typography color="textSecondary" sx={commonTypographyStyles}>
            {user?.email}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileHeader;
