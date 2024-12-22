import Router from "express"
import messageController from "../controllers/messageController.js";

const messageRouter = new Router();

messageRouter.post("/", messageController.createAsync)

messageRouter.get("/:id", messageController.getByIdAsync)

messageRouter.get("/", messageController.getAllAsync)

messageRouter.put("/:id", messageController.updateAsync)

messageRouter.delete("/:id", messageController.deleteAsync)

export default messageRouter;
