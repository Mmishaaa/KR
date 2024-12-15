import Router from "express"
import coordinatesController from "../controllers/coordinatesController.js";

const coordinatesRouter = new Router();

coordinatesRouter.post("/", coordinatesController.createAsync)

coordinatesRouter.post("/:id", coordinatesController.getByIdAsync)

coordinatesRouter.post("/", coordinatesController.getAllAsync)

coordinatesRouter.get("/:id", coordinatesController.updateAsync)

coordinatesRouter.delete("/:id", coordinatesController.deleteAsync)

export default coordinatesRouter;
