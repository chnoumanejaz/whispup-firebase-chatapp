import './addUser.css';

const AddUser = () => {
  return (
    <div className="addUser">
      <form>
        <input type="text" placeholder="username" name="username" />
        <button>Search</button>
      </form>

      <div className="usersContainer">
        <div className="user">
          <div className="detail">
            {/* TODO: Add an alt attribute to the image below */}
            <img src="./avatar.png" alt="username" />
            <span>User name</span>
          </div>
          <button>Add User</button>
        </div>
        <div className="user">
          <div className="detail">
            {/* TODO: Add an alt attribute to the image below */}
            <img src="./avatar.png" alt="username" />
            <span>User name</span>
          </div>
          <button>Add User</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
