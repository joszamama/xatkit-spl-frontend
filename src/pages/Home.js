import React from 'react'
import '../css/Home.css';
import CreateUser from '../components/users/CreateUser';
import LoginUser from '../components/users/LoginUser';
import { Button } from 'semantic-ui-react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [rerender, setRerender] = useState(0);

  const navigate = useNavigate();

  const handleCancel = () => {
    setShowLogin(false);
    setShowRegister(false);
  }

  const handleSignup = () => {
    setShowLogin(true);
    setShowRegister(false);
  }

  const handleSignin = () => {
    setIsLogged(true);
    setShowLogin(false);
    setShowRegister(false);
  }

  const handleLogout = () => {
    setIsLogged(false);
    setShowLogin(false);
    setShowRegister(false);
    localStorage.removeItem('token');
  }

  const handlePL = () => {
    navigate('/pl');  
  }

  const handleIntent = () => {
    navigate('/intents');
  }

  const checkLogged = () => {
    if (localStorage.getItem('token') !== null && rerender === 0) {
      console.log("Recovering token from local storage...");
      setIsLogged(true);
      setRerender(1);
    }
  }

  return (
      <div className="main">
        {checkLogged()}

        <h1 className="main-header">Xatkit SPL</h1>

        {(!showLogin && !showRegister && !isLogged) &&  (
          <div className="welcome">
            <Button type='submit' onClick={() => {setShowLogin(!showLogin)}}>Log in</Button>
            <Button type='submit' onClick={() => {setShowRegister(!showRegister)}}>Register</Button>
          </div>
        )}
        {(showRegister && !isLogged) && (
          <div className="register" style={{display: 'flex'}}>
            <CreateUser handleCancel={handleCancel} handleSignup={handleSignup}/>
          </div>
        )}
        {(showLogin && !isLogged) && (
          <div className="login">
            <LoginUser handleCancel={handleCancel} handleSignin={handleSignin}/>
          </div> 
        )}
        {(isLogged) && (
          <div className="logged">
              <div className="logged d-flex justify-content-center">
                <Button type='submit' onClick={handlePL}>PL</Button>
                <Button type='submit' onClick={handleLogout}>Networks</Button>
                <Button type='submit' onClick={handleLogout}>Chatbots</Button>
                <Button type='submit' onClick={handleIntent}>Intents</Button>
              </div>
              <br/>
              <br/>
              <br/>
              <Button type='submit' onClick={handleLogout}>Log out</Button>
          </div>  
        )}
      </div>
    );
}