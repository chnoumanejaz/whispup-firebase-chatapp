import { useState } from 'react';
import Chat from './components/chat/Chat';
import Detail from './components/details/Detail';
import List from './components/list/List';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';

const App = () => {
  const [user, setUser] = useState(false);

  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}

      <Notification />
    </div>
  );
};

export default App;
