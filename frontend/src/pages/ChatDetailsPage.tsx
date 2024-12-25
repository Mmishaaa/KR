import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { addMessageToChatAsync, getAllChatsByUserId, getChatByIdAsync } from "../../state/chats/chatsSlice";
import { Box, Typography, List, ListItem, TextField, Button, Avatar, IconButton } from "@mui/material";
import { MessageViewModel } from "../shared/interfaces/message";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={index} style={{ backgroundColor: "#ffeb3b", fontWeight: "bold" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

const ChatDetailsPage = () => {
  const { id: chatId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(false);

  const navigate = useNavigate();

  const chat = useSelector((state: RootState) =>
    state.chats.chats.find((c) => c.id === chatId)
  );

  const user = useSelector((state: RootState) => state.user.user);

  const messageRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (searchQuery && messageRefs.current.length > 0) {
      const matchingMessages = chat?.messages.filter((message) =>
        message.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (matchingMessages && matchingMessages.length > 0) {
        const currentRef = messageRefs.current[currentMessageIndex];
        if (currentRef) {
          currentRef.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [searchQuery, chat?.messages, currentMessageIndex]);

  if (!chat) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h6">Chat not found</Typography>
      </Box>
    );
  }

  const handleBack = () => {
    navigate("/chats");
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    if (chatId && user) {
      const message: MessageViewModel = {
        text: newMessage,
        chatId,
        senderId: user?.id,
      };

      await dispatch(addMessageToChatAsync(message));
      await dispatch(getAllChatsByUserId(user.id))
      setNewMessage("");
      setForceUpdate(!forceUpdate);
    }
  };

  const filteredMessages = chat.messages.filter((message) =>
    message.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          padding: "12px 24px",
          background: "linear-gradient(135deg, #f9f9f9, #f1f1f1)",
          boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.1)",
          borderBottom: "2px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "12px",
          maxWidth: "100%",
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            backgroundColor: "#f7f7f7",
            borderRadius: "50%",
            padding: "10px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 30, color: "#5C6BC0" }} />
        </IconButton>

        <Typography
          variant="h5"
          sx={{
            color: "#333",
            fontWeight: 700,
            fontFamily: "'Roboto', sans-serif",
            marginLeft: 2,
            letterSpacing: "0.5px",
            textAlign: "right",
          }}
        >
          Chat with {chat.users[0]?.firstName || "Unknown"} {chat.users[0]?.lastName || "User"}
        </Typography>
      </Box>

      <Box sx={{ padding: "8px 24px", background: "#fff", borderBottom: "1px solid #e0e0e0" }}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          label="Search messages"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
            },
          }}
        />
      </Box>

      <Box sx={{ padding: "8px 24px", background: "#fff" }}>
        {searchQuery ? (
          <Typography variant="subtitle2" color="textSecondary">
            {filteredMessages.length} {filteredMessages.length === 1 ? "message" : "messages"} found
          </Typography>
        ) : null}
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
              ref={(el) => (messageRefs.current[index] = el)}
              sx={{
                display: "flex",
                flexDirection: message.senderId === user?.id ? "row-reverse" : "row",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Avatar
                src={message.user?.photos?.find((photo) => photo.isAvatar)?.photoURL
                  ? `${import.meta.env.VITE_PLANE_API_URI}${message.user.photos.find((photo) => photo.isAvatar)?.photoURL}`
                  : message.user?.photos?.[0]?.photoURL
                  ? `${import.meta.env.VITE_PLANE_API_URI}${message.user.photos[0].photoURL}`
                  : undefined
                }
                sx={{
                  bgcolor: message.senderId === user?.id ? "#3f51b5" : "#f50057",
                  color: "#fff",
                  width: 40,
                  height: 40,
                  fontSize: "1rem",
                }}
              >
                {message.user?.firstName?.[0] || "U"}
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
                <Typography variant="body1">
                  {highlightText(message.text, searchQuery)}
                </Typography>
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

        {filteredMessages.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
              marginTop: 2,
            }}
          >
            {/* <IconButton onClick={handlePreviousMessage}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={handleNextMessage}>
              <ArrowForwardIcon />
            </IconButton> */}
          </Box>
        )}
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
