import React from 'react'
import './css/App.css';
import CreateUser from './components/users/CreateUser';
import LoginUser from './components/users/LoginUser';
import { Button } from 'semantic-ui-react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

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
  }


  return (
      <div className="main">
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
            <h3 className="logged-header">You are logged in!</h3>
              <div className="logged d-flex justify-content-center">
                <Button type='submit' onClick={handleLogout}>Log out</Button>
              </div>
          </div>
          
        )}
      </div>
    );
}