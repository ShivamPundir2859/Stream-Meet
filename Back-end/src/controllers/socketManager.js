import { connections } from "mongoose";
import { Server } from "socket.io";

let connection= {}
let message = {}
let timeOnline = {}
export const connectToSocket = (server)=>{
   const io = new Server(server , {
      cors: {
         origin: "*",
         methods: ["GET", "POST"],
         allowedHeaders: ["*"],
         credentials: true
      }
   });
   io.on("connection", (socket)=> {

      socket.on("join-call", (path)=>{
         if(connections[path] === undefined){
            connections[path] = []
         }
         connections[path].push(socket.id)
         timeOnline[socket.id] = new Date();

         for( a = 0; a< connections[path].length ; a++){
            io.to(connections[path]).emit("user-joined",socket.id,connections[path])
         }
         if(message[path] === undefined){
            for( a = 0; a< message[path].length; ++a){
               io.to(socket.id).emit("chat-message",
                  message[path][a]['data'],
                  message[path][a]['sender'],
                  message[path][a][socket-id-sender]
               )
            };
         };
      });


      socket.on("signal", (toId, message)=>{
         io.to(toId).emit("signal", socket.id, message);
      })


      socket.on("chat-message", (data,sender)=>{
         const[matchingroom , found] = Object.entries(connection)
         .reduce(([room , isFound], [roomkey, roomValue]) => {
            if( !isFound && roomValue.includes(socket.id)){
               return [roomkey , true];
            }  ['', false];
            if(found === true){
               if(message[matchingroom] === undefined){
                  message[matchingroom] = []
               }
               message[matchingroom].push({"sender": sender ,"data":data, "socket-id-sender": socket_id})
               console.log ("message", key ,":", sender,data)

               connections[matchingroom].forEach((elem) => {
                  io.to(elem).emit("chat-message", data , sender, socket_id)
               });
            }
         })
      });

      
      socket.on("disconnect", ()=>{
         var diffTime = Math.abs(timeOnline[socket.id] - new Date())
         var key 

         for(const [k,v] of JSON.parse(JSON.stringify(Object.entries(connections)))){
            for ( let a=0 ; a < v.length ; ++a){
               if(v[a] === socket.id){
                  key = k
                  for( let a=0 ; a < connections[key].length; a++){
                     io.to(connections[key][a]).emit("user-left", socket.id)
                  }

                  var index = connections[key].indexOf(socket.id)

                  connections[key].splice(index , 1)

                  if(connections[key].length === 0){
                     delete connections[key]
                  }
               }
            }
         }
      })


   })
}

