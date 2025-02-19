import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectMongoDB from './database/db.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js'
import messageRoutes from './routes/message.route.js';
import { app, server } from './socket/socket.js';

dotenv.config();

connectMongoDB();

// const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
}

app.use(cors(corsOptions));

// Register API's

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/message', messageRoutes);


server.listen(process.env.PORT, ()=>{
  console.log(`Server is running on port ${process.env.PORT}...`);
});