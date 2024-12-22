import Router from "express"
import chatController from "../controllers/chatController.js";

const chatRouter = new Router();

chatRouter.post("/", chatController.createAsync)

chatRouter.get("/:id", chatController.getByIdAsync)

chatRouter.get("/", chatController.getAllAsync)

chatRouter.put("/:id", chatController.updateAsync)

chatRouter.delete("/:id", chatController.deleteAsync)

chatRouter.get("/by-user/:userId", chatController.getAllChatsByUserIdAsync)

export default chatRouter;
