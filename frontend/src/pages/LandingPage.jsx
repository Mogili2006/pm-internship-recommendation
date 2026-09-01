import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle, ShieldCheck, Search, Award, Target, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0d9488 100%)', color: '#ffffff', padding: '5rem 1.5rem', textAlign: 'center', borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <Sparkles size={16} color="#f59e0b" /> Prime Minister's Internship Scheme Recommendation Portal
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.2', color: '#ffffff', marginBottom: '1.25rem' }}>
            AI-Based Internship Recommendation Engine
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
            Find internships that match your skills, education, interests, and career goals. Powered by an explainable AI scoring engine built for Indian students.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-success" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
              Student Login
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>How It Works</h2>
          <p style={{ color: 'var(--text-muted)' }}>Simple 4-step process to get personalized internship matches</p>
        </div>

        <div className="grid grid-cols-4">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontWeight: '800', fontSize: '1.2rem' }}>1</div>
            <h3>Create Profile</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Set up your personal details, degree, branch, CGPA, and career goals.</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontWeight: '800', fontSize: '1.2rem' }}>2</div>
            <h3>Add Skills & Interests</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Add technical skills, soft skills, preferred work modes, and industry interests.</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontWeight: '800', fontSize: '1.2rem' }}>3</div>
            <h3>Get Recommendations</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Receive explainable match scores with breakdown of matching & missing skills.</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontWeight: '800', fontSize: '1.2rem' }}>4</div>
            <h3>Apply & Track</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Apply directly to top companies and track your application status in real time.</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section style={{ background: '#ffffff', padding: '4rem 2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Platform Features</h2>
          <p style={{ color: 'var(--text-muted)' }}>Everything you need to kickstart your career with PM Internship Scheme</p>
        </div>

        <div className="grid grid-cols-3">
          <div className="card">
            <Sparkles size={32} color="#1d4ed8" style={{ marginBottom: '1rem' }} />
            <h3>Explainable AI Matching</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Unlike black-box algorithms, our engine explains exactly <em>why</em> an internship matches you and what skills to improve.
            </p>
          </div>

          <div className="card">
            <Target size={32} color="#0d9488" style={{ marginBottom: '1rem' }} />
            <h3>Weighted Recommendation</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Scoring factors in Skill Match (40%), Education (20%), Industry Interests (15%), Location (10%), Goals (10%), and Work Mode (5%).
            </p>
          </div>

          <div className="card">
            <Search size={32} color="#f59e0b" style={{ marginBottom: '1rem' }} />
            <h3>Advanced Search & Filter</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Filter by industry, location, work mode, minimum stipend, and required skill set across top Indian companies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
