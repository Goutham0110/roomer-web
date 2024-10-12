import { io } from "socket.io-client";


// TODO: Receive message from server
let socket = io("http://192.168.29.220:8000/");
let isConnecting = false;

export default function useSocket() {
    if (socket?.connected || isConnecting) {
        return socket;
    }
    isConnecting = true;
    socket = io("http://192.168.29.220:8000/");
    return socket;
}