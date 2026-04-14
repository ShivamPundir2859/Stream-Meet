import React, { useRef, useState } from 'react'
import "../style/VideoComponent.css";

const server_url = "http://localhost:8000";

var connection = {};
const peerCongifConncetions = {
   "iceServers":[
      {"urls": "stun:stun.l.google.com:19302"}  //stun server
   ]
}
export default function VideoMeetComponent() {

   var scoketRef = useRef();
   let socketIdref = useRef();

   let localVideoRef = useRef();

   let [videoAvailable , setVideoAvailable ] = useState(true);
   let [audioAvailable , setAudioAvailable] = useState(true);
   let [video, setVideo] = useState();
   let [audio , setAudio ] = useState();
   let [screen , setScreen] = useState();

   let[showModal , setModal] = useState();
   let [screenAvailable, setScreenAvailable] = useState();
   let [messages, setMessages] = useState([]);
   let[message , setMessage] = useState("");
   let[newMessages , setNewMessages] = useState();

   let [askForUsername , setAskForUsername] = useState(true);
   let [username , setUsername] = useState("");
   const videoRef = useRef([]);

   let [videos, setVideos] = useState([])

   

  return (
    <div>
         {askForUsername === true ?
            <div>

            </div> : <></>
         }
    </div>
  )
}
