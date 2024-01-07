import React, { useState } from 'react';
import loginIn from '../images/sign_in.png'
import { useHistory} from 'react-router-dom';
import Cookies from 'js-cookie' 
import './index.css'

const LoginForm = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error4, setError4] = useState(false);
    const [error5, setError5] = useState(false);
    
    const [loginStatus, setLoginStatus] = useState(false)
    const history = useHistory();
      
    const handleLogin = ()=>{
        history.replace('/register')
    }

      const onSubmitLoginSuccess = (jwtToken, userId) => {
        if (jwtToken) {
          Cookies.set('jwt_token', jwtToken, {
            expires: 30,
            path: '/',
          });
          history.replace(`/user/${userId}/details`);
        } else {
          console.log('No token found in response');
        }
      };
    
      const loginSubmitForm = async (event) => {
        event.preventDefault();
        const userLoginDetails = { email, password };
        const url = `${window.location.origin}/login`;
        const options = {
          method: "POST",
          body: JSON.stringify(userLoginDetails),
          headers: {
            "Content-Type": "application/json"
          }
        };
      
        try {
          const response = await fetch(url, options);
          
          if (response.ok) {
            const data = await response.json();
            onSubmitLoginSuccess(data.token, data.userId);
          } else {
            console.log("Invalid credentials");
            setLoginStatus(true);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      

    const handleBlur4 = () => {
      if (email.trim() === '' || !email.includes('@')) {
        setError4(true);
      } else {
        setError4(false);
      }
    };

    const handleBlur5 = () => {
      if (password.trim() === '') {
        setError5(true);
      } else {
        setError5(false);
      }
    };

    return (
        <div className='login-container'>
            <div className='info-section'>
                <img className='logo' src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png" alt="app logo"/>
                <div className='informationLayout'>
                    <img className="loginIn" src={loginIn} alt="login-img"/>
                    <h1 className='form-content'>
                    Safely stow your digital keys. Store, shield, and access your passwords securely, hassle-free.
                    </h1>
                </div>
            </div>
                
            <div className='register-section'>
                <h1 className='register-heading'>Login Account</h1>
                <form className='signUpForm'>
                    <input className="login-sign-inputs" type="email" onBlur={handleBlur4} placeholder="📧 Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error4?<p className='error-indicator'>Required*</p>:null}
                    <input className="login-sign-inputs" type="password" onBlur={handleBlur5} placeholder="🔐 Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error5?<p className='error-indicator'>Required*</p>:null}
                    <button className='login-sign-button' onClick={loginSubmitForm}>Login</button>
                </form>
                <div className='bottom-section'>
                    <hr className="line" />
                    <span>or</span>
                    <hr className="line" />
                    </div>
                <p className='account-info'>I didn't have an account <span className='link' onClick={handleLogin}>Sign Up</span></p>
                {loginStatus?<p className="registerStatus">Invalid credentials!</p>:null}
            </div>
            
            </div>
    )
};

export default LoginForm
