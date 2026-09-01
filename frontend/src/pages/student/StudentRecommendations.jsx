import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ScoreBadge from '../../components/ScoreBadge';
import { Sparkles, Bookmark, CheckCircle, ArrowRight, Filter, Search } from 'lucide-react';

const StudentRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecs, setFilteredRecs] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Filters & Sorting
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState('');
  const [sortBy, setSortBy] = useState('best_match');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRecommendationsAndSaved();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [recommendations, selectedIndustry, selectedWorkMode, sortBy, searchTerm]);

  const fetchRecommendationsAndSaved = async () => {
    try {
      setLoading(true);
      const [recRes, savedRes] = await Promise.all([
        api.get('/recommendations'),
        api.get('/saved')
      ]);

      setRecommendations(recRes.data);
      const savedSet = new Set(savedRes.data.map(item => item.id));
      setSavedIds(savedSet);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...recommendations];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(r =>
        r.internship.title?.toLowerCase().includes(term) ||
        r.internship.company?.toLowerCase().includes(term) ||
        r.internship.industry?.toLowerCase().includes(term)
      );
    }

    if (selectedIndustry) {
      result = result.filter(r => r.internship.industry === selectedIndustry);
    }

    if (selectedWorkMode) {
      result = result.filter(r => r.internship.workMode === selectedWorkMode);
    }

    if (sortBy === 'best_match') {
      result.sort((a, b) => b.overallScore - a.overallScore);
    } else if (sortBy === 'stipend') {
      result.sort((a, b) => (b.internship.stipend || 0) - (a.internship.stipend || 0));
    } else if (sortBy === 'deadline') {
      result.sort((a, b) => new Date(a.internship.deadline) - new Date(b.internship.deadline));
    }

    setFilteredRecs(result);
  };

  const toggleSave = async (internshipId) => {
    try {
      if (savedIds.has(internshipId)) {
        await api.delete(`/saved/${internshipId}`);
        setSavedIds(prev => {
          const next = new Set(prev);
          next.delete(internshipId);
          return next;
        });
      } else {
        await api.post(`/saved/${internshipId}`);
        setSavedIds(prev => new Set(prev).add(internshipId));
      }
    } catch (err) {
      console.error('Save action failed:', err);
    }
  };

  const uniqueIndustries = Array.from(new Set(recommendations.map(r => r.internship.industry).filter(Boolean)));

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Calculating explainable AI recommendations...</div>;
  }

  return (
    <div>
      <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', color: '#fff' }}>
        <h1 style={{ color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles color="#f59e0b" size={28} /> Explainable Internship Recommendations
        </h1>
        <p style={{ color: '#cbd5e1', marginTop: '0.25rem' }}>
          Ranked using weighted multi-factor match scores based on your skills, education, location, work mode, and goals.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '220px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            className="form-control"
            placeholder="Search recommended internships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select className="form-control" style={{ width: '180px' }} value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)}>
          <option value="">All Industries</option>
          {uniqueIndustries.map((ind, i) => <option key={i} value={ind}>{ind}</option>)}
        </select>

        <select className="form-control" style={{ width: '150px' }} value={selectedWorkMode} onChange={(e) => setSelectedWorkMode(e.target.value)}>
          <option value="">All Work Modes</option>
          <option value="REMOTE">Remote</option>
          <option value="HYBRID">Hybrid</option>
          <option value="ON_SITE">On-Site</option>
        </select>

        <select className="form-control" style={{ width: '150px' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="best_match">Best Match</option>
          <option value="stipend">Highest Stipend</option>
          <option value="deadline">Closest Deadline</option>
        </select>
      </div>

      {filteredRecs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No matching recommendations found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try clearing filters or adding more skills to your profile.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          {filteredRecs.map((rec) => {
            const isSaved = savedIds.has(rec.internshipId);
            return (
              <div className="card" key={rec.internshipId} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--dark)' }}>{rec.internship.title}</h3>
                    <ScoreBadge score={rec.overallScore} />
                  </div>

                  <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {rec.internship.company}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <span>📍 {rec.internship.location || 'Remote'}</span>
                    <span>💼 {rec.internship.workMode}</span>
                    <span>⏱️ {rec.internship.duration}</span>
                    <span>💰 ₹{rec.internship.stipend?.toLocaleString('en-IN')}/mo</span>
                  </div>

                  {/* Score breakdown pills */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.8rem', textAlign: 'center' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Skills (40%)</span>
                      <strong>{rec.skillScore}%</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Edu (20%)</span>
                      <strong>{rec.educationScore}%</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Interest (15%)</span>
                      <strong>{rec.interestScore}%</strong>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>Skill Match Preview:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {rec.matchingSkills?.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="skill-tag skill-matching">✓ {s}</span>
                      ))}
                      {rec.missingSkills?.slice(0, 2).map((s, idx) => (
                        <span key={idx} className="skill-tag skill-missing">△ Need: {s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <Link to={`/student/recommendations/${rec.internshipId}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                    Why Recommended <ArrowRight size={14} />
                  </Link>

                  <button
                    onClick={() => toggleSave(rec.internshipId)}
                    className={`btn ${isSaved ? 'btn-success' : 'btn-secondary'} btn-sm`}
                  >
                    <Bookmark size={14} /> {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentRecommendations;
