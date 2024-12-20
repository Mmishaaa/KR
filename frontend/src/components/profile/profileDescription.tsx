import { Box, Card, CardContent, Grid, IconButton, TextField, Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import TextItem from "../../shared/UI/textItem.";
import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { updateUserAsync } from "../../../state/user/userSlice";

const ProfileDescription: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const coordinates = useSelector((state: RootState) => state.coordinates.coordinates);
  const isCoordinatesLoading = useSelector((state: RootState) => state.coordinates.isLoading);

  const dispatch = useDispatch<AppDispatch>();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    description: user?.description || "",
    city: user?.city || "",
    age: user?.age || 0,
    gender: user?.gender || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (user) {
      dispatch(updateUserAsync(user.id, formData));
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      description: user?.description || "",
      city: coordinates?.name || user?.city || "",
      age: user?.age || 0,
      gender: user?.gender || "NonSpecified",
    });
    setEditMode(false);
  };

  if (isCoordinatesLoading) {
    return <Typography>Loading coordinates...</Typography>;
  }

  return (
    <Box sx={{ mb: 3, position: "relative" }}>
      <Card variant="outlined">
        <CardContent>
          <IconButton
            aria-label="edit profile"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
            onClick={() => setEditMode((prev) => !prev)}
          >
            <CreateOutlinedIcon />
          </IconButton>
          <Grid container spacing={2}>
            {editMode ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    value={coordinates?.name}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    fullWidth
                    InputProps={{
                      readOnly: true, 
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    fullWidth
                    inputProps={{
                      min: 1,
                      max: 100,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                    >
                      <MenuItem value="NonSpecified">Non-Specified</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Stack>
                </Grid>
              </>
            ) : (
              <>
                <TextItem title="Some things people should know about you" content={user?.description} noEllipsis />
                <TextItem title="Where do you live?" content={coordinates?.name || user?.city || "Not available"} />
                <TextItem title="How old are you?" content={user?.age} />
                <TextItem title="What is your gender?" content={user?.gender} />
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileDescription;
