import { Box, Card, CardContent, Grid, IconButton, TextField, Button, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import TextItem from "../../shared/UI/textItem.";
import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { updateUserAsync } from "../../../state/user/userSlice";

const ProfileDescription: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    description: user?.description || "",
    city: user?.city || "",
    age: user?.age || 0,
    email: user?.email || "",
    gender: user?.gender || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if(user) {
      dispatch(updateUserAsync(user?.id, formData));
      setEditMode(false);      
    }
  };

  const handleCancel = () => {
    setFormData({
      description: user?.description || "",
      city: user?.city || "",
      age: user?.age || 0,
      email: user?.email || "",
      gender: user?.gender || "NonSpecified",
    });
    setEditMode(false);
  };

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
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    value={formData.email}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
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
                <TextItem title="Where do you live?" content={user?.city} />
                <TextItem title="How old are you?" content={user?.age} />
                <TextItem title="What is your email?" content={user?.email} />
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
