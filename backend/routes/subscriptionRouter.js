import Router from "express"
import subscriptionController from "../controllers/subscriptionController.js";

const subscriptionRouter = new Router();

subscriptionRouter.post("/", subscriptionController.createAsync)

subscriptionRouter.get("/", subscriptionController.getAllAsync)

subscriptionRouter.get("/:id", subscriptionController.getByIdAsync)

subscriptionRouter.delete("/:id", subscriptionController.deleteAsync)

subscriptionRouter.put("/", subscriptionController.updateAsync)

export default subscriptionRouter;
