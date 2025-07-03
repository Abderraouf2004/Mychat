import express from 'express';
import { PrismaClient } from './generated/prisma';
import router from './routes/route';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Server } from "socket.io";
import http from 'http';
dotenv.config();
export const prismaclient=new PrismaClient();
const app = express();
const port = 8080;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://mychat-rho-five.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

let Users: { userId: string, socketId: string }[] = [];
io.on("connection", (socket) => {
  console.log("user connected",socket.id);
  socket.on("adduser", (userId) => {
    const exists = Users.find((u) => u.userId === userId);
    if (!exists) {
      Users.push({ userId, socketId: socket.id });
       io.emit("getusers", Users);
    }
    socket.join(userId);
  });




  socket.on("sendmessage", async ({ chatId, senderId, content, receiverId }) => {
  try {
    const message = await prismaclient.message.create({
      data: {
        chatId,
        senderId,
        content,
        receiverId
      },
      include: {
        sender: true,
        receiver: true,
        chat: true
      }
    });

    const receiver = Users.find((u) => u.userId === receiverId);
    const sender = Users.find((u) => u.userId === senderId);
    if (receiver) {
      io.to(receiver.socketId).emit('getmessage', message);
    }

    if (sender) {
      io.to(sender.socketId).emit('getmessage', message);
    }

  } catch (err) {
    console.error("Erreur socket sendmessage:", err);
  }
});

  


  socket.on("disconnect", () => {
    Users = Users.filter((u) => u.socketId !== socket.id);
    io.emit("getusers", Users);
    console.log("Client déconnecté");
  });
});

const uploadDir = path.join(__dirname, '..', 'uploads');


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// app.use(cors({
//   origin: 'https://mychat-rho-five.vercel.app',
//   credentials: true,
// }));
app.use(cors({
  origin: 'https://mychat-rho-five.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api',router);

httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
