import { models } from "../src/models/models.js";

const { User, Subscription } = models;
class UserController {
  async registartion(req, res) {

  }

  async login(req, res) {

  }

  async check(req, res) {

  }

  async createAsync(req, res) {
    try {
      const { email, firstName, lastName, age, password, gender, role } = req.body;

      var currrentUtc = new Date();

      const newSubscription = await Subscription.create({
        subscriptionType: "BASIC",
        expiresAt: currrentUtc.setMonth(currrentUtc.getMonth() + 1),
        createdAt: currrentUtc,
        updatedAt: currrentUtc
      });

      const newUser = await User.create({
        email,
        firstName,
        lastName,
        age,
        password,
        gender,
        role,
        subscriptionId: newSubscription.id
      });

      return res.status(201).json(newUser);
    }
    catch(error) {
      console.error(error);
      return res.status(500).json({ message: "Error while creating a user" });
    }
  }

  async deleteAsync(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        throw new ApiError(404, "User not found");
      }
  
      await user.destroy();
      return res.status(200).json({ message: "User deleted" });
    } 
    catch(error) {
      console.error(error);
      return res.status(500).json({ message: "Error while deleting a user" });
    }
  }

  async getByIdAsync(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw new ApiError(404, "User not found");
      }
  
      return res.status(200).json(user);
    }
    catch(error) {
      console.error(error);
      return res.status(500).json({ message: "Error while retrieving a user" });
    }
  }

  async getAllAsync(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    }
    catch(error) {
      console.error(error);
      return res.status(500).json({ message: "Error while retrieving users" });
    }
  }

  async updateAsync(req, res) {
      try {
        const { id } = req.params;
        const { email, firstName, lastName, age, password, gender, subscriptionId, role } = req.body;
  
        const user = await User.findByPk(id);
        if (!user) {
          throw new ApiError(404, "User not found");
        }
  
        user.email = email || user.email;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.age = age || user.age;
        user.password = password || user.password;
        user.gender = gender || user.gender;
        user.subscriptionId = subscriptionId || user.subscriptionId;
        user.role = role || user.role;
  
        await user.save();
  
        return res.status(200).json(user);
      } 
      catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Error while updating a user" });
      }
  }
}

export default new UserController;