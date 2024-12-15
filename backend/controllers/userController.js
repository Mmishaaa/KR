import ApiError from "../errors/apiError.js";
import { models } from "../src/models/models.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import jwt from "jsonwebtoken"

dotenv.config();

const { User, Subscription } = models;

const generateJwt = (id, email, role) => {
  if (!process.env.SECRET_KEY) {
    return ApiError.badRequest("SECRET_KEY is not defined in environment variables")
  }

  return jwt.sign(
    { id, email, role }, 
    process.env.SECRET_KEY, 
    { expiresIn: "24h" }
  );
}

class UserController {
  async registartion(req, res, next) {
    try {
      const { email, firstName, lastName, age, password, gender, role } = req.body;

      if(!email || !password) {
        return next(ApiError.badRequest("invalid password or email"))
      }
  
      const isUserExists = await User.findOne({where: {email}})
  
      if(isUserExists) {
        return next(ApiError.badRequest(`user with this email: ${email} already exists`))      
      }
  
      const hashedPassword = await bcrypt.hash(password, 5);
      
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
        password: hashedPassword,
        gender,
        role,
        subscriptionId: newSubscription.id
      });

      const jwt = generateJwt(newUser.id, newUser. email, newUser.role)

      return res.status(201).json({newUser, jwt});
    }
    catch(error) {
      next(ApiError.internal("Error while creating a user: " + error.message))
    }    
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({where: {email}})
      
      if(!user) {
        return next(ApiError.badRequest(`User with email: ${email} doesn't exist`))
      }

      let isPasswordCorrect = await bcrypt.compare(password, user.password);
      if(!isPasswordCorrect) {
        return next(ApiError.badRequest("wrong password"))
      }
  
      const token = generateJwt(user.id, user.email, user.role);
      console.log(token)
      return res.json({token})
    }
    catch(error) {
      next(ApiError.internal("Error while login: " + error.message))
    }    
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }

  async createAsync(req, res, next) {
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

  async deleteAsync(req, res, next) {
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

  async getByIdAsync(req, res, next) {
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

  async getAllAsync(req, res, next) {
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

  async updateAsync(req, res, next) {
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