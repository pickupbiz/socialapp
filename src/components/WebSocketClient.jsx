import React, { useState, useEffect, useRef } from 'react';

export const WebSocketClient = () => {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("Hi");
    const [userName, setUserName] = useState("John");
    const ws = useRef(null);

    useEffect(() => {
        // Create WebSocket connection.
        ws.current = new WebSocket('ws://localhost:5755');

        // Connection opened
        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        // Listen for messages
        ws.current.onmessage = (event) => {
            const msgData = event.data.replace(/'/g, '"');
            const message = JSON.parse(msgData);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        // Handle errors
        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Connection closed
        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        // Cleanup on component unmount
        return () => {
            ws.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const message = {
                userName,
                msg
            };
            const msgData = JSON.stringify(message)
            ws.current.send(msgData);
            setMsg('');
        } else {
            console.error('WebSocket is not open');
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}><b style={{ color: "brown" }}>{message.userName}</b> : {message.msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};