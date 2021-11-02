
import './App.css';

import { AuthProvider } from './auth/authContext';
import { ChatProvider } from './context/chat/chatContext';
import { SalaProvider } from './context/sala/salaContext';
import { SocketProvider } from './context/socketContext';
import { TableProvider } from './context/table/TableContext';

import { AppRoute } from './router/appRoute';

function App() {
  return (
    <TableProvider>
      <SalaProvider>
        <ChatProvider>
          <AuthProvider>
            <SocketProvider>
              <AppRoute />
            </SocketProvider>
          </AuthProvider>
        </ChatProvider>
      </SalaProvider>
    </TableProvider>
  );
}

export default App;
