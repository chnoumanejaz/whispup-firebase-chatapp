import './detail.css';
import { FaChevronUp, FaChevronDown, FaDownload } from 'react-icons/fa';

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        {/* TODO: Add user name in alt attribute */}
        <img src="./avatar.png" alt="username" />
        <h2>User name</h2>
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

        <button>Block User</button>
      </div>
    </div>
  );
};

export default Detail;
