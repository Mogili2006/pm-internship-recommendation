import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  LogIn,
  Mail,
  Lock,
  AlertCircle
} from 'lucide-react';

import image_intern from '../../assets/image_intern.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);

      const userData = await login(email, password);

      if (userData.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT IMAGE SECTION */}
      <div className="auth-image-section">
        <img
          src={image_intern}
          alt="AI powered internship recommendation"
          className="auth-illustration"
        />
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="auth-form-section">
        <div className="auth-card">

          <div className="auth-header">
            <div className="auth-icon">
              <LogIn size={38} />
            </div>

            <h2>Welcome Back</h2>

            <p>
              Login to your internship recommendation account
            </p>
          </div>

          {error && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label className="form-label">
                Email Address
              </label>

              <div className="input-wrapper">
                <Mail size={19} />

                <input
                  type="email"
                  className="form-control"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Password
              </label>

              <div className="input-wrapper">
                <Lock size={19} />

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login to Account'}
            </button>

          </form>

          <div className="auth-switch">
            Don't have a student account?{' '}
            <Link to="/register">
              Register Here
            </Link>
          </div>

          <div className="demo-credentials">
            <strong>Demo Credentials</strong>

            <div>
              Student: <code>student@example.com</code> /{' '}
              <code>student123</code>
            </div>

            <div>
              Admin: <code>admin@pminternship.gov.in</code> /{' '}
              <code>admin123</code>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;