// src/components/ViewUserModal.js
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../apiConfig';


const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  },
  section: {
    marginBottom: '1rem'
  },
  label: {
    fontWeight: 'bold'
  },
  button: {
    padding: '0.5rem 1rem',
    background: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '1rem'
  }
};

const ViewUserModal = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Fetching user with ID:", userId);
    if (!userId) return;

    fetch(`${BASE_URL}/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setUser(data.data);
        } else {
          setError(data.message || 'Failed to load user');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Server not reachable');
      });
  }, [userId]);

  if (!userId) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>User Details</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {user ? (
          <>
            <div style={modalStyles.section}>
              <span style={modalStyles.label}>Name: </span>{user.name}
            </div>
            <div style={modalStyles.section}>
              <span style={modalStyles.label}>Email: </span>{user.email}
            </div>
            <div style={modalStyles.section}>
              <span style={modalStyles.label}>ID: </span>{user.user_id || user.id}
            </div>
          </>
        ) : (
          <p>Loading user info...</p>
        )}
        <button onClick={onClose} style={modalStyles.button}>Close</button>
      </div>
    </div>
  );
};

export default ViewUserModal;
