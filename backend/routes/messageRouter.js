import Router from "express"
import messageController from "../controllers/messageController.js";

const messageRouter = new Router();

messageRouter.post("/", messageController.createAsync)

messageRouter.post("/:id", messageController.getByIdAsync)

messageRouter.post("/", messageController.getAllAsync)

messageRouter.get("/:id", messageController.updateAsync)

messageRouter.delete("/:id", messageController.deleteAsync)

export default messageRouter;
