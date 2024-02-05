import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
const WebSocketContext = createContext();
export const useWebSocket = ()=>{
    return useContext(WebSocketContext)
};
export const WebSocketProvider=({children})=>{
    const[websocket,setWebSocket]=useState(null);
    useEffect(()=>{
        const socket=new WebSocket('ws://localhost:8000/chat/')
        socket.onopen=(eve)=>{
            console.log("connection established")
        }
        setWebSocket(socket);
        return ()=>{
            socket.close();
        }
    },[])
    return(
        <WebSocketContext.Provider value={websocket}>
            {children}
        </WebSocketContext.Provider>
    )
}