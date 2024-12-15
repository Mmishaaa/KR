import Router from "express"
import chatController from "../controllers/chatController.js";

const chatRouter = new Router();

chatRouter.post("/", chatController.createAsync)

chatRouter.post("/:id", chatController.getByIdAsync)

chatRouter.post("/", chatController.getAllAsync)

chatRouter.get("/:id", chatController.updateAsync)

chatRouter.delete("/:id", chatController.deleteAsync)

chatRouter.put("/:id", chatController.updateAsync)

export default chatRouter;
