import { Router } from "express";
import { createmessage, getMessagesByChat } from "../controls/message";



const messagerouter=Router();

messagerouter.post('/create',createmessage);
messagerouter.get('/:chatId',getMessagesByChat);

export default messagerouter