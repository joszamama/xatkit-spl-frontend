import React from 'react'
import '../css/Home.css';
import jwt_decode from 'jwt-decode';
import { Button } from 'semantic-ui-react'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateIntent from '../components/intents/CreateIntent';
import EditIntent from '../components/intents/EditIntent';
import { useNavigate } from "react-router-dom";

export default function Intent() {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showIntentHome, setShowIntentHome] = useState(true);
  const [userIntents, setUserIntents] = useState([]);
  const [editId, setEditId] = useState('');
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const navigate = useNavigate();

  const BASE_URL = 'https://xatkit-spl-backend.onrender.com';
  
  const handleHome = () => {
    navigate('/');
  }

  const handleCreate = () => {
    setShowCreate(true);
    setShowIntentHome(false);
    setShowEdit(false);
  }

  const handleCancel = () => {
    setShowCreate(false);
    setShowEdit(false);
    setShowIntentHome(true);
  }

  const handleSuccess = () => {
    setRefreshKey(refreshKey + 1);
    setShowCreate(false);
    setShowEdit(false);
    setShowIntentHome(true);
  }
  
  const handleEdit = (intentId) => {
    setEditId(intentId);
    setShowCreate(false);
    setShowEdit(true);
    setShowIntentHome(false);
  }


  const handleDelete = (intentId) => {
    const FETCH_URL = BASE_URL + '/api/intents/' + intentId;
    console.log("URLSLLSLSLS: "+ FETCH_URL);
    fetch(FETCH_URL, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      setRefreshKey(refreshKey + 1);
    })
    .catch(err => setError(err));
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      setError('You must be logged in to view your songs');
      return;
    } else {
      const token = localStorage.getItem("token");
      const userId = jwt_decode(token).id;
      fetch(BASE_URL + '/api/intents/owner/' + userId, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(data => {
          const intents = data;
          setUserIntents(intents);
        })
        .catch(err => setError(err));
      }
    }, [refreshKey]);

  return (
      <div className="main">
        <h3 className="logged-header">Your Intents</h3>
        {(showIntentHome) && (
          <div className="logged">
              <div className="logged d-flex justify-content-center">
              </div>
              <div className="logged d-flex justify-content-center">
                <p className="logged-error">{error}</p>
              </div>
              <div className="logged d-flex justify-content-center">
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userIntents.map((intent) => (
                      <tr key={intent._id}>
                        <td>{intent.title}</td>
                        <td>{intent.description}</td>
                          <td>
                          <Button type='submit' onClick={() => handleEdit(intent._id)}>Edit</Button>
                          <Button class="btn btn-danger" type='submit' onClick={() => handleDelete(intent._id)}>Delete</Button>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="logged d-flex justify-content-center">
                <br/>
                <Button type='submit' onClick={handleCreate}>Create Intent</Button>
                <Button type='submit' onClick={handleHome}>Go Home</Button>
              </div>
              <br/>
              <br/>
              <br/>
          </div>  
        )}
        {(showCreate && !showIntentHome && !showEdit) && (
          <div className="logged">
              <CreateIntent handleCancel={handleCancel} handleSuccess={handleSuccess}/>
          </div>
        )}
        {(showEdit && !showIntentHome && !showCreate) && (
          <div className="logged">
              <EditIntent editId={editId} handleCancel={handleCancel} handleSuccess={handleSuccess}/>
          </div>
        )}
      </div>
    );
}