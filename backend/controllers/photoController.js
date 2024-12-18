import fs from 'fs'; 
import { fileURLToPath } from 'url';
import path from 'path';
import { models } from "../src/models/models.js"
import { v4 as uuidv4 } from 'uuid';

const { Photo } = models;

class PhotoController {

  async createAsync(req, res) {
    const { userId, isAvatar } = req.body;
    const { img } = req.files;
  
    let fileName = uuidv4() + ".jpg";
  
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
  
    img.mv(path.resolve(__dirname, '..', 'static', fileName));
  
    const currentUtc = new Date();
  
    if (isAvatar) {
      await Photo.update(
        { isAvatar: false },
        { where: { userId: userId, isAvatar: true } }
      );
    }
  
    const photo = await Photo.create({
      photoURL: fileName,
      isAvatar: isAvatar || false,
      userId: userId,
      createdAt: currentUtc,
      updatedAt: currentUtc,
    });
  
    return res.status(200).json({
      id: photo.id,
      isAvatar: photo.isAvatar,
      photoURL: photo.photoURL,
      userId: photo.userId,
    });
  }
  
  async deleteAsync(req, res) {
    try {
      const { id } = req.params;
  
      const photo = await Photo.findByPk(id);
      if (!photo) {
        return res.status(200).json({ message: "Photo has already been deleted successfully before" });
      }
  
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePath = path.resolve(__dirname, '..', 'static', photo.photoURL);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}:`, err);
        }
      });

      await photo.destroy();
      return res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting photo", error: error.message });
    }
  }
  

  async getByIdAsync(req, res) {
    try {
      const { id } = req.params;
  
      const photo = await Photo.findByPk(id);
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
  
      return res.status(200).json(photo);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving photo", error: error.message });
    }
  }

  async getAllAsync(req, res) {
    try {
      let { limit, page } = req.query; 

      limit = limit || 10;
      page = page || 1;

      let offset = page * limit - limit

      const photos = await Photo.findAndCountAll({ limit: parseInt(limit), offset: parseInt(offset) });

      return res.status(200).json(photos);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving photos", error: error.message });
    }
  }
  

  async updateAsync(req, res) {
    try {
      const { id } = req.params
      const { isAvatar } = req.body;

      if (!id || typeof isAvatar === "undefined" ) {
        return res.status(400).json({ message: "ID and isAvatar are required" });
      }
  
      const photo = await Photo.findByPk(id);
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
  
      photo.isAvatar = isAvatar;
      await photo.save();
  
      return res.status(200).json({ photo });
    } catch (error) {
      return res.status(500).json({ message: "Error updating photo", error: error.message });
    }
  }
  
}

export default new PhotoController();