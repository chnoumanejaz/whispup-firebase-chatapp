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
      <div className="center">
        <div className="message">
          {/* TODO: change the alt attribute value */}
          <img src="./avatar.png" alt="user name" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptate nulla magni quam fuga non voluptatibus optio, quos
              consequatur saepe deleniti! Minus omnis modi consequuntur ipsa
              facilis animi, eveniet corrupti. Obcaecati.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message owner">
          <div className="texts">
            {/* TODO: change the alt attribute value */}
            <img
              src="https://cdn.pixabay.com/photo/2017/10/12/15/59/family-house-2844962_960_720.jpg"
              alt="user name or image"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptate nulla magni quam fuga non voluptatibus optio, quos
              consequatur saepe deleniti! Minus omnis modi consequuntur ipsa
              facilis animi, eveniet corrupti. Obcaecati.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          {/* TODO: change the alt attribute value */}
          <img src="./avatar.png" alt="user name" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptate nulla magni quam fuga non voluptatibus optio, quos
              consequatur saepe deleniti! Minus omnis modi consequuntur ipsa
              facilis animi, eveniet corrupti. Obcaecati.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
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
