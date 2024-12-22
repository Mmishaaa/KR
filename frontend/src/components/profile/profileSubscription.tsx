import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { FC, useState, useEffect } from "react";
import moment from "moment";
import { AppDispatch, RootState } from "../../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { updateSubscriptionAsync } from "../../../state/subscription/subscriptionSlice";
import { SubscriptionViewModel } from "../../shared/interfaces/subscription";
import { SubscriptionType } from "../../shared/enums/subscriptionType";

const ProfileSubscription: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const subscription = useSelector((state: RootState) => state.subscription.subscription);
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const error = useSelector((state: RootState) => state.user.error);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSubscriptionType, setNewSubscriptionType] = useState<SubscriptionType>(
    subscription?.subscriptionType || SubscriptionType.BASIC
  );

  const formatDate = (dateString: Date) => {
    return moment(dateString).format("DD.MM.YYYY");
  };

  const handleDialogOpen = () => {
    setNewSubscriptionType(subscription?.subscriptionType || SubscriptionType.BASIC);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleUpdateSubscription = () => {
    if (user) {
      const subscriptionViewModel: SubscriptionViewModel = {
        userId: user.id,
        subscriptionType: newSubscriptionType,
      };
      dispatch(updateSubscriptionAsync(subscriptionViewModel));
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    setNewSubscriptionType(subscription?.subscriptionType || SubscriptionType.BASIC);
  }, [subscription]);

  return (
    <Box sx={{ mb: 3 }}>
      <Card variant="outlined" sx={{ position: "relative" }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: "600" }}>
                Subscription
              </Typography>
              <Typography>Type: {String(subscription?.subscriptionType)}</Typography>
              <Typography>
                Expires: {subscription?.expiresAt && formatDate(subscription?.expiresAt)}
              </Typography>
            </Box>
            <IconButton
              aria-label="manage subscription"
              onClick={handleDialogOpen}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CreateOutlinedIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Subscription</DialogTitle>
        <DialogContent>
          <Select
            value={newSubscriptionType}
            onChange={(e) => setNewSubscriptionType(e.target.value as SubscriptionType)}
            fullWidth
          >
            <MenuItem value={SubscriptionType.BASIC}>Basic</MenuItem>
            <MenuItem value={SubscriptionType.PREMIUM}>Premium</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleUpdateSubscription}
            variant="contained"
            color="primary"
            disabled={isLoading} 
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default ProfileSubscription;
