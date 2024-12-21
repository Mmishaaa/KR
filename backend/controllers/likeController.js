import { models } from "../src/models/models.js"
const { Like, User, Chat } = models;

class LikeController {
  async createAsync(req, res) {
    try {
      const { senderId, receiverId } = req.body;
  
      if (!senderId || !receiverId) {
        return res.status(400).json({ message: "SenderId and ReceiverId are required" });
      }
  
      const existingLike = await Like.findOne({
        where: { senderId, receiverId },
      });

      if (existingLike) {
        return res.status(400).json({ message: "You've already liked this profile!" });
      }

      const like = await Like.create({ senderId, receiverId });
  
      const match = await Like.findOne({
        where: { senderId: receiverId, receiverId: senderId },
      });
  
      if (match) {
        const chat = await Chat.create();
  
        await chat.addUsers([senderId, receiverId]);
  
        return res.status(201).json({
          message: "Like created successfully and match found. Chat created.",
          like,
          chat,
        });
      }
  
      return res.status(201).json({ message: "Like created successfully", like });
  
    } catch (error) {
      return res.status(500).json({ message: "Error creating like", error: error.message });
    }
  }

  async deleteAsync(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }

      const deleted = await Like.destroy({ where: { id } });

      if (deleted) {
        return res.status(200).json({ message: "Like deleted successfully" });
      }

    } catch (error) {
      return res.status(500).json({ message: "Error deleting like", error: error.message });
    }
  }

  async getByIdAsync(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }

      const like = await Like.findByPk(id, {
        include: [
          { model: User, as: 'senderUser', attributes: ['id', 'email', 'firstName', 'lastName'] },
          { model: User, as: 'receiverUser', attributes: ['id', 'email', 'firstName', 'lastName'] },
        ],
      });

      if (like) {
        return res.status(200).json({ like });
      }

      return res.status(404).json({ message: "Like not found" });
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving like", error: error.message });
    }
  }

  async getAllAsync(req, res) {
    try {
      const likes = await Like.findAll({
        include: [
          { model: User, as: 'senderUser', attributes: ['id', 'email', 'firstName', 'lastName'] },
          { model: User, as: 'receiverUser', attributes: ['id', 'email', 'firstName', 'lastName'] },
        ],
      });

      return res.status(200).json({ likes });
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving likes", error: error.message });
    }
  }
}

export default new LikeController();