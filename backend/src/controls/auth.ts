import { NextFunction, Request, Response } from "express";
import { prismaclient } from "../main";
import { hashSync ,compareSync} from "bcrypt";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secret";

export const signup = async (req: Request, res: Response,next:NextFunction) => {
  const { name, email, password} = req.body;
  const image = req.file?.filename;
  try {
    let user = await prismaclient.user.findFirst({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = await prismaclient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
        image
      },
    });
    if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
     const token = jwt.sign(
       {userId:user.id},JWT_SECRET, {expiresIn: '15m',})
       
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,           
      sameSite: "none", 
      
      maxAge: 15 * 60 * 1000, 
    })
    .cookie('user',JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
   
    image: user.image
    }),{
    httpOnly: false,
     secure: true,          
    sameSite: "none", 
    
    maxAge: 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({ message: 'User signup', data: { accessToken: token ,user:user} });



  } catch (error) {
    console.error("Signup error:", error);
     next(error);
  }
}


export const signin=async(req:Request,res:Response,next:NextFunction)=>{
   const {email,password}=req.body;
   try {
    const user=await prismaclient.user.findFirst({where:{email}});
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if(!compareSync(password,user.password)){
       return res.status(401).json({ message: "Invalid password" });
    }
       if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
     const token = jwt.sign(
       {userId:user.id},JWT_SECRET, {expiresIn: '15m',})


    res.cookie('token', token, {
      httpOnly: true,
      secure: true,           
      sameSite: "none",
       
      maxAge: 15 * 60 * 1000, 
    })
    .cookie('user',JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    
    image: user.image
    }),{
    httpOnly: false,
    secure: true,           
      sameSite: "none", 
       
    maxAge: 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({ message: 'User signin', data: { accessToken: token ,user:user} });

    } catch (error) {
    console.error("Erreur de connexion:", error);
     next(error)
   }
}




export const verifyToken = (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    res.status(200).json({ authenticated: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
};



export const refreshAccessToken = (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };

    const newToken = jwt.sign(
      { userId: payload.userId },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('token', newToken, {
      httpOnly: true,
      secure: true,           
      sameSite: "none", 
      
      maxAge: 5 * 60 * 1000
    });

    res.status(200).json({ message: 'Token refreshed' });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};



export const me =async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const user = await prismaclient.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
}