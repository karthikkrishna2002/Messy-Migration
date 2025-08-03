import React, { useState, useEffect } from 'react';
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
  formGroup: {
    marginBottom: '1rem'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem'
  },
  button: {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none'
  },
  updateBtn: {
    background: '#28a745',
    color: 'white'
  },
  cancelBtn: {
    background: '#6c757d',
    color: 'white'
  }
};

const EditUserModal = ({ user, onClose, onUpdateSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = () => {
    fetch(`${BASE_URL}/user/${user.user_id || user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          onUpdateSuccess(); // refetch users
          onClose();         // close modal
        } else {
          alert(data.message || 'Update failed');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update user.');
      });
  };

  if (!user) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>Edit User</h2>
        <div style={modalStyles.formGroup}>
          <label>Name:</label>
          <input style={modalStyles.input} value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={modalStyles.formGroup}>
          <label>Email:</label>
          <input style={modalStyles.input} value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div style={modalStyles.buttonGroup}>
          <button style={{ ...modalStyles.button, ...modalStyles.cancelBtn }} onClick={onClose}>Cancel</button>
          <button style={{ ...modalStyles.button, ...modalStyles.updateBtn }} onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
