import { io } from "socket.io-client";
import configs from "../config/config";


// TODO: Receive message from server
let socket = io(configs.SERVER_URL);
let isConnecting = false;

export default function useSocket() {
    if (socket?.connected || isConnecting) {
        return socket;
    }
    isConnecting = true;
    socket = io(configs.SERVER_URL);
    return socket;
}