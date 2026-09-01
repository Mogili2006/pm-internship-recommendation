import React from 'react';
import { Award, CheckCircle, Shield, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          About Prime Minister's Internship Scheme
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
          The Prime Minister's Internship Scheme aims to provide internship opportunities to 1 crore youth in 500 top companies over a period of 5 years. Under this scheme, candidates gain real-world business environment exposure, monthly financial stipend support, and hands-on skill enhancement.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Scheme Benefits</h2>
        <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle color="#10b981" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Monthly Financial Support:</strong> ₹5,000 per month stipend provided during the 12-month internship duration.
            </div>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle color="#10b981" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>One-Time Incidental Grant:</strong> ₹6,000 one-time financial grant provided to candidates upon joining.
            </div>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle color="#10b981" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Top 500 Companies:</strong> Internships offered by leading public and private sector companies in India.
            </div>
          </li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Explainable AI Recommendation Engine</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
          Our AI-based recommendation portal uses a transparent, deterministic multi-factor scoring model. Instead of hiding behind opaque scores, it provides candidate-specific insights detailing matching skills, skill gaps, industry alignment, and step-by-step suggestions to improve profile strength.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
