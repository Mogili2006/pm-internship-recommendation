import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  UserPlus,
  AlertCircle,
  CheckCircle,
  Mail,
  Lock,
  User
} from 'lucide-react';

import image_intern from '../../assets/image_intern.png';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess(false);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);

      await register(name, email, password);

      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Email may already be registered.'
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

      {/* RIGHT REGISTER SECTION */}
      <div className="auth-form-section">
        <div className="auth-card register-card">

          <div className="auth-header">

            <div className="auth-icon">
              <UserPlus size={38} />
            </div>

            <h2>Create Your Account</h2>

            <p>
              Build your profile for AI internship recommendations
            </p>

          </div>

          {error && (
            <div
              className="alert alert-danger"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div
              className="alert alert-success"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <CheckCircle size={18} />
              Registration successful! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label className="form-label">
                Full Name
              </label>

              <div className="input-wrapper">
                <User size={19} />

                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Confirm Password
              </label>

              <div className="input-wrapper">
                <Lock size={19} />

                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading || success}
            >
              {loading
                ? 'Creating Account...'
                : 'Register as Student'}
            </button>

          </form>

          <div className="auth-switch">
            Already have an account?{' '}
            <Link to="/login">
              Login Here
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default RegisterPage;