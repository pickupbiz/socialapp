import React, { useState, useEffect, useRef } from 'react';

export const WebSocketClient = () => {
    const [messages, setMessages] = useState([]);
    const [mgs, setMsg] = useState("Hi");
    const [userName, setUserName] = useState("Amjad");
    const [inputValue, setInputValue] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        console.log("Creating WebSocket.....")
        // Create WebSocket connection.
        ws.current = new WebSocket('ws://localhost:5755');
        console.log("Created WebSocket.....")

        // Connection opened
        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        // Listen for messages
        ws.current.onmessage = (event) => {
            const message = {
                userName,
                msg: event.data
            };
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
                msg: inputValue
            };
            const msgData = JSON.stringify(message)
            ws.current.send(msgData);
            setInputValue('');
        } else {
            console.error('WebSocket is not open');
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message.userName} : {message.msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};