import ApiError from "../errors/apiError.js";
import { models } from "../src/models/models.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const { User, Subscription, Photo, Chat, Like, Coordinates} = models;


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
      const { email, password, age, firstName, lastName, gender } = req.body;

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
        firstName,
        lastName,
        email,
        age,
        gender,
        password: hashedPassword,
        subscriptionId: newSubscription.id
      });

      const jwt = generateJwt(newUser.id, newUser. email, newUser.role)

      return res.status(201).json({newUser, jwt});
    }
    catch(error) {
      next(ApiError.internal("Error while creating a user: " + error))
    }    
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;

      const user = await User.findOne({
        where: {email},
        include: [
          {
            model: Chat,
            as: 'chats',
            attributes: ['id'],
          },
          {
            model: Subscription,  
            as: 'subscription',  
            attributes: ['id', 'subscriptionType', 'expiresAt'], 
          },
          {
            model: Photo,  
            as: 'photos',  
            attributes: ['id', 'photoURL', 'isAvatar'], 
          },
          {
            model: Like,
            as: 'sentLikes',
            attributes: ['id', 'receiverId', 'createdAt'],
          },
          {
            model: Like,
            as: 'receivedLikes',
            attributes: ['id', 'senderId', 'createdAt'],
          }
        ],})
      
      if(!user) {
        return next(ApiError.badRequest(`User with email: ${email} doesn't exist`))
      }

      let isPasswordCorrect = await bcrypt.compare(password, user.password);

      if(!isPasswordCorrect) {
        return next(ApiError.badRequest("wrong password"))
      }
  
      var userWithoutPassword = getUserWithoutPasssword(user.toJSON());

      const jwt = generateJwt(user.id, user.email, user.role);

      return res.json({
        newUser: userWithoutPassword,
        jwt
      })
    }
    catch(error) {
      next(ApiError.internal("Error while login: " + error.message))
    }    
  }

  async logout(req, res, next) {
    try {
      localStorage.removeItem("token")

    }
    catch(error) {
      next(ApiError.internal("Error while login: " + error.message))
    }    
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)

    return res.json({user: req.user, token})
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
      const user = await User.findByPk(id, {
        include: [
          {
            model: Chat,
            as: 'chats',
            attributes: ['id'],
          },
          {
            model: Subscription,  
            as: 'subscription',  
            attributes: ['id', 'subscriptionType', 'expiresAt'], 
          },
          {
            model: Photo,  
            as: 'photos',  
            attributes: ['id', 'photoURL', 'isAvatar'], 
          },
          {
            model: Like,
            as: 'sentLikes',
            attributes: ['id', 'receiverId', 'createdAt'],
          },
          {
            model: Like,
            as: 'receivedLikes',
            attributes: ['id', 'senderId', 'createdAt'],
          }
        ],
      });
      if (!user) {
        throw new ApiError(404, "User not found");
      }
  
      var userWithoutPassword = getUserWithoutPasssword(user.toJSON())

      return res.status(200).json(userWithoutPassword);
    }
    catch(error) {
      next(ApiError.internal("Error while retrieving a user: " + error.message))
    }
  }

  async getAllAsync(req, res, next) {
    try {
      let { limit, page } = req.query; 

      limit = limit || 100;
      page = page || 1;

      let offset = page * limit - limit

      const users = await User.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Chat,
            as: 'chats',
            attributes: ['id'],
          },
          {
            model: Photo,  
            as: 'photos',  
          },
          {
            model: Like,
            as: 'sentLikes',
            attributes: ['id', 'receiverId'],
          },
          {
            model: Like,
            as: 'receivedLikes',
            attributes: ['id', 'senderId'],
          },
          {
            model: Coordinates, // Including Coordinates model
            as: 'coordinates',  // Alias specified in the relationships
            attributes: ['lat', 'lng', 'name'], // Specify the attributes you need
          },
        ],
      });
      return res.status(200).json(users);
    }
    catch(error) {
      next(ApiError.internal("Error while retrieving users: " + error.message))
    }
  }

  async updateAsync(req, res, next) {
      try {
        const { id } = req.params;
        const { email, firstName, lastName, age, description, city, password, gender, subscriptionId, role, isAvatar } = req.body
        
        if(req.files) {
          const { img } = req.files;

          if(img) {
            let fileName = uuidv4() + ".jpg"

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            img.mv(path.resolve(__dirname, '..', 'static', fileName))
  
            const currentUtc = new Date()
  
            const photo = await Photo.create({
              photoURL: fileName,
              isAvatar: isAvatar || false,
              userId: id,
              createdAt: currentUtc,
              updatedAt: currentUtc
            })
          }
        }

        const user = await User.findByPk(id, {
          include: [{
            model: Subscription,
            as: 'subscription',
            required: false,
          }]
        });
        if (!user) {
          throw new ApiError(404, "User not found");
        }
  
        user.email = email || user.email;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.age = age || user.age;
        user.password = password || user.password;
        user.description = description || user.description
        user.city = city || user.city
        user.gender = gender || user.gender;
        user.subscriptionId = subscriptionId || user.subscriptionId;
        user.role = role || user.role;
  
        await user.save();
  
        var userWithoutPassword = getUserWithoutPasssword(user.toJSON());
        return res.status(200).json(userWithoutPassword);

      } 
      catch(error) {
        next(ApiError.internal("Error while updating a user: " + error.message))
      }
  }

  async createUsers(req, res, next) {
    try {
        const { users } = req.body;

        for(let user of users) {
          const { email, password, age, firstName, lastName, gender, description } = user
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
            firstName,
            lastName,
            email,
            age,
            gender,
            description,
            password: hashedPassword,
            subscriptionId: newSubscription.id
          });
    
        }

      return res.status(200);
    }
    catch(error) {
      next(ApiError.internal("Error while creating a user: " + error))
    }    
  }
}

const getUserWithoutPasssword = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export default new UserController;