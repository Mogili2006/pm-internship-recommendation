import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  KeyRound,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

import api from '../../services/api';
import image_intern from '../../assets/image_intern.png';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess(false);

    if (!email || !newPassword || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      await api.put('/auth/forgot-password', {
        email: email,
        newPassword: newPassword
      });

      setSuccess(true);

      setEmail('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 1800);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Unable to change password. Please check your email.'
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

      {/* RIGHT FORM SECTION */}
      <div className="auth-form-section">
        <div className="auth-card">

          <div className="auth-header">

            <div className="auth-icon">
              <KeyRound size={38} />
            </div>

            <h2>Forgot Password?</h2>

            <p>
              Enter your email and create a new password
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* SUCCESS */}
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
              Password changed successfully! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
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

            {/* NEW PASSWORD */}
            <div className="form-group">

              <label className="form-label">
                New Password
              </label>

              <div className="input-wrapper">

                <Lock size={19} />

                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">

              <label className="form-label">
                Confirm New Password
              </label>

              <div className="input-wrapper">

                <Lock size={19} />

                <input
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  className="form-control"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? 'Hide confirm password'
                      : 'Show confirm password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* CHANGE PASSWORD BUTTON */}
            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading || success}
            >
              {loading
                ? 'Changing Password...'
                : 'Change Password'}
            </button>

          </form>

          {/* BACK TO LOGIN */}
          <div className="auth-switch">
            Remember your password?{' '}
            <Link to="/login">
              Login Here
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ForgotPasswordPage;