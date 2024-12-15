import Router from "express"
import userController from "../controllers/userController.js";

const userRouter = new Router();

userRouter.post("/registartion", userController.registartion)

userRouter.post("/login", userController.login)

userRouter.get("/auth", userController.check)

export default userRouter;
