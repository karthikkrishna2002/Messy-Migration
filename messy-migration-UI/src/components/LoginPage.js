import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../apiConfig';


function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!loginEmail || !loginPassword) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        navigate('/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Server not reachable');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSignupSuccess(false);

    if (!signupName || !signupEmail || !signupPassword) {
      setError('Please enter name, email, and password');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setSignupSuccess(true);
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch {
      setError('Server not reachable');
    }
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={isLogin ? handleLogin : handleSignup}
        style={styles.form}
      >
        <h2 style={styles.heading}>{isLogin ? 'Login' : 'Sign Up'}</h2>

        {error && <p style={styles.error}>{error}</p>}
        {signupSuccess && (
          <p style={styles.success}>
            Account created!{' '}
            <span onClick={() => setIsLogin(true)} style={styles.link}>
              Login here
            </span>
          </p>
        )}

        {!isLogin && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              style={styles.input}
              placeholder="Enter your name"
            />
          </div>
        )}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={isLogin ? loginEmail : signupEmail}
            onChange={(e) =>
              isLogin
                ? setLoginEmail(e.target.value)
                : setSignupEmail(e.target.value)
            }
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={isLogin ? loginPassword : signupPassword}
            onChange={(e) =>
              isLogin
                ? setLoginPassword(e.target.value)
                : setSignupPassword(e.target.value)
            }
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p style={styles.switchText}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSignupSuccess(false);
            }}
            style={styles.link}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(to right, #e0ecff, #ffffff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    background: '#ffffff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    width: '360px',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '1.2rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: '500',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  error: {
    color: '#d9534f',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  success: {
    color: '#28a745',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  switchText: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.95rem',
  },
  link: {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default LoginPage;
