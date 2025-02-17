import React from 'react';
// import { WebSocketClient } from './components/WebSocketClient';
import Chat from './components/Chat';
import UserComponent from './components/UserComponent ';
import { WebSocketProvider } from './components/WebSocketProvider';

function App() {
  return (
    <div className="App">
      <WebSocketClient />
      {/* <WebSocketProvider>
        <UserComponent />
        <Chat />
      </WebSocketProvider> */}
    </div>
  );
}

export default App;