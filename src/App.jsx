import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Chat from './components/chat/Chat';
import Detail from './components/details/Detail';
import List from './components/list/List';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';
import { auth } from './lib/firebase';

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(auth, user => {
      console.log(user);
    });

    return () => unsubscribeFromAuth();
  }, []);

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
