import { Request, Response } from "express";
import { prismaclient } from "../main";

export const createmessage=async(req:Request,res:Response)=>{
    const {chatId,senderId,content,receiverId}=req.body
    try {
        const message=await prismaclient.message.create({
            data:{
                chatId,
                senderId,
                content,
                receiverId
            },
            include: {
            receiver:true,
            sender: true,
            chat: true,
            },
        })
        res.send(message)
    } catch (err) {
        res.status(500).json({ error: 'Failed to create message', details: err });
    }
}

export const getMessagesByChat=async(req:Request,res:Response)=>{
    const {chatId}=req.params;
    console.log(chatId);
    try {

        const messagebychat= await prismaclient.message.findMany({
        where:{chatId},
         orderBy: { createdAt: 'asc' },
         include: {
         sender: true,
         receiver:true,
      },})
    if (messagebychat.length ===0) {
       res.send(`🚫 No messages found `);
    }else{
         res.send(messagebychat)
    }
       
    } catch (error) {
    console.error("Error getMessagesByChat:", error);
    res.status(500).json({ error: "Failed to getMessagesByChat" });
    }
}

