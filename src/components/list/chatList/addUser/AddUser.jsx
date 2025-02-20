import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../../../lib/firebase';
import { useUserStore } from '../../../../lib/userStore';
import './addUser.css';

const AddUser = ({ setAddMode }) => {
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchCount, setSearchCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const { currentUser } = useUserStore();
  const [quickAddUsers, setQuickAddUsers] = useState([]);
  const [isLoadingQuickUsers, setIsLoadingQuickUsers] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    const fetchQuickUsers = async () => {
      setIsLoadingQuickUsers(true);
      try {
        const userRef = collection(db, 'users');
        const q = query(userRef, limit(4));
        const querySnapshot = await getDocs(q);

        const fetchedUsers = [];
        querySnapshot.forEach(doc => {
          fetchedUsers.push({
            ...doc.data(),
          });
        });

        setQuickAddUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching quick users: ', error);
      } finally {
        setIsLoadingQuickUsers(false);
      }
    };

    fetchQuickUsers();
  }, []);

  const handleSearch = async e => {
    e.preventDefault();
    setIsSearching(true);
    const formData = new FormData(e.target);
    const username = formData.get('username');

    if (!username) {
      setIsSearching(false);
      toast.error('Please enter a username');
      return;
    }

    try {
      setSearchCount(searchCount + 1);
      const userRef = collection(db, 'users');
      const q = query(userRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setSearchedUser(querySnapshot.docs[0].data());
      } else {
        setSearchedUser(null);
      }
    } catch (error) {
      console.error('Failed to search user', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddUser = async user => {
    setIsAddingUser(true);
    const chatRef = collection(db, 'chats');
    const userChatsRef = collection(db, 'userchats');

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser?.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      toast.success(user.username + ' added successfully!');
      setAddMode(false);
    } catch (error) {
      console.error('Failed to add user', error);
      toast.error('Failed to add user');
    } finally {
      setIsAddingUser(false);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          disabled={isSearching || isAddingUser}
          autoFocus
        />
        <button disabled={isSearching || isAddingUser}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="usersContainer">
        {searchedUser && searchCount > 0 && (
          <div className="user">
            <div className="detail">
              <img
                src={searchedUser.avatar || './avatar.png'}
                alt={searchedUser.username + "'s avatar"}
              />
              <span>
                {searchedUser.username === currentUser.username
                  ? searchedUser.username + ' (You)'
                  : searchedUser.username}
              </span>
            </div>
            <button
              disabled={isSearching || isAddingUser}
              onClick={() => handleAddUser(searchedUser)}>
              {isAddingUser ? 'Adding...' : 'Add User'}
            </button>
          </div>
        )}

        {!searchedUser && searchCount > 0 && !isSearching && (
          <>
            <h4>No user found with that username</h4>
          </>
        )}

        {searchCount == 0 &&
          quickAddUsers.map(user => {
            if (currentUser.username === user.username) return null;
            return (
              <div className="user" key={user.id}>
                <div className="detail">
                  <img
                    src={user.avatar || './avatar.png'}
                    alt={user.username + "'s avatar"}
                  />
                  <span>{user.username}</span>
                </div>
                <button
                  disabled={isSearching || isAddingUser}
                  onClick={() => {
                    setSearchedUser(user);
                    handleAddUser(user);
                  }}>
                  {isAddingUser && user.id === searchedUser?.id
                    ? 'Adding...'
                    : 'Add User'}
                </button>
              </div>
            );
          })}

        {isLoadingQuickUsers && <h4>Loading quick add users...</h4>}
      </div>
    </div>
  );
};

export default AddUser;
