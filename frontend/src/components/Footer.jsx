import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>PM Internship Scheme - AI Recommendation Portal</h3>
          <p>Connecting youth with top industry internship opportunities through explainable AI profile matching.</p>
        </div>
        <div>
          <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Quick Links</h4>
          <p><a href="/about" style={{ color: '#94a3b8' }}>About Scheme</a></p>
          <p><a href="https://pminternship.mca.gov.in" target="_blank" rel="noreferrer" style={{ color: '#94a3b8' }}>Official Government Portal</a></p>
        </div>
        <div>
          <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Support & Eligibility</h4>
          <p>Stipend support: ₹5,000 / month under PM Scheme</p>
          <p>One-time incidentals: ₹6,000 grant</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #334155', color: '#64748b' }}>
        © {new Date().getFullYear()} Prime Minister Internship Scheme Portal. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
