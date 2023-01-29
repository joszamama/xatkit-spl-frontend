import React from 'react'
import jwt_decode from 'jwt-decode';
import { Button, Form } from 'semantic-ui-react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateIntent( props ) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [training, setTraining] = useState(false);
    const [formError, setFormError] = useState('');

    const BASE_URL = 'https://xatkit-spl-backend.onrender.com';
    const handleSubmit = () => {
        if (localStorage.getItem("token") === null) {
            setFormError("You must be logged in to create an intent");
            window.location.href = '/';
            return;
        } else {
            const token = localStorage.getItem("token");
            const userId = jwt_decode(token).id;
            fetch(BASE_URL + "/api/intents", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    owner: userId,
                    title: title,
                    description: description,
                    training: training   
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
                    props.handleSuccess();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    return (
    <Form className="create-user">
        <h3 className="create-user-header text-center">Create a new Intent</h3>
        <p className="create-user-error">{formError}</p>
        <Form.Field>
            <label>Title</label>
            <input placeholder='Title' required onChange={(e) => setTitle(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Description</label>
            <input placeholder='Description' required onChange={(e) => setDescription(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Training</label>
            <textarea placeholder='Training' required onChange={(e) => setTraining(e.target.value)}/>
        </Form.Field>
        <Button type='submit' onClick={handleSubmit}>Create</Button>
        <Button type='reset' onClick={props.handleCancel}>Cancel</Button>
    </Form>
    )
}