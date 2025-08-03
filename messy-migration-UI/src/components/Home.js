import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserGrid from './UserGrid';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: Clear auth data from localStorage/sessionStorage
    // localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={styles.navTitle}>User Management Portal</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </nav>

      <header style={styles.header}>
        <h1 style={styles.heading}>Welcome to Home Page</h1>
      </header>

      <main style={styles.main}>
        <UserGrid />
      </main>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  navbar: {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navTitle: {
    margin: 0,
    fontSize: '1.5rem',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    padding: '0.5rem 1rem',
    color: '#fff',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  header: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  heading: {
    fontSize: '2.2rem',
    color: '#343a40',
    marginBottom: '1rem',
  },
  main: {
    padding: '2rem',
  },
};

export default Home;
