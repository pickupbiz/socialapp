import React, { createContext, useContext, useEffect, useRef } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const ws = useRef(null);

    useEffect(() => {
        // Create a WebSocket connection
        ws.current = new WebSocket('wss://chatsocket.pickupbiz.in');

        // Handle connection open
        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        // Handle errors
        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Handle connection close
        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        // Cleanup on unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={ws.current}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};