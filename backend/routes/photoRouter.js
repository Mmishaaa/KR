import Router from "express"
import photoController from "../controllers/photoController.js";

const photoRouter = new Router();

photoRouter.post("/", photoController.createAsync)

photoRouter.get("/:id", photoController.getByIdAsync)

photoRouter.get("/", photoController.getAllAsync)

photoRouter.delete("/:id", photoController.deleteAsync)

photoRouter.put("/:id", photoController.updateAsync)

export default photoRouter;
