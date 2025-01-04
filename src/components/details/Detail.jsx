import { toast } from 'react-toastify';
import { useChatStore } from '../../lib/chatStore';
import './detail.css';
import { FaChevronUp, FaChevronDown, FaDownload } from 'react-icons/fa';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';

const Detail = () => {
  const { changeBlock, chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, 'users', currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <div className="detail">
      <div className="user">
        <img
          src={user?.avatar || './avatar.png'}
          alt={user?.username || 'WhispUp user'}
        />
        <h2>{user?.username || 'WhispUp user'}</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <FaChevronUp />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <FaChevronUp />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <FaChevronDown />
          </div>
          <div className="photos">
            <div className="photoItem">
              {/* TODO: change the alt with the image name */}
              <img
                src="https://cdn.pixabay.com/photo/2017/10/12/15/59/family-house-2844962_960_720.jpg"
                alt="user name or image"
              />

              <FaDownload />
            </div>
            <div className="photoItem">
              {/* TODO: change the alt with the image name */}
              <img
                src="https://cdn.pixabay.com/photo/2017/10/12/15/59/family-house-2844962_960_720.jpg"
                alt="user name or image"
              />

              <FaDownload />
            </div>
            <div className="photoItem">
              {/* TODO: change the alt with the image name */}
              <img
                src="https://cdn.pixabay.com/photo/2017/10/12/15/59/family-house-2844962_960_720.jpg"
                alt="user name or image"
              />

              <FaDownload />
            </div>
            <div className="photoItem">
              {/* TODO: change the alt with the image name */}
              <img
                src="https://cdn.pixabay.com/photo/2017/10/12/15/59/family-house-2844962_960_720.jpg"
                alt="user name or image"
              />

              <FaDownload />
            </div>
            <div className="photoItem">
              {/* TODO: change the alt with the image name */}
              <img
                src="https://cdn.pixabay.com/photo/2017/10/12/15/59/family-house-2844962_960_720.jpg"
                alt="user name or image"
              />

              <FaDownload />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <FaChevronDown />
          </div>
        </div>

        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? 'You are blocked'
            : isReceiverBlocked
            ? 'User blocked'
            : 'Block User'}
        </button>
      </div>
    </div>
  );
};

export default Detail;
