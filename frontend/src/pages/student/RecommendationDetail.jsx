import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import ScoreBadge from '../../components/ScoreBadge';
import { Sparkles, CheckCircle, AlertCircle, Bookmark, Send, ArrowLeft, Target, BookOpen, Lightbulb, ExternalLink } from 'lucide-react';

const RecommendationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/recommendations/${id}`);
      setRecommendation(res.data);

      // Check saved and application status
      const [savedCheck, appsRes] = await Promise.all([
        api.get(`/saved/${id}/check`),
        api.get('/applications')
      ]);

      setIsSaved(savedCheck.data.saved);
      const applied = appsRes.data.some(app => app.internshipId === parseInt(id));
      setHasApplied(applied);
    } catch (err) {
      console.error('Failed to load recommendation details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setActionMessage('');
      await api.post(`/applications/${id}`);
      setHasApplied(true);
      setActionMessage('Application submitted successfully!');
    } catch (err) {
      setActionMessage(err.response?.data?.message || 'Failed to submit application.');
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

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Analyzing profile against internship criteria...</div>;

  if (!recommendation) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>Recommendation Not Found</h3>
        <Link to="/student/recommendations" className="btn btn-secondary" style={{ marginTop: '1rem' }}>Back to Recommendations</Link>
      </div>
    );
  }

  const { internship } = recommendation;

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary btn-sm" style={{ marginBottom: '1rem' }}>
        <ArrowLeft size={16} /> Back
      </button>

      {actionMessage && (
        <div className="alert alert-success" style={{ marginBottom: '1rem' }}>
          {actionMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--secondary)', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              <Sparkles size={16} /> Explainable AI Analysis Result
            </div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>{internship.title}</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: '600' }}>{internship.company}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
              📍 {internship.location || 'Remote'} | 💼 {internship.workMode} | 💰 ₹{internship.stipend?.toLocaleString('en-IN')}/month | ⏳ {internship.duration}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Overall Suitability</div>
            <ScoreBadge score={recommendation.overallScore} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {hasApplied ? (
            <button className="btn btn-success" disabled style={{ opacity: 0.9 }}>
              <CheckCircle size={18} /> Application Submitted
            </button>
          ) : (
            <button onClick={handleApply} className="btn btn-primary">
              <Send size={18} /> Apply for Internship
            </button>
          )}

          <button onClick={handleToggleSave} className={`btn ${isSaved ? 'btn-success' : 'btn-secondary'}`}>
            <Bookmark size={18} /> {isSaved ? 'Saved to Bookmarks' : 'Bookmark Internship'}
          </button>

          {internship.applicationUrl && (
            <a href={internship.applicationUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
              Official MCA Portal <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Match Score Breakdown (Weighted Multi-factor) */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target color="var(--primary)" size={22} /> Match Score Breakdown
        </h3>

        <div className="score-breakdown-grid">
          <div className="score-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Skill Match (40%)</span>
            <div className="val">{recommendation.skillScore}%</div>
          </div>
          <div className="score-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Education (20%)</span>
            <div className="val">{recommendation.educationScore}%</div>
          </div>
          <div className="score-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Interest (15%)</span>
            <div className="val">{recommendation.interestScore}%</div>
          </div>
          <div className="score-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location (10%)</span>
            <div className="val">{recommendation.locationScore}%</div>
          </div>
          <div className="score-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Career Goal (10%)</span>
            <div className="val">{recommendation.careerGoalScore}%</div>
          </div>
          <div className="score-card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Work Mode (5%)</span>
            <div className="val">{recommendation.workModeScore}%</div>
          </div>
        </div>
      </div>

      {/* Skills Comparison */}
      <div className="grid grid-cols-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ borderColor: '#bbf7d0', background: '#f0fdf4' }}>
          <h3 style={{ color: '#166534', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle color="#16a34a" size={20} /> MATCHING SKILLS ({recommendation.matchingSkills?.length || 0})
          </h3>
          {recommendation.matchingSkills?.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No direct technical skill overlaps found.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {recommendation.matchingSkills.map((skill, i) => (
                <span key={i} className="skill-tag skill-matching" style={{ fontSize: '0.9rem', padding: '0.4rem 0.75rem' }}>
                  ✓ {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="card" style={{ borderColor: '#fecaca', background: '#fef2f2' }}>
          <h3 style={{ color: '#991b1b', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertCircle color="#dc2626" size={20} /> MISSING SKILLS ({recommendation.missingSkills?.length || 0})
          </h3>
          {recommendation.missingSkills?.length === 0 ? (
            <p style={{ color: '#15803d', fontSize: '0.9rem', fontWeight: '500' }}>✓ You possess all required technical skills for this role!</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {recommendation.missingSkills.map((skill, i) => (
                <span key={i} className="skill-tag skill-missing" style={{ fontSize: '0.9rem', padding: '0.4rem 0.75rem' }}>
                  △ {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Why This Internship is Recommended */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
          <BookOpen size={22} /> WHY THIS MATCH? (AI EXPLANATION)
        </h3>
        <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
          {recommendation.explanation?.map((exp, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.95rem' }}>
              <span style={{ color: '#10b981', fontWeight: '800' }}>✓</span>
              <span>{exp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* How to Improve Candidate Profile */}
      <div className="card" style={{ marginBottom: '1.5rem', background: '#fffbeb', borderColor: '#fde68a' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b45309' }}>
          <Lightbulb size={22} /> HOW TO IMPROVE YOUR PROFILE FOR THIS ROLE
        </h3>
        <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
          {recommendation.suggestions?.map((sug, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.95rem', color: '#92400e' }}>
              <span>•</span>
              <span>{sug}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Internship Full Description & Details */}
      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>Role Description & Eligibility</h3>
        <p style={{ whiteSpace: 'pre-line', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          {internship.description}
        </p>

        <div className="grid grid-cols-2" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          <div>
            <strong>Eligibility Criteria:</strong>
            <p style={{ color: 'var(--text-muted)' }}>{internship.eligibility || 'Open to all graduates'}</p>
          </div>
          <div>
            <strong>Application Deadline:</strong>
            <p style={{ color: 'var(--text-muted)' }}>{internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'Rolling Admission'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetail;
