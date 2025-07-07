import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");
const socket = io("https://real-time-chat-app-production-dc88.up.railway.app");

export default socket;