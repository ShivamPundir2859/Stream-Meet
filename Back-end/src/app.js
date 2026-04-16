import express from "express";
import {createServer} from "node:http"
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.route.js"
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();


import { connect } from "node:http2";
import {connectToSocket} from "./controllers/socketManager.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb"}));

app.use("/api/v1/users", userRoutes);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../../Front-end/vite-project/dist')));

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Front-end/vite-project/dist/index.html'));
});

const start = async() => {
   const ConnectionDb = await mongoose.connect(process.env.MONGOLINK);
   console.log(`Mongoose Db is connected to host : ${ConnectionDb.connection.host}`)
   server.listen(app.get("port"), ()=>{
      console.log("App is listening at 8000")
   });   
};

start();