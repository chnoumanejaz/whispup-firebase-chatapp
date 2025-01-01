import './userInfo.css';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdVideoCall } from 'react-icons/md';
import { RiChatNewFill } from 'react-icons/ri';

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        {/* TODO: change the alt attribute to the user's name */}
        <img src="./avatar.png" alt="user" />
        <h3>User name</h3>
      </div>

      <div className="icons">
        <HiDotsHorizontal />
        <MdVideoCall />
        <RiChatNewFill />
      </div>
    </div>
  );
};

export default UserInfo;
