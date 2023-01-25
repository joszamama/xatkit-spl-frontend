import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginUser( props ) {
    const BASE_URL = 'https://xatkit-spl-backend.onrender.com';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(false);
    const [formError, setFormError] = useState('');

    const handleSubmit = () => {
        fetch(BASE_URL + "/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password   
            })
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos');
            } else {
                return response.json();
            }
        }).then(data => {
            localStorage.setItem('token', data.accessToken);
            props.handleSignin();
        })
        .catch(error => {
            setFormError(error.message)
            return;     
        });
    }

    return (
    <Form className="create-user">
        <h3 className="create-user-header text-center">Log in into your account</h3>
        <p className="create-user-error">{formError}</p>
        <Form.Field>
            <label>Username</label>
            <input placeholder='Username' required onChange={(e) => setUsername(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)}/>
        </Form.Field>
        <Button type='submit' onClick={handleSubmit}>Submit</Button>
        <Button type='reset' onClick={props.handleCancel}>Cancel</Button>
    </Form>
    )
}