import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map, YMaps, Placemark } from "@pbe/react-yandex-maps";
import { AppDispatch, RootState } from "../../state/store";
import { Button, Typography, Box } from "@mui/material";
import { CoordinatesViewModel } from "../shared/interfaces/coordinates";
import { addCoordinates, fetchCoordinatedByUserId, putCoordinates, updateCoordinates } from "../../state/coordinates/coordinatesSlice";
import GenericPage from "./GenericPage";
import { useNavigate } from "react-router-dom";
import React from "react";

const MapPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userId = useSelector((state: RootState) => state.user.user?.id);
  const existingCoordinates = useSelector((state: RootState) => state.coordinates.coordinates);

  const [marker, setMarker] = useState<[number, number] | null>(null);
  const [markerName, setMarkerName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    if (existingCoordinates) {
      setMarker([existingCoordinates.lat, existingCoordinates.lng]);
      setMarkerName(existingCoordinates.name);
      setIsUpdateMode(true);
    } else {
      if(userId) {
        dispatch(fetchCoordinatedByUserId(userId));
      }
      setIsUpdateMode(false);
    }
  }, [existingCoordinates]);

  const handleMapClick = async (event: ymaps.IEvent) => {
    try {
      const coordinates = event.get("coords");
      setMarker(coordinates);
      setErrorMessage("");  
      await getMarkerName(coordinates);
    } catch (error) {
      console.error("Error handling map click:", error);
    }
  };

  const getMarkerName = async (coordinates: [number, number]) => {
    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${
          import.meta.env.VITE_YMAP_KEY
        }&geocode=${coordinates[1]},${coordinates[0]}&format=json`
      );
      const data = await response.json();
      const featureMember =
        data.response.GeoObjectCollection.featureMember;
      if (featureMember.length > 0) {
        const address =
          featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address
            .formatted;
        setMarkerName(address);
      } else {
        setMarkerName("Unknown location");
      }
    } catch (error) {
      console.error("Failed to fetch marker name:", error);
      setMarkerName("Error fetching address");
    }
  };

  const handleSubmit = () => {
    if (!marker) {
      setErrorMessage("Please select a location on the map.");
      return;
    }

    if(userId) {
      const coordinates: CoordinatesViewModel = {
        userId,
        lng: marker[1],
        lat: marker[0],
        name: markerName
      };

      if (isUpdateMode && existingCoordinates) {
        dispatch(putCoordinates(existingCoordinates.id, coordinates, navigate));
      } else {
        dispatch(addCoordinates(coordinates, navigate));
      }
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <GenericPage title={isUpdateMode ? "Update Location" : "Set Location"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {isUpdateMode ? "Update Your Location" : "Set Your Location"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {isUpdateMode
            ? "You can update your existing location or select a new one."
            : "Please specify your location on the map below to continue."
          }
        </Typography>
        <YMaps>
          <Map
            defaultState={{
              center: [53.895493, 30.335613],
              zoom: 11,
            }}
            width={"100%"}
            height={400}
            onClick={handleMapClick}
          >
            {marker && <Placemark geometry={marker} />}
          </Map>
        </YMaps>
        {errorMessage && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 4 }}
            onClick={handleSubmit}
          >
            {isUpdateMode ? "Update Location" : "Submit Location"}
          </Button>
          {isUpdateMode && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ px: 4 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </GenericPage>
  );
};

export default MapPage;
