import Router from "express"
import likeController from "../controllers/likeController.js";

const likeRouter = new Router();

likeRouter.post("/", likeController.createAsync)

likeRouter.post("/:id", likeController.getByIdAsync)

likeRouter.post("/", likeController.getAllAsync)

likeRouter.get("/:id", likeController.updateAsync)

likeRouter.delete("/:id", likeController.deleteAsync)

likeRouter.put("/:id", likeController.updateAsync)

export default likeRouter;
