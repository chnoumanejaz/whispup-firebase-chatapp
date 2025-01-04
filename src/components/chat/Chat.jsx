import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { FaCamera, FaInfoCircle, FaMicrophone } from 'react-icons/fa';
import { IoCall, IoImageSharp, IoSend, IoVideocam } from 'react-icons/io5';
import { RiEmojiStickerFill } from 'react-icons/ri';
import './chat.css';
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { toast } from 'react-toastify';
import { useUserStore } from '../../lib/userStore';
import { upload } from '../../lib/upload';

const Chat = () => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [textMsg, setTextMsg] = useState('');
  const [chat, setChat] = useState(null);
  const endRef = useRef(null);
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();
  const [image, setImage] = useState({
    file: null,
    url: '',
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), res => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = e => {
    setTextMsg(textMsg + e.emoji);
    setOpenEmojiPicker(false);
  };

  const handleSendMsg = async () => {
    if (!textMsg) return;

    let imgUrl = null;

    try {
      if (image.file) {
        imgUrl = await upload(image.file);
      }
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          text: textMsg,
          senderId: currentUser.id,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIds = [currentUser.id, user.id];

      userIds.forEach(async id => {
        const userChatsRef = doc(db, 'userchats', id);
        const userChatSnapshot = await getDoc(userChatsRef);
        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            c => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = textMsg;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.error('Error sending message: ', error);
      toast.error('Failed to send message');
    }

    setTextMsg('');
    setImage({ file: null, url: '' });
  };

  const handleImage = e => {
    if (!e.target.files[0]) return;
    setImage({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          {/* TODO: change the alt attribute value */}
          <img src="./avatar.png" alt="userrr" />
          <div className="texts">
            <span>User name</span>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <IoCall />
          <IoVideocam />
          <FaInfoCircle />
        </div>
      </div>
      <div className="center">
        {chat?.messages && chat.messages.length > 0 ? (
          chat.messages.map((msg, index) => (
            <div
              className={
                msg.senderId === currentUser.id ? 'message owner' : 'message'
              }
              key={index + msg?.createdAt}>
              <div className="texts">
                {msg.img && <img src={msg.img} alt="image" />}
                <p>{msg.text}</p>
                <span>1 min ago</span>
              </div>
            </div>
          ))
        ) : (
          <div
            className="texts"
            style={{ alignSelf: 'center', margin: 'auto' }}>
            <p>No messages yet</p>
          </div>
        )}

        {image.url && (
          <div className="message owner">
            <div className="texts">
              <img src={image.url} alt="image" />
            </div>
          </div>
        )}

        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="image">
            <IoImageSharp />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            style={{ display: 'none' }}
            onChange={handleImage}
          />
          <FaCamera />
          <FaMicrophone />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Type a message..."
            value={textMsg}
            onChange={e => setTextMsg(e.target.value)}
          />
          <div className="emoji">
            <RiEmojiStickerFill
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            />
            <div className="emojiPicker">
              <EmojiPicker open={openEmojiPicker} onEmojiClick={handleEmoji} />
            </div>
          </div>
        </div>

        <button className="sendButton" onClick={handleSendMsg}>
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
