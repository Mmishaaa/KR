import { useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { getAllChatsByUserId } from "../../state/chats/chatsSlice";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import NotificationsNoneSharpIcon from "@mui/icons-material/NotificationsNoneSharp";
import GenericPage from "./GenericPage";

import { useNavigate } from "react-router-dom";

const ChatsPage: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(getAllChatsByUserId(user?.id));
    }
  }, [dispatch]);

  return (
    <GenericPage title="Chats" icons={[<NotificationsNoneSharpIcon key="notification-icon" />]}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Chats
        </Typography>
        <List>
          {chats.map((chat) => (
            <ListItem
              key={chat.id}
              sx={{ padding: "10px 0", cursor: "pointer" }}
              onClick={() => navigate(`/chats/${chat.id}`)}
            >
              <ListItemAvatar>
                <Avatar
                  src={
                    chat.users[0]?.photos?.find(photo => photo.isAvatar)?.photoURL
                      ? import.meta.env.VITE_PLANE_API_URI + chat.users[0]?.photos?.find(photo => photo.isAvatar)?.photoURL
                      : null
                  }
                >
                  {chat.users[0]?.firstName?.[0] || "U"}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${chat.users[0]?.firstName || "Unknown"} ${chat.users[0]?.lastName || "User"}`}
                secondary={
                  chat.messages.length
                    ? chat.messages[0].text
                    : "No messages yet"
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </GenericPage>
  );
};


export default ChatsPage;
