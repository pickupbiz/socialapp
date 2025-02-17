import React, { useState, useEffect } from 'react';
import { useWebSocket } from './WebSocketContext';
import {WebS}

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("Hi");
    const [userName, setUserName] = useState("John");
    const ws = useWebSocket();

    useEffect(() => {
        if (ws) {
            // Listen for messages
            ws.onmessage = (event) => {
                const msgData = event.data.replace(/'/g, '"');
                const message = JSON.parse(msgData);
                setMessages((prevMessages) => [...prevMessages, message]);
            };

            // Send a message
            ws.send(JSON.stringify({ type: 'greet', message: 'Hello from UserComponent' }));
        }
    }, [ws]);

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

export default Chat;