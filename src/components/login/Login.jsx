import { useState } from 'react';
import './login.css';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Register from '../register/Register';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return <Register setShowRegister={setShowRegister} />;
  }

  return (
    <div className="login">
      <h1>Welcome Back! Please Login</h1>
      <form>
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
        <div className="createAccount">
          <p>Don&apos;t have an account? </p>
          <i onClick={() => setShowRegister(true)}>Create new account</i>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
