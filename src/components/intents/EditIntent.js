import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditIntent( props ) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [training, setTraining] = useState('');
    const [formError, setFormError] = useState('');

    const BASE_URL = 'https://xatkit-spl-backend.onrender.com';
    
    useEffect(() => {
        const FETCH_URL = BASE_URL + '/api/intents/' + props.editId;
        fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setTitle(data.title);
            setDescription(data.description);
            setTraining(data.training);
        })
    }, [props.editId]);

    const handleSubmit = () => {
        const FETCH_URL = BASE_URL + '/api/intents/' + props.editId;
        fetch(FETCH_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description,
                training: training,
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setFormError(data.error);
            } else {
                props.handleSuccess();
            }
        })
    }

    return (
    <Form className="create-user">
        <h3 className="create-user-header text-center">Edit Intent</h3>
        <p className="create-user-error">{formError}</p>
        <Form.Field>
            <label>Title</label>
            <input value={title} placeholder='Title' required onChange={(e) => setTitle(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Description</label>
            <input value={description} placeholder='Description' required onChange={(e) => setDescription(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label>Training</label>
            <textarea value={training} placeholder='Training' required onChange={(e) => setTraining(e.target.value)}/>
        </Form.Field>
        <Button type='submit' onClick={handleSubmit}>Edit</Button>
        <Button type='reset' onClick={props.handleCancel}>Cancel</Button>
    </Form>
    )
}