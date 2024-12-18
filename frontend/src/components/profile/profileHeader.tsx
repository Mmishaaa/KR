import { FC, useState } from "react";
import { Box, Grid, Avatar, Typography, IconButton, TextField, Button } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { updateUserAsync } from "../../../state/user/userSlice";

const ProfileHeader: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  const avatar = useSelector((state: RootState) => state.photo.photos?.filter(photo => photo.isAvatar === true)[0]);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const commonTypographyStyles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    textAlign: { xs: 'center', sm: 'left' },
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if(user) {
      dispatch(updateUserAsync( user?.id, { firstName, lastName} ));
      setIsEditing(false);
    }
  };

  return (
    <Box sx={{ mb: 3, position: 'relative' }}>
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
          {isEditing ? (
            <>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ ...commonTypographyStyles, fontWeight: 'bold' }}>
                {firstName} {lastName}
              </Typography>
              <Typography color="textSecondary" sx={commonTypographyStyles}>
                {user?.email}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      <IconButton
        aria-label="edit profile"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
        onClick={handleEditClick}
      >
        <CreateOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default ProfileHeader;
