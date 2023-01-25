import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateUser( props ) {    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [formError, setFormError] = useState('');

    const BASE_URL = 'https://xatkit-spl-backend.onrender.com';
    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setFormError("Passwords don't match");
            return;
        } else if (!checkbox) {
            setFormError("You must agree to the terms and conditions");
            return;
        } else {
            fetch(BASE_URL + "/api/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password   
                })
            })
            .then(function (response) {
                if (!response.ok) {
                    console.log(response.status);
                    setFormError(response.data.message);
                    return;
                }
            })
            .then(data => {  
                    props.handleSignup();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    return (
    <Form className="create-user">
        <h3 className="create-user-header text-center">Create a new account</h3>
        <p className="create-user-error">{formError}</p>
        <Form.Field>
            <label>Username</label>
            <input placeholder='Username' required onChange={(e) => setUsername(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Email</label>
            <input placeholder='Email' required onChange={(e) => setEmail(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Confirm password</label>
            <input type="password" placeholder='Confirm password' required onChange={(e) => setConfirmPassword(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' required onChange={(e) => setCheckbox(!checkbox)}/>
        </Form.Field>
        <Button type='submit' onClick={handleSubmit}>Submit</Button>
        <Button type='reset' onClick={props.handleCancel}>Cancel</Button>
    </Form>
    )
}