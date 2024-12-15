import mySequelize from "../db/db.js";
import { DataTypes } from "sequelize";

const User = mySequelize.define("user", {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  email: { type: DataTypes.STRING, unique: true },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  age: { type: DataTypes.INTEGER },
  password: { type: DataTypes.STRING },
  gender: { type: DataTypes.ENUM("Male", "Female", "Other"), allowNull: false },
  subscriptionId: { type: DataTypes.UUID, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" }
})

const Chat = mySequelize.define("chat", {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 }  
})

const ChatUser = mySequelize.define("chatUser", {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
});


const Message = mySequelize.define("message", {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  text: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  chatId: { type: DataTypes.UUID, allowNull: false },
  senderId: { type: DataTypes.UUID, allowNull: false },
});

const Like = mySequelize.define("like", {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  senderId: { type: DataTypes.UUID, allowNull: false },
  receiverId: { type: DataTypes.UUID, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
})

const Photo = mySequelize.define("photo", {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  photoURL: { type: DataTypes.STRING, allowNull: false },
  isAvatar: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.UUID, allowNull: false },
});

const Subscription = mySequelize.define("subscription", {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  subscriptionType: { type: DataTypes.ENUM("Basic", "Premium", "VIP"), allowNull: false },
  fusionUserId: { type: DataTypes.UUID, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Coordinates = mySequelize.define('coordinates',{
  id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: {type: DataTypes.STRING, allowNull: false},
  lat: {type: DataTypes.FLOAT, allowNull: false},
  lng: {type: DataTypes.FLOAT, allowNull: false}
})

// User Relationships
User.hasMany(Photo, { foreignKey: 'userId', as: 'photos' });
User.hasMany(Message, { foreignKey: 'senderId', as: 'messages' });
User.hasMany(Like, { foreignKey: 'senderId', as: 'sentLikes' });
User.hasMany(Like, { foreignKey: 'receiverId', as: 'receivedLikes' });

User.belongsTo(Subscription, { foreignKey: 'subscriptionId', as: 'subscription' });
Subscription.hasMany(User, { foreignKey: 'subscriptionId', as: 'users' });

User.belongsToMany(Chat, { through: 'ChatUsers', as: 'chats' });
Chat.belongsToMany(User, { through: 'ChatUsers', as: 'users' });

// Chat Relationships
Chat.hasMany(Message, { foreignKey: 'chatId', as: 'messages' });

// Message Relationships
Message.belongsTo(User, { foreignKey: 'senderId', as: 'user' });
Message.belongsTo(Chat, { foreignKey: 'chatId', as: 'chat' });

// Like Relationships
Like.belongsTo(User, { foreignKey: 'senderId', as: 'senderUser' });
Like.belongsTo(User, { foreignKey: 'receiverId', as: 'receiverUser' });

// Photo Relationships
Photo.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Coordinates Relationships
Coordinates.belongsTo(User);

// Экспорт всех моделей через один объект
export const models = {
  User,
  Chat,
  ChatUser,
  Message,
  Like,
  Photo,
  Subscription,
  Coordinates,
};