import Router from "express"
import likeController from "../controllers/likeController.js";

const likeRouter = new Router();

likeRouter.post("/", likeController.createAsync)

likeRouter.get("/:id", likeController.getByIdAsync)

likeRouter.get("/", likeController.getAllAsync)

likeRouter.delete("/:id", likeController.deleteAsync)

export default likeRouter;
