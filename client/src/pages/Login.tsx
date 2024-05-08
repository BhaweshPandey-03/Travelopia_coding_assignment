import React, { useState } from 'react';
import axios from 'axios'; 
import '../styles/login.css'; 
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  username: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const URL = 'https://tourminder.onrender.com'; 
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
          localStorage.setItem('isAuth', 'true');
          Navigate("/home");
          console.log('Login successful');

        } else {
          console.log('Invalid credentials');
        }
      }
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
          <button type="submit">{isSignUp ? 'Sign up' : 'Log in'}</button>
        </div>
      </form>
      <p>
        {isSignUp
          ? 'Already have an account?'
          : 'Don\'t have an account yet?'}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Log in' : 'Sign up'}
        </button>
      </p>
    </div>
   </div>
  );
};

export default Login;
