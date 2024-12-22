import Router from "express"
import userRouter from "./userRouter.js"
import chatRouter from "./chatRouter.js"
import coordinatesRouter from "./coordinatesRouter.js";
import likeRouter from "./likeRouter.js";
import messageRouter from "./messageRouter.js";
import photoRouter from "./photoRouter.js";
import subscriptionRouter from "./subscriptionRouter.js";

export const router = new Router();

router.use("/users", userRouter)

router.use("/chats", chatRouter)

router.use("/coordinates", coordinatesRouter)

router.use("/likes", likeRouter)

router.use("/messages", messageRouter)

router.use("/photos", photoRouter)

router.use("/subscriptions", subscriptionRouter)

router.use("/messages", messageRouter)