import { useState } from 'react';
import './register.css';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const Register = ({ setShowRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: './avatar.png',
  });
  // TODO: add the placeholder for the image url

  const handleAvatar = e => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar({ file, url });
    }
  };

  return (
    <div className="register">
      <h1>Create an Account</h1>
      <form>
        <div className="formGroup avatar">
          <img src={avatar.url} alt="username" />
          <label htmlFor="avatar">
            {/* TODO: Add an alt attribute to the image below */}
            Select an Avatar
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatar}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password:</label>
          <div className="passwordWrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              placeholder="Enter your password"
            />
            <div
              className="eyeIcon"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </div>
          </div>
        </div>
        <div className="loginAccount">
          <p>Already have an account? </p>
          <i onClick={() => setShowRegister(false)}>Login</i>
        </div>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
};

export default Register;
