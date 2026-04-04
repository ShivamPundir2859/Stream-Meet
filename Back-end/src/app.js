import express from "express";
import {createServer} from "node:http"
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.route.js"

import { connect } from "node:http2";
import {connectToSocket} from "./controllers/socketManager.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb"}));

app.use("/api/v1/users", userRoutes);

const start = async() => {
   const ConnectionDb = await mongoose.connect("mongodb+srv://shivamgujjar5801_db_user:IycJm0GbT7l9mopQ@streammeet.4qoaz4l.mongodb.net/?appName=StreamMeet");
   console.log(`Mongoose Db is connected to host : ${ConnectionDb.connection.host}`)
   server.listen(app.get("port"), ()=>{
      console.log("App is listening at 8000")
   });   
};

start();