import { RequestHandler, Router } from "express";
import authRouter from "./auth";
import chatrouter from "./chat";
import messagerouter from "./message";
import { users } from "../controls/users";
import { verifyToken } from "../controls/auth";

const router=Router();

router.use('/auth',authRouter);
router.use('/chat',chatrouter);
router.use('/message',messagerouter);
router.get('/users',users);
router.get('/verify',verifyToken as RequestHandler);


export default router;
