import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const ChatDetailsPage = () => {
  const { id: chatId } = useParams<{ id: string }>();
  
  const chat = useSelector((state: RootState) =>
    state.chats.chats.find((c) => c.id === chatId)
  );

  if (!chat) {
    return <Typography variant="h6">Chat not found</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Chat with {chat.users[0]?.firstName || "Unknown"} {chat.users[0]?.lastName || "User"}
      </Typography>
      <List>
        {chat.messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText
              primary={message.text}
              secondary={`Sent by: ${message.user.firstName} ${message.user.lastName}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatDetailsPage;
