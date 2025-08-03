import React, { useEffect, useState, useRef } from 'react';
import EditUserModal from './EditUserModal';
import ViewUserModal from './ViewUserModal';
import { BASE_URL } from '../apiConfig';


function UserGrid() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUserId, setViewingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debounceTimeout = useRef(null);

  const fetchUsers = () => {
    fetch(`${BASE_URL}/users`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setUsers(data.data);
        } else {
          setError(data.message || 'Failed to fetch users');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Server not reachable');
      });
  };

  const searchUsers = (name) => {
    if (!name) {
      fetchUsers();
      return;
    }

    fetch(`${BASE_URL}/search?name=${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setUsers(data.data);
        } else {
          setError(data.message || 'No users found');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Search failed or server not reachable');
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleView = (userId) => {
    setViewingUserId(userId);
  };

  const handleDelete = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    fetch(`${BASE_URL}/user/${userId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          fetchUsers();
        } else {
          alert(data.message || 'Failed to delete user');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Delete request failed.');
      });
  };

  const handleUpdateSuccess = () => {
    fetchUsers();
    setEditingUser(null);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      searchUsers(value);
    }, 500); // 500ms debounce
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Users List</h2>
      {error && <p style={styles.error}>{error}</p>}

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />

      <div style={styles.grid}>
        {users.map(user => (
          <div key={user.user_id || user.id} style={styles.card}>
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <div style={styles.buttonGroup}>
              <button onClick={() => handleView(user.id || user.user_id)} style={styles.viewBtn}>View</button>
              <button onClick={() => handleEdit(user)} style={styles.editBtn}>Edit</button>
              <button onClick={() => handleDelete(user.id || user.user_id)} style={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {viewingUserId && (
        <ViewUserModal
          key={viewingUserId}
          userId={viewingUserId}
          onClose={() => setViewingUserId(null)}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    background: '#f1f3f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  searchInput: {
    display: 'block',
    margin: '0 auto 2rem auto',
    padding: '0.75rem',
    width: '300px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  buttonGroup: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  viewBtn: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  editBtn: {
    background: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteBtn: {
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default UserGrid;
