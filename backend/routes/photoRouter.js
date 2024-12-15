import Router from "express"
import photoController from "../controllers/photoController.js";

const photoRouter = new Router();

photoRouter.post("/", photoController.createAsync)

photoRouter.post("/:id", photoController.getByIdAsync)

photoRouter.post("/", photoController.getAllAsync)

photoRouter.get("/:id", photoController.updateAsync)

photoRouter.delete("/:id", photoController.deleteAsync)

photoRouter.put("/:id", photoController.updateAsync)

export default photoRouter;
