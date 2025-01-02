import { useState } from 'react';
import './userInfo.css';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdVideoCall } from 'react-icons/md';
import { RiChatNewFill } from 'react-icons/ri';

const UserInfo = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="userInfo">
      <div className="user">
        {/* TODO: change the alt attribute to the user's name */}
        <img src="./avatar.png" alt="user" />
        <h3>User name</h3>
      </div>

      <div className="icons">
        <HiDotsHorizontal onClick={() => setShowDropdown(!showDropdown)} />
        <MdVideoCall />
        <RiChatNewFill />
      </div>
      {showDropdown && <button className="logOut">Logout</button>}
    </div>
  );
};

export default UserInfo;
