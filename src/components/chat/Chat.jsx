import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { FaCamera, FaInfoCircle, FaMicrophone } from 'react-icons/fa';
import { IoCall, IoImageSharp, IoSend, IoVideocam } from 'react-icons/io5';
import { RiEmojiStickerFill } from 'react-icons/ri';
import './chat.css';

const Chat = () => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [textMsg, setTextMsg] = useState('');

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
      <div className="center"></div>
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
