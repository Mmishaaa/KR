import Router from "express"
import subscriptionController from "../controllers/subscriptionController.js";

const subscriptionRouter = new Router();

subscriptionRouter.post("/", subscriptionController.createAsync)

subscriptionRouter.post("/:id", subscriptionController.getByIdAsync)

subscriptionRouter.post("/", subscriptionController.getAllAsync)

subscriptionRouter.get("/:id", subscriptionController.updateAsync)

subscriptionRouter.delete("/:id", subscriptionController.deleteAsync)

export default subscriptionRouter;
