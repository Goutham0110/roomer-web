import { io } from "socket.io-client";

export default class Socket{
    static socket = io("http://localhost:8000/");

    static getSocket(){
        return this.socket;
    }

    getSharedSocket(){
        return "hello"
    }
}