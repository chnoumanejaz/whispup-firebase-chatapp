import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { FaCamera, FaInfoCircle, FaMicrophone } from 'react-icons/fa';
import { IoCall, IoImageSharp, IoSend, IoVideocam } from 'react-icons/io5';
import { RiEmojiStickerFill } from 'react-icons/ri';
import './chat.css';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';

const Chat = () => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [textMsg, setTextMsg] = useState('');
  const [chat, setChat] = useState(null);
  const endRef = useRef(null);
  const { chatId } = useChatStore();

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
            <div className="message owner" key={index + msg?.createdAt}>
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

        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <IoImageSharp />
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

        <button className="sendButton">
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
