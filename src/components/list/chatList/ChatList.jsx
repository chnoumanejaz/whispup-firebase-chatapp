import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaMinus, FaSearch } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { db } from '../../../lib/firebase';
import { useUserStore } from '../../../lib/userStore';
import AddUser from './addUser/AddUser';
import './chatList.css';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, 'userchats', currentUser.id),
      async res => {
        const items = res.data().chats;

        const promisses = items.map(async item => {
          const userDoc = await getDoc(doc(db, 'users', item.receiverId));
          const user = userDoc.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promisses);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <FaSearch />
          <input type="text" placeholder="Search by user name" />
        </div>

        <div onClick={() => setAddMode(!addMode)} className="svg">
          {addMode ? <FaMinus /> : <FaPlus />}
        </div>
      </div>

      {chats.length > 0 ? (
        chats.map(chat => (
          <div className="item" key={chat.chatId}>
            <img src="./avatar.png" alt={`${chat.user.username}'s avatar`} />
            <div className="texts">
              <span>{chat.user.name}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))
      ) : (
        <h3 className="noChatMsg">
          No chats available. Start new chat by clicking on the plus button
          above.
        </h3>
      )}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
