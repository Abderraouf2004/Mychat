import { Router } from "express";
import { createchat, getchatbyid} from "../controls/chat";


const chatrouter=Router();

chatrouter.post('/create',createchat)
chatrouter.get('/:userId',getchatbyid)

export default chatrouter