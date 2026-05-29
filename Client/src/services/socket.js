import { io } from "socket.io-client";

const socket = io("https://environment-monitoring-platform.onrender.com");

export default socket;