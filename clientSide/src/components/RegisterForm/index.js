import React, { useState } from 'react';
import signIn from '../images/sign_up.png'
import { useHistory} from 'react-router-dom';
import './index.css'

const LoginForm = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    
    const [registerStatus, setRegisterStatus]=useState(false)
    const history = useHistory();
      
    const handleLogin = ()=>{
        history.replace('/')
    }

   const  onSubmitSignUpSuccess = () => {
        history.replace('/')
      };

    const signUpSubmitForm = async (event) => {
        console.log("submitted")
        event.preventDefault();
        const userDetails = { name, email, password };
        const url = `${window.location.origin}/register`;
        const options = {
          method: "POST",
          body: JSON.stringify(userDetails),
          headers: {
            "Content-Type": "application/json"
          }
        };
         console.log("fetched")
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            onSubmitSignUpSuccess();
  
          } else {
            console.log(data.error_msg);
            setRegisterStatus(true)
          }
        } catch (error) {
            console.log("error")
          console.log('Error:', error);
        }
      };
    


    const handleBlur1= () => {
      if (name.trim() === '') {
        setError1(true);
      } else {
        setError1(false);
      }
    };

    const handleBlur2 = () => {
      if (email.trim() === '' || !email.includes("@")) {
        setError2(true);
      } else {
        setError2(false);
      }
    };

    const handleBlur3 = () => {
      if (password.trim() === '') {
        setError3(true);
      } else {
        setError3(false);
      }
    };

   

    return (
        <div className='login-container'>
            <div className='info-section'>
                <img className='logo' src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png" alt="app logo"/>
                <div className='informationLayout'>
                    <img className="signIn" src={signIn} alt="reg-img"/>
                    <h1 className='form-content'>
                    Your fortress of digital defense. Safeguarding your online world with ironclad protection.
                    </h1>
                </div>
            </div>
                
            <div className='register-section'>
                <h1 className='register-heading'>Create Account</h1>
                <form className='signUpForm'>
                    <input className="login-sign-inputs" type="type" onBlur={handleBlur1} placeholder='👤 Full Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    {error1?<p className='error-indicator'>Required*</p>:null}
                    <input className="login-sign-inputs" type="email" onBlur={handleBlur2} placeholder="📧 Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error2?<p className='error-indicator'>Required*</p>:null}
                    <input className="login-sign-inputs" type="password" onBlur={handleBlur3} placeholder="🔐 Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error3?<p className='error-indicator'>Required*</p>:null}
                    <button className='login-sign-button' onClick={signUpSubmitForm}>Sign Up</button>
                </form>
                <div className='bottom-section'>
                    <hr className="line" />
                    <span>or</span>
                    <hr className="line" />
                    </div>
                <p className='account-info'>Already I have account <span className='link' onClick={handleLogin}>Login In</span></p>
                {registerStatus?<p className="registerStatus">User already exists!</p>:null}
            </div> 
            </div>
    )
};

export default LoginForm
