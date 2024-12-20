import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { FC, useState, useEffect } from "react";
import { RootState } from "../../../state/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileLocation: FC = () => {
  const navigate = useNavigate();
  const coordinates = useSelector((state: RootState) => state.coordinates.coordinates);
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    if (coordinates) {
      setLocation(coordinates.name);
    }
    console.log(location)
  }, [coordinates]);

  const handleEditLocation = () => {
    navigate("/map");
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Card variant="outlined" sx={{ position: 'relative' }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: "600" }}>Location</Typography>
              <Typography>{location || "No location set"}</Typography>
            </Box>
            <IconButton
              aria-label="edit location"
              onClick={handleEditLocation}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CreateOutlinedIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileLocation;
