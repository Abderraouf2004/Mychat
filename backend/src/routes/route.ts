import { RequestHandler, Router } from "express";
import authRouter from "./auth";
import chatrouter from "./chat";
import messagerouter from "./message";
import { deletemembers, deleteusers, users } from "../controls/users";
import {  me, verifyToken } from "../controls/auth";
import { deletemessages } from "../controls/message";
import { deletechats } from "../controls/chat";

const router=Router();

router.use('/auth',authRouter);
router.use('/chat',chatrouter);
router.use('/message',messagerouter);
router.get('/users',users);
router.get('/users/:id',me as RequestHandler);
router.get('/deleteusers',deleteusers);
router.get('/deletemessages',deletemessages);
router.get('/deletechats',deletechats);
router.get('/deletemembers',deletemembers);
router.get('/verify',verifyToken as RequestHandler);


export default router;
