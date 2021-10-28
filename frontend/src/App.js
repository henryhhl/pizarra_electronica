
import './App.css';

import { AuthProvider } from './auth/authContext';
import { ChatProvider } from './context/chat/chatContext';
import { SalaProvider } from './context/sala/salaContext';
import { SocketProvider } from './context/socketContext';

import { AppRoute } from './router/appRoute';

function App() {
  return (
    <SalaProvider>
      <ChatProvider>
        <AuthProvider>
          <SocketProvider>
            <AppRoute />
          </SocketProvider>
        </AuthProvider>
      </ChatProvider>
    </SalaProvider>
  );
}

export default App;
