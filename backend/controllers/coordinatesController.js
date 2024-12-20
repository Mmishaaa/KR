import { models } from "../src/models/models.js";
import { Op } from 'sequelize';

const { Coordinates } = models;

class CoordinatesController {
  async createAsync(req, res) {
    try {
      const { name, lat, lng, userId } = req.body;
      if (!name || !lat || !lng || !userId) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
      const newCoordinate = await Coordinates.create({ name, lat, lng, userId });
      return res.status(201).json(newCoordinate);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteAsync(req, res) {
    try {
      const { id } = req.params;
      const result = await Coordinates.destroy({ where: { id } });
      if (!result) {
        return res.status(404).json({ error: 'Coordinate not found.' });
      }
      return res.status(200).json({ message: 'Coordinate deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getByIdAsync(req, res) {
    try {
      const { id } = req.params;
      const coordinate = await Coordinates.findOne({ where: { id } });
      if (!coordinate) {
        return res.status(404).json({ error: 'Coordinate not found.' });
      }
      return res.status(200).json(coordinate);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllAsync(req, res) {
    try {
      const coordinates = await Coordinates.findAll();
      return res.status(200).json(coordinates);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateAsync(req, res) {
    try {
      const { id } = req.params;
      const { name, lat, lng } = req.body;
      const coordinate = await Coordinates.findOne({ where: { id } });
      if (!coordinate) {
        return res.status(404).json({ error: 'Coordinate not found.' });
      }
      coordinate.name = name ?? coordinate.name;
      coordinate.lat = lat ?? coordinate.lat;
      coordinate.lng = lng ?? coordinate.lng;
      await coordinate.save();
      return res.status(200).json(coordinate);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getByUserId(req, res) {
    try {
      const { userId } = req.params;
      console.log("userId: " + userId)
      const coordinates = await Coordinates.findOne({
        where: { userId },
        attributes: ['id', 'name', 'lat', 'lng', 'userId'],
      });
      if (!coordinates) {
        return res.status(404).json({ error: 'No coordinates found for this user.' });
      }
      return res.status(200).json(coordinates);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getByUserIds(req, res) {
    try {
      const { userIds } = req.body;
      if (!userIds || !Array.isArray(userIds)) {
        return res.status(400).json({ error: 'Invalid userIds provided.' });
      }
      const coordinates = await Coordinates.findAll({
        where: { userId: { [Op.in]: userIds } },
      });
      return res.status(200).json(coordinates);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new CoordinatesController();
