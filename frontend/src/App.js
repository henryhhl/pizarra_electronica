
import './App.css';

import { AuthProvider } from './auth/authContext';
import { ChatProvider } from './context/chat/chatContext';
import { SocketProvider } from './context/socketContext';

import { AppRoute } from './router/appRoute';

function App() {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRoute />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
}

export default App;
