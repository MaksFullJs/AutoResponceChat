
import { ChatContextProvider } from './context/ChatContext';
import MainPage from './pages/Main/MainPage';

function App() {
  return (
    <ChatContextProvider>
      <MainPage/>
    </ChatContextProvider>
  );
}

export default App;
