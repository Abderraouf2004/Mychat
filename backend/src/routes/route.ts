import { RequestHandler, Router } from "express";
import authRouter from "./auth";
import chatrouter from "./chat";
import messagerouter from "./message";
import { deleteusers, users } from "../controls/users";
import {  me, verifyToken } from "../controls/auth";
import { deletemessages } from "../controls/message";

const router=Router();

router.use('/auth',authRouter);
router.use('/chat',chatrouter);
router.use('/message',messagerouter);
router.get('/users',users);
router.get('/users/:id',me as RequestHandler);
router.get('/deleteusers',deleteusers);
router.get('/deletemessages',deletemessages);
router.get('/verify',verifyToken as RequestHandler);


export default router;
