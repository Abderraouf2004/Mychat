import express, { RequestHandler } from 'express';
import { refreshAccessToken, signin, signup } from "../controls/auth";
import { upload } from '../../uploads/images';


const authRouter=express.Router();


authRouter.post('/signup', upload.single('image'),signup as RequestHandler);

authRouter.post('/signin',signin as RequestHandler);
authRouter.post('/refresh-token',refreshAccessToken as RequestHandler)


export default authRouter