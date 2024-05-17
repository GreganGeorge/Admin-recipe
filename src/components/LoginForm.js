import React, { useState } from 'react'
import { useLocation,useNavigate} from "react-router-dom"
import {toast} from 'react-hot-toast';
import email_icon from "../img/email.png";
import password_icon from "../img/password.png";
import './LoginForm.css'
import { Link } from "react-router-dom";
//import { useAuth } from './AuthContext'; 
//import { useLoginContext } from './LoginContext';
//export const RecoveryContext = createContext();
const LoginForm = (props) => {
    //const { login } = useAuth(); 
    //const { setAuthenticated } = props;
    const navigate = useNavigate();
    const [action,setAction]=useState("Login")
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    //const { setemail } = useLoginContext();
    const [password,setPassword]=useState('')
    const url = "http://localhost:5112/api/User";
    const getData3 = async (url1) => {
        try {
            console.log("url1");
            console.log(url1);
          //setLoading(true);
          fetch(url1)
            .then((response) => response.json())
            .then((json) => {
              //setRecipes(json);
              console.log('json');
              console.log(json);
              if(json.length>0){
                toast.success("Logged in");
                //alert("Logged in");
                //window.localStorage.setItem("isLoggedIn", 'Yes');
                //setAuthenticated(true);
                //localStorage.setItem('isAuthenticated', 'true');
                navigate(`/home`); 
              }
              else{
                toast.error("Incorrect credentials");
                //alert("Incorrect password");
              }
            });
          //setLoading(false);
        } catch (err) {
          //setError(err.message);
        }
      };
      const changeEmail=(e)=>{
        setEmail(e.target.value);
    }
    const changePassword=(e)=>{
        setPassword(e.target.value);
    }
    const createClick = () => {
    var userData=[];
    var user={};
    user.username=''
    user.email=email;
    user.password=password;
    userData.push(user);  
   var userDataPass=JSON.stringify(userData);
   const url1 = `http://localhost:5112/api/user/Get3?password=${password}&email=${email}`;
   getData3(url1);
    }
  return (
    <div className='container1 mt-20'>
                {/* <RecoveryContext.Provider
      value={{email}}
    >
    </RecoveryContext.Provider> */}
        <div className='header mt-60'>
            <div className='text mt-60'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <img src={email_icon} alt=""/>
                <input type="email" placeholder='Email Id' value={email} onChange={changeEmail}/>
            </div>
            <div className='input'>
                <img src={password_icon} alt=""/>
                <input type="password" placeholder='Password' value={password} onChange={changePassword}/>
            </div>
        </div>
        <button class="header1 ml-60 btn btn-primary mt-5 " type="submit" onClick={()=>createClick()}>{action}</button>
    </div>
  )
}

export default LoginForm