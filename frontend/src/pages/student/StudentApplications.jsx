import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import {
  FileText,
  MapPin,
  Calendar,
  Building2,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get('/applications');

      console.log('APPLICATIONS PAGE:', response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : [];

      setApplications(data);
    } catch (err) {
      console.error('Failed to load applications:', err);

      setApplications([]);

      if (err.response?.status === 401) {
        setError('Your session has expired. Please login again.');
      } else if (err.response?.status === 403) {
        setError('You are not authorized to view applications.');
      } else {
        setError('Unable to load your applications. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return 'N/A';
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getInternshipId = (application) => {
    return (
      application.internshipId ||
      application.internship?.id ||
      application.internship?.internshipId
    );
  };

  const getInternshipTitle = (application) => {
    return (
      application.internship?.title ||
      application.internshipTitle ||
      'Internship'
    );
  };

  const getCompany = (application) => {
    return (
      application.internship?.company ||
      application.company ||
      'Company'
    );
  };

  const getLocation = (application) => {
    return (
      application.internship?.location ||
      application.location ||
      'Remote'
    );
  };

  const getWorkMode = (application) => {
    return (
      application.internship?.workMode ||
      application.workMode ||
      'N/A'
    );
  };

  const getAppliedDate = (application) => {
    return (
      application.appliedAt ||
      application.applicationDate ||
      application.createdAt ||
      application.appliedDate
    );
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 1rem'
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <RefreshCw
            size={32}
            style={{
              animation: 'spin 1s linear infinite'
            }}
          />
        </div>

        <h3>Loading your applications...</h3>

        <p
          style={{
            color: 'var(--text-muted)',
            marginTop: '0.5rem'
          }}
        >
          Please wait while we fetch your application history.
        </p>
      </div>
    );
  }

  return (
    <div>

      {/* Header */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          background: '#ffffff'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              background: '#dcfce7',
              color: '#16a34a',
              padding: '0.85rem',
              borderRadius: '12px'
            }}
          >
            <FileText size={28} />
          </div>

          <div>
            <h1
              style={{
                fontSize: '1.8rem',
                color: 'var(--dark)',
                marginBottom: '0.25rem'
              }}
            >
              My Applications
            </h1>

            <p
              style={{
                color: 'var(--text-muted)'
              }}
            >
              Track the internships you have applied for and monitor
              their application status.
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '2rem',
            marginBottom: '1.5rem'
          }}
        >
          <h3 style={{ color: '#dc2626' }}>
            Unable to load applications
          </h3>

          <p
            style={{
              color: 'var(--text-muted)',
              marginTop: '0.5rem'
            }}
          >
            {error}
          </p>

          <button
            onClick={fetchApplications}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      )}

      {/* Application count */}
      {!error && (
        <div
          style={{
            marginBottom: '1rem',
            color: 'var(--text-muted)'
          }}
        >
          <strong>{applications.length}</strong>{' '}
          {applications.length === 1
            ? 'application'
            : 'applications'} found
        </div>
      )}

      {/* Empty state */}
      {!error && applications.length === 0 && (
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '4rem 2rem'
          }}
        >
          <FileText
            size={56}
            style={{
              color: 'var(--text-muted)',
              marginBottom: '1rem'
            }}
          />

          <h2>No Applications Yet</h2>

          <p
            style={{
              color: 'var(--text-muted)',
              marginTop: '0.5rem',
              marginBottom: '1.5rem'
            }}
          >
            You haven't applied to any internships yet.
            Browse available internships and submit your first application.
          </p>

          <Link
            to="/student/internships"
            className="btn btn-primary"
          >
            <Building2 size={18} />
            Browse Internships
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Applications */}
      {!error && applications.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {applications.map((application, index) => {
            const internshipId = getInternshipId(application);

            return (
              <div
                className="card"
                key={
                  application.id ||
                  application.applicationId ||
                  index
                }
                style={{
                  padding: '1.5rem'
                }}
              >

                {/* Top section */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}
                >

                  <div style={{ flex: 1 }}>

                    <h2
                      style={{
                        fontSize: '1.25rem',
                        color: 'var(--dark)',
                        marginBottom: '0.35rem'
                      }}
                    >
                      {getInternshipTitle(application)}
                    </h2>

                    <p
                      style={{
                        color: 'var(--primary)',
                        fontWeight: '600',
                        marginBottom: '0.75rem'
                      }}
                    >
                      {getCompany(application)}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem'
                      }}
                    >

                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <MapPin size={16} />
                        {getLocation(application)}
                      </span>

                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Building2 size={16} />
                        {getWorkMode(application)}
                      </span>

                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Calendar size={16} />
                        Applied{' '}
                        {formatDate(
                          getAppliedDate(application)
                        )}
                      </span>

                    </div>

                  </div>

                  {/* Status */}
                  <div>
                    <StatusBadge
                      status={
                        application.status ||
                        application.applicationStatus ||
                        'APPLIED'
                      }
                    />
                  </div>

                </div>

                {/* Bottom section */}
                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  {internshipId ? (
                    <Link
                      to={`/student/internships/${internshipId}`}
                      className="btn btn-secondary btn-sm"
                    >
                      View Internship
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem'
                      }}
                    >
                      Internship details unavailable
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </div>
  );
};

export default StudentApplications;
