import { Request, Response } from "express";
import { prismaclient } from "../main";

export const users=async(req:Request,res:Response)=>{
try {
    const users=await prismaclient.user.findMany();
    res.send(users)
} catch (error) {
        console.error("Error get all users:", error);
    res.status(500).json({ error: "Failed to get users" });
}
}

export const deleteusers=async(req:Request,res:Response)=>{
try {
    const users=await prismaclient.user.deleteMany()
    res.send(users)
} catch (error) {
        console.error("Error get all users:", error);
    res.status(500).json({ error: "Failed to get users" });
}
}