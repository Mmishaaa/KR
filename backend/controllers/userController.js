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
      next(ApiError.internal("Error while creating a user: " + error.message))
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
      next(ApiError.internal("Error while deleting a user: " + error.message))
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
      next(ApiError.internal("Error while retrieving a user: " + error.message))
    }
  }

  async getAllAsync(req, res) {
    try {
      let { limit, page } = req.query; 

      limit = limit || 10;
      page = page || 1;

      let offset = page * limit - limit

      const users = await User.findAndCountAll({limit, offset});
      return res.status(200).json(users);
    }
    catch(error) {
      next(ApiError.internal("Error while retrieving users: " + error.message))
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
        next(ApiError.internal("Error while updating a user: " + error.message))
      }
  }
}

export default new UserController;