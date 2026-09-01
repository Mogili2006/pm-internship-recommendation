import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Search, Briefcase, Bookmark, ArrowRight, MapPin, DollarSign, Clock } from 'lucide-react';

const StudentInternships = () => {
  const [internships, setInternships] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Filters
  const [keyword, setKeyword] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [minStipend, setMinStipend] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetchInternships();
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    try {
      const res = await api.get('/saved');
      setSavedIds(new Set(res.data.map(item => item.id)));
    } catch (e) {
      console.error('Failed to load saved items:', e);
    }
  };

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const res = await api.post('/internships/search', {
        keyword: keyword || null,
        industry: industry || null,
        location: location || null,
        workMode: workMode || null,
        minStipend: minStipend ? parseFloat(minStipend) : null,
        sortBy: sortBy
      });
      setInternships(res.data);
    } catch (err) {
      console.error('Failed to search internships:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchInternships();
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

  return (
    <div>
      <div className="card" style={{ marginBottom: '1.5rem', background: '#ffffff' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--dark)', marginBottom: '0.25rem' }}>
          Browse PM Scheme Internships
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Explore active opportunities offered by top corporate partners under PM Scheme.</p>

        <form onSubmit={handleSearchSubmit} style={{ marginTop: '1.25rem' }}>
          <div className="grid grid-cols-4" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Keyword (Title, Company)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Industry (e.g. Software, Finance)"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Location / City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <select className="form-control" value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
              <option value="">All Work Modes</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ON_SITE">On-Site</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                type="number"
                className="form-control"
                placeholder="Min Stipend (₹)"
                style={{ width: '160px' }}
                value={minStipend}
                onChange={(e) => setMinStipend(e.target.value)}
              />
              <select className="form-control" style={{ width: '160px' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="latest">Sort by Latest</option>
                <option value="stipend">Sort by Stipend</option>
                <option value="deadline">Sort by Deadline</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              <Search size={18} /> Search Internships
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Searching available internships...</div>
      ) : internships.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No internships found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try broadening your search keywords or location criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          {internships.map((internship) => {
            const isSaved = savedIds.has(internship.id);
            return (
              <div className="card" key={internship.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--dark)' }}>{internship.title}</h3>
                    <span className="badge badge-info">{internship.workMode}</span>
                  </div>
                  <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '1rem', marginTop: '0.2rem' }}>
                    {internship.company}
                  </p>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <span>📍 {internship.location || 'Remote'}</span>
                    <span>⏱️ {internship.duration}</span>
                    <span>💰 ₹{internship.stipend?.toLocaleString('en-IN')}/mo</span>
                  </p>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '0.75rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {internship.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.75rem' }}>
                    {internship.skillNames?.map((s, idx) => (
                      <span key={idx} className="badge badge-secondary">{s}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                  <Link to={`/student/internships/${internship.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                    View Details <ArrowRight size={14} />
                  </Link>

                  <button
                    onClick={() => toggleSave(internship.id)}
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

export default StudentInternships;
