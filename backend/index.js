import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mySequelize from "./src/db/db.js";
import { models } from "./src/models/models.js"
import { router } from "./routes/index.js";
import errorHandler from "./middleware/errorHandlingMiddleware.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler)

const start = async () => {
  try{  
    await mySequelize.authenticate()
    await mySequelize.sync()
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch(e) {
    console.log(e);
  }
}

start()

// // Пример данных о пользователях
// let users = [
//   {
//     id: "1",
//     fusionUserId: "fusion-456",
//     firstName: "John",
//     lastName: "Doe",
//     age: 30,
//     city: "New York",
//     description: "Software developer",
//     gender: "Man",
//     email: "john.doe@example.com",
//     photos: [
//       {
//         id: "photo-789",
//         isAvatar: true,
//         photoURL: "https://randomuser.me/api/portraits/men/3.jpg",
//         userId: "1"
//       },
//       {
//         id: "photo-789",
//         isAvatar: false,
//         photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
//         userId: "1"
//       },{
//         id: "photo-789",
//         isAvatar: false,
//         photoURL: "https://randomuser.me/api/portraits/men/4.jpg",
//         userId: "1"
//       }
//     ],
//     subscription: {
//       id: "subscription-001",
//       email: "john.doe@example.com",
//       subscriptionType: "Premium",
//       expiresAt: new Date('2025-07-26'),
//       createdAt: new Date('2024-07-26'),
//       updatedAt: new Date()
//     }
//   },
//   {
//     id: "2",
//     fusionUserId: "fusion-457",
//     firstName: "Jane",
//     lastName: "Smith",
//     age: 28,
//     city: "Los Angeles",
//     description: "Graphic designer",
//     gender: "Woman",
//     email: "jane.smith@example.com",
//     photos: [
//       {
//         id: "photo-790",
//         isAvatar: true,
//         photoURL: "https://randomuser.me/api/portraits/women/3.jpg",
//         userId: "2"
//       }
//     ],
//     subscription: {
//       id: "subscription-002",
//       email: "jane.smith@example.com",
//       subscriptionType: "Basic",
//       expiresAt: new Date('2024-12-30'),
//       createdAt: new Date('2024-01-15'),
//       updatedAt: new Date()
//     }
//   }
// ];

// // Получить список всех пользователей
// app.get('/api/users', (req, res) => {
//   res.json(users);
// });

// // Получить пользователя по ID
// app.get('/api/users/:id', (req, res) => {
//   const user = users.find(user => user.id === req.params.id);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).send("User not found");
//   }
// });

// // Создать нового пользователя
// app.post('/api/users', (req, res) => {
//   const newUser = req.body;
//   newUser.id = `user-${Date.now()}`;  // Генерация ID для нового пользователя
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// // Обновить данные пользователя
// app.put('/api/users/:id', (req, res) => {
//   const index = users.findIndex(user => user.id === req.params.id);
//   if (index !== -1) {
//     const updatedUser = { ...users[index], ...req.body };
//     users[index] = updatedUser;
//     res.json(updatedUser);
//   } else {
//     res.status(404).send("User not found");
//   }
// });

// // Удалить пользователя
// app.delete('/api/users/:id', (req, res) => {
//   const index = users.findIndex(user => user.id === req.params.id);
//   if (index !== -1) {
//     users.splice(index, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).send("User not found");
//   }
// });

// start();