import { models } from "../src/models/models.js"

const { User, Chat, Message, Photo } = models;
class ChatController {
  async createAsync(req, res) {
    try {
      const newChat = await Chat.create({});
      res.json({ msg: "Chat created successfully", chat: newChat });
    } catch (error) {
      res.status(500).json({ msg: "Error creating chat", error });
    }
  }
  

  async deleteAsync(req, res) {
    try {
      const { id } = req.params;
      const chat = await Chat.destroy({ where: { id } });
      if (chat) {
        res.json({ msg: "Chat deleted successfully" });
      } else {
        res.status(404).json({ msg: "Chat not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error deleting chat", error });
    }
  }
  

  async getByIdAsync(req, res) {
    try {
      const { id } = req.params;
      const chat = await Chat.findOne({
        where: { id },
        include: [
          { model: Message, as: 'messages' },
          { 
            model: User,
            as: 'users',
            include: [
              {
                model: Photo,
                as: 'photos',
                attributes: ['id', 'photoURL', 'isAvatar']
              }
            ]
          } 
        ]
      });
      if (chat) {
        res.json(chat);
      } else {
        res.status(404).json({ msg: "Chat not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error fetching chat", error });
    }
  }
  

  async getAllAsync(req, res) {
    try {
      const chats = await Chat.findAll({
        include: [
          { model: Message, as: 'messages' },
          { model: User, as: 'users' }
        ]
      });
      res.json(chats);
    } catch (error) {
      res.status(500).json({ msg: "Error fetching chats", error });
    }
  }
  

  async updateAsync(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const chat = await Chat.findOne({ where: { id } });
  
      if (chat) {
        chat.name = name || chat.name;
        await chat.save();
        res.json({ msg: "Chat updated successfully", chat });
      } else {
        res.status(404).json({ msg: "Chat not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error updating chat", error });
    }
  }
  

  async getAllChatsByUserIdAsync(req, res) {
    try {
      const { userId } = req.params;
  
      const user = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Chat,
            as: 'chats',
            include: [
              {
                model: Message,
                as: 'messages',
                include: [
                  {
                    model: User,
                    as: 'user',
                    include: [
                      {
                        model: Photo,
                        as: 'photos',
                        attributes: ['id', 'photoURL', 'isAvatar']
                      }
                    ]
                  }
                ],
              },
              {
                model: User,
                as: 'users',
                include: [
                  {
                    model: Photo,
                    as: 'photos',
                    attributes: ['id', 'photoURL', 'isAvatar']
                  }
                ]
              }
            ]
          }
        ]
      });
  
      if (user) {
        const chats = user.chats.map(chat => ({
          ...chat.toJSON(),
          users: chat.users.filter(u => u.id !== userId)
        }));
  
        res.json(chats);
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      res.status(500).json({ msg: "Error fetching user's chats", error: error.message || error });
    }
  }
  
  
}

export default new ChatController();