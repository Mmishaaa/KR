import { models } from "../src/models/models.js";

const { Message } = models;

class MessageController {
  async createAsync(req, res) {
    try {
      const { text, chatId, senderId } = req.body;
  
      if (!text || !chatId || !senderId) {
        return res.status(400).json({ msg: "Text, chatId, and senderId are required" });
      }
  
      const newMessage = await Message.create({
        text,
        chatId,
        senderId,
        date: new Date(),
      });
  
      res.json({ msg: "Message created successfully", message: newMessage });
    } catch (error) {
      res.status(500).json({ msg: "Error creating message", error });
    }
  }
  

  async deleteAsync(req, res) {
    try {
      const { id } = req.params;
  
      const message = await Message.destroy({ where: { id } });
  
      if (message) {
        res.json({ msg: "Message deleted successfully" });
      } else {
        res.status(404).json({ msg: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error deleting message", error });
    }
  }
  
  async getByIdAsync(req, res) {
    try {
      const { id } = req.params;
  
      const message = await Message.findOne({
        where: { id },
        include: [
          { model: User, as: 'user' },
          { model: Chat, as: 'chat' },
        ],
      });
  
      if (message) {
        res.json(message);
      } else {
        res.status(404).json({ msg: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error fetching message", error });
    }
  }
  

  async getAllAsync(req, res) {
    try {
      const { chatId } = req.query; 
  
      if (!chatId) {
        return res.status(400).json({ msg: "Chat ID is required" });
      }
  
      const messages = await Message.findAll({
        where: { chatId },
        include: { model: User, as: 'user' },
        order: [['date', 'ASC']],
      });
  
      res.json(messages);
    } catch (error) {
      res.status(500).json({ msg: "Error fetching messages", error });
    }
  }
  

  async updateAsync(req, res) {
    try {
      const { id } = req.params;
      const { text } = req.body;
  
      if (!text) {
        return res.status(400).json({ msg: "Message text is required" });
      }
  
      const message = await Message.findOne({ where: { id } });
  
      if (message) {
        message.text = text;
        await message.save();
  
        res.json({ msg: "Message updated successfully", message });
      } else {
        res.status(404).json({ msg: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error updating message", error });
    }
  }
  
}

export default new MessageController;