import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import CustomErrorMessage from './CustomErrorMessage'; // Import the custom error message component
import './EmployerAuthPage.css';

const EmployerAuthPage = ({ apiUrl }) => {
  const { setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter.');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number.');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*).');
    }

    return errors.length > 0 ? errors : null;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      const passwordErrors = validatePassword(password);
      if (passwordErrors) {
        setError(passwordErrors.join('\n'));
        setShowError(true);
        return;
      }
    }

    const url = isLogin ? `${apiUrl}/login` : `${apiUrl}/signup`;
    const data = isLogin
      ? { email, password, userType: 'employer' }
      : { email, password, companyName, companyAddress, userType: 'employer' };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setUser({
          userId: result.userId,
          userType: 'employer',
          name: result.companyName,
        });
        navigate('/employer/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred during sign up.');
        setShowError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('This email is already registered. Please sign in.');
      setShowError(true);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const closeError = () => {
    setShowError(false);
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Employer Login' : 'Employer Sign Up'}</h1>
      <form onSubmit={handleAuth}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{isLogin ? 'Password:' : 'Create Password:'}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="companyAddress">Company Address:</label>
              <input
                type="text"
                id="companyAddress"
                name="companyAddress"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button className="toggle-button" onClick={toggleAuthMode}>
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
      </button>
      {showError && <CustomErrorMessage message={error.split('\n').map((msg, idx) => <span key={idx}>{msg}<br/></span>)} onClose={closeError} />}
    </div>
  );
};

export default EmployerAuthPage;
