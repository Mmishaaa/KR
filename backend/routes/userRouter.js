import Router from "express"
import userController from "../controllers/userController.js";

const userRouter = new Router();

userRouter.post("/registartion", userController.registartion)

userRouter.post("/login", userController.login)

userRouter.get("/auth", userController.check)

userRouter.post("/", userController.createAsync)

userRouter.get("/", userController.getAllAsync)

userRouter.get("/:id", userController.getByIdAsync)

userRouter.delete("/:id", userController.deleteAsync)

userRouter.put("/:id", userController.updateAsync)

export default userRouter;
