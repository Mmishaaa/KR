import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { addMessageToChatAsync } from "../../state/chats/chatsSlice";
import { Box, Typography, List, ListItem, TextField, Button, Avatar } from "@mui/material";
import { MessageViewModel } from "../shared/interfaces/message";

const ChatDetailsPage = () => {
  const { id: chatId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [newMessage, setNewMessage] = useState("");
  
  const chat = useSelector((state: RootState) =>
    state.chats.chats.find((c) => c.id === chatId)
  );

  const user = useSelector((state: RootState) => state.user.user);

  if (!chat) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h6">Chat not found</Typography>
      </Box>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (chatId && user) {
      const message: MessageViewModel = {
        text: newMessage,
        chatId,
        senderId: user?.id,
      };

      dispatch(addMessageToChatAsync(message));
      setNewMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          padding: 2,
          background: "#fff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "#333" }}>
          Chat with {chat.users[0]?.firstName || "Unknown"} {chat.users[0]?.lastName || "User"}
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
          display: "flex",
          flexDirection: "column-reverse",
          gap: 2,
          background: "#f3f3f3",
        }}
      >
        <List sx={{ marginTop: "auto" }}>
          {chat.messages.map((message, index) => (
            <ListItem
              key={message.id}
              sx={{
                display: "flex",
                flexDirection: message.senderId === user?.id ? "row-reverse" : "row",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: message.senderId === user?.id ? "#3f51b5" : "#f50057",
                  color: "#fff",
                  width: 40,
                  height: 40,
                  fontSize: "1rem",
                }}
              >
                {message.user.firstName?.[0] || "U"}
              </Avatar>
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 4,
                  backgroundColor: message.senderId === user?.id ? "#3f51b5" : "#fff",
                  color: message.senderId === user?.id ? "#fff" : "#333",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                  maxWidth: "70%",
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", marginTop: 0.5, opacity: 0.6 }}
                >
                  {message.user.firstName} {message.user.lastName}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          display: "flex",
          padding: 2,
          background: "#fff",
          borderTop: "1px solid #e0e0e0",
          boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          label="Type a message"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
            },
          }}
        />
        <Button
          onClick={handleSendMessage}
          variant="contained"
          sx={{
            marginLeft: 2,
            borderRadius: "25px",
            padding: "10px 20px",
            background: "#3f51b5",
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatDetailsPage;
