import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mySequelize from "./src/db/db.js";
import { models } from "./src/models/models.js"
import { router } from "./routes/index.js";
import errorHandler from "./middleware/errorHandlingMiddleware.js"
import fileUpload  from "express-fileupload"
import { fileURLToPath } from 'url';
import path from 'path';
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static'))) 
app.use(fileUpload({}))
app.use("/api", router);

app.use(errorHandler)

const start = async () => {
  try{  
    await mySequelize.authenticate()
    await mySequelize.sync()

    io.on("connection", (socket) => {
      console.log("A user connected");
      socket.on("joinChat", (chatId) => {
        socket.join(chatId);
        console.log(`User joined chat ${chatId}`);
      });
    
      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch(e) {
    console.log(e);
  }
}

start()