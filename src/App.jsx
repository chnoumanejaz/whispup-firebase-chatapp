import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import Chat from './components/chat/Chat';
import Detail from './components/details/Detail';
import List from './components/list/List';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(auth, user => {
      fetchUserInfo(user?.uid);
    });

    return () => unsubscribeFromAuth();
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
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
