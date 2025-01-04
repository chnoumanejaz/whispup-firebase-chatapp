import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { auth } from '../../lib/firebase';
import Register from '../register/Register';
import './login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success('Logged in successfully');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          toast.error('No user found with this email.');
          break;
        case 'auth/invalid-credential':
          toast.error('Invalid email or password.');
          break;
        case 'auth/user-disabled':
          toast.error('User account is disabled.');
          break;
        default:
          toast.error('Failed to login, ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (showRegister) {
    return <Register setShowRegister={setShowRegister} />;
  }

  return (
    <div className="login">
      <h1>Welcome Back! Please Login</h1>
      <form onSubmit={handleLogin}>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            disabled={isLoading}
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
              disabled={isLoading}
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
