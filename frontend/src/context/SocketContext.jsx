import { createContext, useEffect, useState, useContext, useRef } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();
    const socketRef = useRef(null);

    useEffect(() => {
        if (authUser && !socketRef.current) {
            const socket = io("http://localhost:3000", {
                query: { userId: authUser._id },
            });

            socketRef.current = socket;

            socket.on("onlineUsers", (users) => {
                setOnlineUsers(users);
            });

            socket.on("connect", () => {
                console.log("Connected to socket server");
            });

            socket.on("disconnect", () => {
                console.log("Disconnected from socket server");
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect(); // not close()
                socketRef.current = null;
                setOnlineUsers([]);
            }
        };
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
