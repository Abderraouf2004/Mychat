import { Request, Response } from "express";
import { prismaclient } from "../main";



export const createchat=async(req:Request,res:Response)=>{
  console.log("Body reçu :", req.body);

     const{isGroup,adminId,members,name,image}= req.body;
     try {
    const chat=await prismaclient.chat.create({
    data: {
        isGroup,
        adminId,
        name,
        image,
        members:{
          create: members.map((userId: string) => ({
            userId
          }))
        },
        messages:{
            create:[]
        },
      },
      include: {
            members:true,
            
      },
    });

    res.status(201).json(chat);
     } catch (error) {
          console.error("Error creating chat:", error);
    res.status(500).json({ error: "Failed to create chat" });
     }
}



export const getchatbyid=async(req:Request,res:Response)=>{
    const {userId}=req.params;
    try {
        // const chatbyid= await prismaclient.chat.findMany({where:{id}})
        const chatbyid=await prismaclient.chat.findMany({where: {members: {
      some: {
        userId: userId
      }
    }},include:{members:{
      include: {
        user: true 
      }
    }}})
        res.send(chatbyid)
    } catch (error) {
    console.error("Error getchatbyid chat:", error);
    res.status(500).json({ error: "Failed to get chat by id" });
    }
}


export const deletechats=async(req:Request,res:Response)=>{
try {
    const result=await prismaclient.chat.deleteMany()
     res.status(200).json({
      message: "All chats deleted successfully",
      deletedCount: result.count,
    });
} catch (error) {
        console.error("Error get all chats:", error);
    res.status(500).json({ error: "Failed to get chats" });
}
}