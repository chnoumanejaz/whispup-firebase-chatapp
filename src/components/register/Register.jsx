import { useState, useTransition } from 'react';
import './register.css';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { upload } from '../../lib/upload';

const Register = ({ setShowRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

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

  const handleRegister = e => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.target);
      const { username, email, password } = Object.fromEntries(formData);

      try {
        const usersQuery = query(
          collection(db, 'users'),
          where('username', '==', username)
        );
        const querySnapshot = await getDocs(usersQuery);

        console.log('usersQuery', usersQuery);
        console.log('querySnapshot', querySnapshot);
        if (!querySnapshot.empty) {
          toast.error('This username is already taken');
          return;
        }

        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const imgUrl = await upload(avatar.file);
        await setDoc(doc(db, 'users', response.user.uid), {
          username,
          email,
          avatar: imgUrl,
          id: response.user.uid,
          blocked: [],
        });

        await setDoc(doc(db, 'userchats', response.user.uid), {
          chats: [],
          id: response.user.uid,
        });

        toast.success(
          `Account created successfully! Please log in to continue.`
        );
        setShowRegister(false);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('This email is already associated with an account');
        } else if (error.code === 'auth/invalid-email') {
          toast.error('Please enter a valid email address');
        } else if (error.code === 'auth/weak-password') {
          toast.error(
            'Password is too weak. Please use at least 6 characters.'
          );
        } else {
          toast.error(`Failed to create an account: ${error.message}`);
        }
      }
    });
  };

  return (
    <div className="register">
      <h1>Create an Account</h1>
      <form onSubmit={handleRegister}>
        <div className="formGroup avatar">
          <img src={avatar.url} alt={`avatar_${avatar.file?.name}`} />
          <label htmlFor="avatar">Select an Avatar</label>
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
        <button type="submit">
          {isPending ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </div>
  );
};

export default Register;
