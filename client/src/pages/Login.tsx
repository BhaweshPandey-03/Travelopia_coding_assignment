import React, { useState } from 'react';
import axios from 'axios'; 
import '../styles/login.css'; 
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  username: string;
  email: string;
  password: string;
}
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Login: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const URL = 'https://travelopia-coding-assignment-2.onrender.com'; 
  // const URL = 'http://localhost:4500'; 
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
    try {
      if (isSignUp) {
        const res = await axios.post(`${URL}/signup`, userInfo); 
        console.log(res);
        if(res){
          setIsSignUp(false);
          handleClick();
        }else {
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
          },1000)
          console.log('Login successful');

        } else {
          alert('Login failed, Try Again');
          console.log('Invalid credentials');
        }
      }

      setInterval(() => {
        setOpen(false)
      },2000)
    } catch (error) {
      console.error('Error:', error);
    }

    // setUserInfo({
    //   username: '',
    //   email: '',
    //   password: '',
    // });
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
          <button  type="submit">{isSignUp ? 'Sign up' : 'Log in'}</button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
         {isSignUp ? 'Sign up' : 'Log in'}Successfull!!
        </Alert>
      </Snackbar>
      {/* <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert
          onClose={handleClose2}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
         log In Successfull!!
        </Alert>
      </Snackbar> */}
        </div>
      </form>
      <p>
        {isSignUp
          ? 'Already have an account?'
          : 'Don\'t have an account yet?'}
        <button  onClick={() =>{
        
          setIsSignUp(!isSignUp)}}>
          {isSignUp ? 'Log in' : 'Sign up'}
        </button>
       
      </p>
    </div>
   </div>
  );
};

export default Login;
