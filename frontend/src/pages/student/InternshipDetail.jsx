import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { ArrowLeft, Send, Bookmark, ExternalLink, Calendar, MapPin, Briefcase, DollarSign, CheckCircle } from 'lucide-react';

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchInternshipDetails();
  }, [id]);

  const fetchInternshipDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/internships/${id}`);
      setInternship(res.data);

      const [savedCheck, appsRes] = await Promise.all([
        api.get(`/saved/${id}/check`),
        api.get('/applications')
      ]);

      setIsSaved(savedCheck.data.saved);
      const applied = appsRes.data.some(app => app.internshipId === parseInt(id));
      setHasApplied(applied);
    } catch (err) {
      console.error('Failed to load internship details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setMessage('');
      await api.post(`/applications/${id}`);
      setHasApplied(true);
      setMessage('Application submitted successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to submit application.');
    }
  };

  const handleToggleSave = async () => {
    try {
      if (isSaved) {
        await api.delete(`/saved/${id}`);
        setIsSaved(false);
      } else {
        await api.post(`/saved/${id}`);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Save action failed:', err);
    }
  };

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading internship details...</div>;

  if (!internship) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>Internship Listing Not Found</h3>
        <Link to="/student/internships" className="btn btn-secondary" style={{ marginTop: '1rem' }}>Browse All Internships</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary btn-sm" style={{ marginBottom: '1rem' }}>
        <ArrowLeft size={16} /> Back
      </button>

      {message && (
        <div className="alert alert-success" style={{ marginBottom: '1rem' }}>
          {message}
        </div>
      )}

      <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>{internship.title}</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '600' }}>{internship.company}</p>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Industry: <strong>{internship.industry}</strong></p>
          </div>
          <span className="badge badge-info" style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>
            {internship.workMode}
          </span>
        </div>

        <div className="grid grid-cols-4" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem', textAlignment: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Location</span>
            <strong>{internship.location || 'Remote'}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Stipend</span>
            <strong>₹{internship.stipend?.toLocaleString('en-IN')}/mo</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Duration</span>
            <strong>{internship.duration}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Deadline</span>
            <strong>{internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'N/A'}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          {hasApplied ? (
            <button className="btn btn-success" disabled>
              <CheckCircle size={18} /> Already Applied
            </button>
          ) : (
            <button onClick={handleApply} className="btn btn-primary">
              <Send size={18} /> Apply Now
            </button>
          )}

          <button onClick={handleToggleSave} className={`btn ${isSaved ? 'btn-success' : 'btn-secondary'}`}>
            <Bookmark size={18} /> {isSaved ? 'Saved' : 'Save Internship'}
          </button>

          <Link to={`/student/recommendations/${internship.id}`} className="btn btn-secondary">
            View AI Match Analysis
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Required Skills</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {internship.skills?.map((s, i) => (
            <span key={i} className="badge badge-info" style={{ fontSize: '0.9rem', padding: '0.4rem 0.75rem' }}>
              {s.skillName} ({s.requiredLevel})
            </span>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>Detailed Overview</h3>
        <p style={{ whiteSpace: 'pre-line', color: 'var(--text-main)', lineHeight: '1.8' }}>
          {internship.description}
        </p>

        <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Eligibility & Requirements</h4>
        <p style={{ color: 'var(--text-muted)' }}>
          {internship.eligibility || 'Open to all graduates and final year students.'}
        </p>
      </div>
    </div>
  );
};

export default InternshipDetail;
