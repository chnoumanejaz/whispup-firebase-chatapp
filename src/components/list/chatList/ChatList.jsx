import { useState } from 'react';
import { FaMinus, FaSearch } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import './chatList.css';
import AddUser from './addUser/AddUser';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
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

      <div className="item">
        {/* TODO: change the alt attribute value */}
        <img src="./avatar.png" alt="user" />
        <div className="texts">
          <span>User name</span>
          <p>hello hiiii</p>
        </div>
      </div>
      <div className="item">
        {/* TODO: change the alt attribute value */}
        <img src="./avatar.png" alt="user" />
        <div className="texts">
          <span>User name</span>
          <p>hello hiiii</p>
        </div>
      </div>
      <div className="item">
        {/* TODO: change the alt attribute value */}
        <img src="./avatar.png" alt="user" />
        <div className="texts">
          <span>User name</span>
          <p>hello hiiii</p>
        </div>
      </div>
      <div className="item">
        {/* TODO: change the alt attribute value */}
        <img src="./avatar.png" alt="user" />
        <div className="texts">
          <span>User name</span>
          <p>hello hiiii</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
