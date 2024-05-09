import React, { useState } from 'react';
import axios from 'axios'; 
import '../styles/login.css'; 
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface UserInfo {
  username: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // State for loader
  const [errorToastOpen, setErrorToastOpen] = useState(false); // State for error toast

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(event);
    
    setOpen(false);
  };

  const URL = 'https://travelopia-coding-assignment-3.onrender.com'; 
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '',
    email: '',
    password: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const Navigate = useNavigate();
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setUserInfo({ ...userInfo, [field]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Show loader while requesting
    try {
      if (isSignUp) {
        const res = await axios.post(`${URL}/signup`, userInfo); 
        console.log(res);
        if(res){
          setIsSignUp(false);
          handleClick();
        } else {
          alert('Sign up failed');
        }
        console.log('User signed up:', userInfo);
      } else {
        const userInfo2 = {
          email: userInfo.email,
          password: userInfo.password,
        }
        const response = await axios.post(`${URL}/login`, userInfo2); 
        const data = response.data;
        console.log(data);
        if (data) {
          handleClick();
          localStorage.setItem('isAuth', 'true');
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', userInfo.email);
          setInterval(() => {
            Navigate("/home");
          }, 1000)
          console.log('Login successful');

        } else {
          setErrorToastOpen(true); // Show error toast
          console.log('Invalid credentials');
        }
      }

      setInterval(() => {
        setOpen(false)
        setLoading(false); // Hide loader
      }, 2000)
    } catch (error) {
      console.error('Error:', error);
      setErrorToastOpen(true); // Show error toast on error
      setLoading(false); // Hide loader on error
    }
  };

  return (
   <div className='loginSignup' style={{backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')"}}>
     <div className="containerL" >
      <h2>{isSignUp ? 'Sign up' : 'Log in'}</h2>
      <form onSubmit={handleSubmit}>
        {(isSignUp && <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={userInfo.username}
            onChange={(e) => handleInputChange(e, 'username')}
          />
        </div>)}
        { (
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => handleInputChange(e, 'email')}
            />
          </div>
        )}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={userInfo.password}
            onChange={(e) => handleInputChange(e, 'password')}
          />
        </div>
        <div className="form-group">
          <button  type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : (isSignUp ? 'Sign up' : 'Log in')}
          </button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {isSignUp ? 'Sign up' : 'Log in'} Successfull!!
            </Alert>
          </Snackbar>
          <Snackbar
            open={errorToastOpen}
            autoHideDuration={6000}
            onClose={() => setErrorToastOpen(false)}
          >
            <Alert
              onClose={() => setErrorToastOpen(false)}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {isSignUp ? 'Sign up' : 'Log in'} failed, Try Again!
            </Alert>
          </Snackbar>
        </div>
      </form>
      <p>
        {isSignUp
          ? 'Already have an account?'
          : 'Don\'t have an account yet?'}
        <button  onClick={() => {
          setIsSignUp(!isSignUp)
        }}>
          {isSignUp ? 'Log in' : 'Sign up'}
        </button>
      </p>
    </div>
   </div>
  );
};

export default Login;
