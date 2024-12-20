import Router from "express"
import coordinatesController from "../controllers/coordinatesController.js";

const coordinatesRouter = new Router();

coordinatesRouter.post("/", coordinatesController.createAsync)

coordinatesRouter.get("/:id", coordinatesController.getByIdAsync)

coordinatesRouter.post("/", coordinatesController.getAllAsync)

coordinatesRouter.put("/:id", coordinatesController.updateAsync)

coordinatesRouter.get("/by-user/:userId", coordinatesController.getByUserId)

coordinatesRouter.delete("/:id", coordinatesController.deleteAsync)

coordinatesRouter.put("/:id", coordinatesController.updateAsync)

export default coordinatesRouter;
