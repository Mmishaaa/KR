import Router from "express"
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = new Router();

userRouter.post("/registration", userController.registartion)

userRouter.post("/login", userController.login)

userRouter.get("/auth", authMiddleware, userController.check)

userRouter.post("/", userController.createAsync)

userRouter.get("/", userController.getAllAsync)

userRouter.get("/:id", userController.getByIdAsync)

userRouter.delete("/:id", userController.deleteAsync)

userRouter.put("/:id", userController.updateAsync)

userRouter.post("/createUsers", userController.createUsers)

export default userRouter;
