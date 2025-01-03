import { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdVideoCall } from 'react-icons/md';
import { RiChatNewFill } from 'react-icons/ri';
import { useUserStore } from '../../../lib/userStore';
import './userInfo.css';
import { auth } from '../../../lib/firebase';

const UserInfo = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser } = useUserStore();

  return (
    <div className="userInfo">
      <div className="user">
        <img
          src={currentUser.avatar || './avatar.png'}
          alt={currentUser.username}
        />
        <h3>{currentUser.username}</h3>
      </div>

      <div className="icons">
        <HiDotsHorizontal onClick={() => setShowDropdown(!showDropdown)} />
        <MdVideoCall />
        <RiChatNewFill />
      </div>
      {showDropdown && (
        <button className="logOut" onClick={() => auth.signOut()}>
          Logout
        </button>
      )}
    </div>
  );
};

export default UserInfo;
