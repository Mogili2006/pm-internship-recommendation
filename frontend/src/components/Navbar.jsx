import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Award, User, LogOut, Briefcase, Sparkles, LayoutDashboard, Bookmark, FileText } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isStudent, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="brand-logo">
          <Award size={28} color="#1d4ed8" />
          <span>PM Internship Portal</span>
          <span className="brand-badge">AI Engine</span>
        </Link>

        <ul className="nav-links">
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about">About Scheme</NavLink>
              </li>
              <li className="nav-item">
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && isStudent && (
            <>
              <li className="nav-item">
                <NavLink to="/student/dashboard">
                  <LayoutDashboard size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/student/recommendations">
                  <Sparkles size={16} style={{ marginRight: '4px', verticalAlign: 'middle', color: '#f59e0b' }} />
                  AI Recommendations
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/student/internships">
                  <Briefcase size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Browse Internships
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/student/saved">
                  <Bookmark size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Saved
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/student/applications">
                  <FileText size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Applications
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/student/profile">
                  <User size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  My Profile
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && isAdmin && (
            <>
              <li className="nav-item">
                <NavLink to="/admin/dashboard">
                  <LayoutDashboard size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Admin Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/internships">
                  <Briefcase size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Manage Internships
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/applications">
                  <FileText size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Applications
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/users">
                  <User size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Students
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <li className="nav-item" style={{ marginLeft: '0.5rem' }}>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm" title="Logout">
                <LogOut size={16} /> Logout ({user.name})
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
